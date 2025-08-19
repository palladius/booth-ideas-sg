
'use server';

import { generatePrdOverview } from '@/ai/flows/generate-prd-overview';
import { suggestEvaluationCriteria } from '@/ai/flows/suggest-evaluation-criteria';
import { generateCode } from '@/ai/flows/generate-code';
import { generatePrd } from '@/ai/flows/generate-prd';
import { generateAppName } from '@/ai/flows/generate-app-name';
import { generateProjectTitle } from '@/ai/flows/generate-project-title';
import { z } from 'zod';
import type { GenerationResult, ServerActionState, GitHubPushResult } from '@/lib/types';
import JSZip from 'jszip';
import { Octokit } from '@octokit/rest';

const ideaSchema = z.object({
  idea: z.string().min(20, { message: "Your idea is too short. Please elaborate a bit more to get better results!" }),
});

async function pushPrdToGitHub(prd: string, projectTitle: string): Promise<GitHubPushResult> {
    const pat = process.env.GITHUB_PAT;
    const repoUrl = process.env.NEXT_PUBLIC_GITHUB_REPO_URL;
    let owner: string, repo: string;

    if (!pat || !repoUrl) {
        return { success: false, error: "GitHub PAT or Repository URL is not configured in your .env file.", pullRequestUrl: null, branchName: null };
    }

    try {
        const urlParts = new URL(repoUrl).pathname.split('/').filter(Boolean);
        if (urlParts.length < 2) {
            throw new Error("Invalid repository URL format. Expected 'https://github.com/owner/repo'.");
        }
        [owner, repo] = urlParts;

        const octokit = new Octokit({ auth: pat });
        
        // 1. Create an issue
        const issue = await octokit.issues.create({
            owner,
            repo,
            title: projectTitle,
            body: prd,
            labels: ['PRD'],
        });
        const issueNumber = issue.data.number;
        
        // 2. Determine a unique branch name
        const baseBranchName = projectTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        let branchName = baseBranchName;
        let counter = 0;
        let branchExists = true;

        while (branchExists) {
            try {
                await octokit.git.getRef({
                    owner,
                    repo,
                    ref: `heads/${branchName}`,
                });
                // If the ref exists, increment the counter and try a new name
                counter++;
                branchName = `${baseBranchName}-${counter}`;
            } catch (error: any) {
                if (error.status === 404) {
                    // If the ref does not exist, we've found a unique name
                    branchExists = false;
                } else {
                    // Re-throw other errors
                    throw error;
                }
            }
        }

        // 3. Create the new branch with the unique name
        const { data: repoData } = await octokit.repos.get({ owner, repo });
        const defaultBranch = repoData.default_branch;
        const { data: refData } = await octokit.git.getRef({
            owner,
            repo,
            ref: `heads/${defaultBranch}`,
        });
        const latestCommitSha = refData.object.sha;

        await octokit.git.createRef({
            owner,
            repo,
            ref: `refs/heads/${branchName}`,
            sha: latestCommitSha,
        });

        // 4. Push PRD, linking to the issue in the commit message
        const prdFileName = `prd-${issueNumber}.md`;
        await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path: `PRD/${prdFileName}`,
            message: `Add new PRD for ${projectTitle} (closes #${issueNumber})`,
            content: Buffer.from(prd).toString('base64'),
            branch: branchName,
        });
        
        // 5. Create a pull request
        const pullRequest = await octokit.pulls.create({
            owner,
            repo,
            title: `Add new PRD for ${projectTitle}`,
            head: branchName,
            base: defaultBranch,
            body: `This PR adds a new Product Requirements Document as discussed in issue #${issueNumber}.`,
        });

        // 6. Add a comment to the pull request
        await octokit.issues.createComment({
            owner,
            repo,
            issue_number: pullRequest.data.number,
            body: "@gemini-cli code this for me",
        });

        return { success: true, error: null, pullRequestUrl: pullRequest.data.html_url, branchName };

    } catch (error: any) {
        console.error("GitHub push failed:", error);
        let errorMessage = "An unexpected error occurred while pushing to GitHub.";
        if (error.status === 401) {
            errorMessage = "Authentication failed. Please check your Personal Access Token.";
        } else if (error.status === 404) {
            errorMessage = "Repository not found. Please check the URL and ensure your token has access.";
        } else if (error.message) {
            errorMessage = error.message;
        }
        return { success: false, error: errorMessage, pullRequestUrl: null, branchName: null };
    }
}


