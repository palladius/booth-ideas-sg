const { Octokit } = require('@octokit/rest');

async function updateIssue() {
    const pat = process.env.GITHUB_PAT;
    const repoUrl = process.env.NEXT_PUBLIC_GITHUB_REPO_URL;
    const issueNumber = 14;
    const commitHash = '4fc1e78165b0416468a1d0c5e27727fb66a051f8';
    const commentBody = `The changes to add emoji and nickname to GitHub issue creation for PRDs have been implemented and committed in commit 
${commitHash}
.

-- by ♊️ Gemini CLI ⚙️, on behalf of Riccardo`;

    if (!pat || !repoUrl) {
        console.error("GitHub PAT or Repository URL is not configured in your .env file.");
        process.exit(1);
    }

    try {
        const urlParts = new URL(repoUrl).pathname.split('/').filter(Boolean);
        if (urlParts.length < 2) {
            throw new Error("Invalid repository URL format. Expected 'https://github.com/owner/repo'.");
        }
        const [owner, repo] = urlParts;

        const octokit = new Octokit({ auth: pat });

        await octokit.issues.createComment({
            owner,
            repo,
            issue_number: issueNumber,
            body: commentBody,
        });
        console.log(`Successfully updated issue #${issueNumber} in ${owner}/${repo}.`);
    } catch (error) {
        console.error("Failed to update GitHub issue:", error);
        process.exit(1);
    }
}

updateIssue();