export async function generateAll(prevState: ServerActionState, formData: FormData): Promise<ServerActionState> {
  const ideaData = { idea: formData.get('idea') as string };
  
  const validation = ideaSchema.safeParse(ideaData);
  if (!validation.success) {
    return { ...initialState, success: false, error: validation.error.errors.map(e => e.message).join(', ') };
  }
  const idea = validation.data.idea;

  try {
    const prdPromise = generatePrdOverview({ idea });
    const criteriaPromise = suggestEvaluationCriteria({ idea });
    const projectTitlePromise = generateProjectTitle({ idea });

    const [prdOverview, criteria, projectTitleResult] = await Promise.all([
      prdPromise,
      criteriaPromise,
      projectTitlePromise,
    ]);
    
    const prdOverviewString = Object.entries(prdOverview)
        .map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}: ${value}`)
        .join('\n');

    const criteriaString = Object.entries(criteria)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}: ${value}`)
      .join('\n');

    const codePromise = generateCode({ applicationIdea: idea, prdOverview: prdOverviewString });
    const prdPromiseFull = generatePrd({ idea, prdOverview: prdOverviewString, evaluationCriteria: criteriaString });

    const [code, prd] = await Promise.all([
      codePromise,
      prdPromiseFull,
    ]);
    
    // Automatically push to GitHub
    const githubResult = await pushPrdToGitHub(prd.prd, projectTitleResult.projectTitle);

    const result: GenerationResult = { prd: prdOverview, criteria, code, fullPrd: prd, githubResult };
    
    return { success: true, data: result, error: null };
  } catch (error) {
    console.error("Generation failed:", error);
    return { ...initialState, success: false, error: 'An unexpected error occurred during generation. Please check the server logs and try again.' };
  }
}

const downloadZipSchema = z.object({
  prd: z.any(),
  criteria: z.any(),
  code: z.any(),
  fullPrd: z.any(),
});

export async function createDownloadZip(data: GenerationResult): Promise<{ zipDataUri: string }> {
  const validation = downloadZipSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("Invalid data for zip creation");
  }

  const { prd, criteria, code, fullPrd } = validation.data;

  const zip = new JSZip();

  // Root directory
  const root = "codegenius-project";
  
  // Package.json
  const packageJson = {
    "name": "codegenius-project",
    "version": "0.1.0",
    "private": true,
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint"
    },
    "dependencies": {
      "react": "^18",
      "react-dom": "^18",
      "next": "14.2.3",
      "lucide-react": "^0.378.0",
      "class-variance-authority": "^0.7.0",
      "clsx": "^2.1.1",
      "tailwind-merge": "^2.3.0",
      "tailwindcss-animate": "^1.0.7"
    },
    "devDependencies": {
      "typescript": "^5",
      "@types/node": "^20",
      "@types/react": "^18",
      "@types/react-dom": "^18",
      "postcss": "^8",
      "tailwindcss": "^3.4.1",
      "eslint": "^8",
      "eslint-config-next": "14.2.3"
    }
  };
  zip.file(`${root}/package.json`, JSON.stringify(packageJson, null, 2));
  
  // Add the full PRD to the zip
  zip.file(`${root}/PRD.md`, fullPrd.prd);

  // README.md
  const readmeContent = `
# CodeGenius Project

This project was generated by CodeGenius based on your idea.

## Getting Started

1.  **Install dependencies:**
    
    \`\`\`bash
    npm install
    \`\`\`
    
2.  **Run the development server:**
    
    \`\`\`bash
    npm run dev
    \`\`\`
    
    Open [http://localhost:3000](http://localhost:3000) with your browser to see your application.

---

## Product Requirements Overview

### Problem Statement
${prd.problemStatement}

### Background Context
${prd.backgroundContext}

### Target User
${prd.targetUser}

### Solution
${prd.solution}

### Desired Outcome
${prd.desiredOutcome}

## AI-Powered Evaluation

- **Innovation in AI**: ${criteria.innovationInAI}
- **User Value**: ${criteria.userValue}
- **Business Value**: ${criteria.businessValue}
- **Proposed Tech Stack**: ${criteria.proposedTechStack}
- **Recommended Team**: ${criteria.recommendedTeam}
- **Suggested Product Areas**: ${criteria.suggestedProductAreas}
`;
  zip.file(`${root}/README.md`, readmeContent.trim());
  
  // next.config.mjs
  zip.file(`${root}/next.config.mjs`, `
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
`);

  // tsconfig.json
  zip.file(`${root}/tsconfig.json`, `
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`);

  // tailwind.config.ts
  zip.file(`${root}/tailwind.config.ts`, `
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
`);

  // .gitignore
  zip.file(`${root}/.gitignore`, `
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
`);

  // Create src directory structure
  const src = zip.folder(`${root}/src`);
  const app = src!.folder('app');
  const components = src!.folder('components');

  // src/app/globals.css
  app!.file('globals.css', `
@tailwind base;
@tailwind components;
@tailwind utilities;
  `);

  // src/app/layout.tsx
  app!.file('layout.tsx', `
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeGenius App",
  description: "Generated by CodeGenius",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`);

  // src/app/page.tsx
  app!.file('page.tsx', `
import GeneratedApp from "@/components/GeneratedApp";

export default function Home() {
  return (
    <main>
      <GeneratedApp />
    </main>
  );
}
`);
  
  // The generated component
  components!.file('GeneratedApp.tsx', `
'use client';
// Theme: ${code.theme}
${code.generatedCode}
`);

  const content = await zip.generateAsync({ type: 'base64' });

  return {
    zipDataUri: `data:application/zip;base64,${content}`
  };
}


const initialState: ServerActionState = {
  success: false,
  data: undefined,
  error: null,
};

    

    




    

