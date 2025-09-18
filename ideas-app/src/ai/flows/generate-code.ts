// This file uses server-side code.
'use server';

/**
 * @fileOverview Generates React.js code and a suitable theme based on the application idea and PRD.
 *
 * - generateCode - A function that handles the code generation process.
 * - GenerateCodeInput - The input type for the generateCode function.
 * - GenerateCodeOutput - The return type for the generateCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCodeInputSchema = z.object({
  applicationIdea: z.string().describe('The user provided application idea.'),
  prdOverview: z.string().describe('The generated PRD overview based on the application idea.'),
});

export type GenerateCodeInput = z.infer<typeof GenerateCodeInputSchema>;

const GenerateCodeOutputSchema = z.object({
  generatedCode: z.string().describe('The generated React.js code for the application.'),
  theme: z.string().describe('The name of the suitable theme for the application.'),
});

export type GenerateCodeOutput = z.infer<typeof GenerateCodeOutputSchema>;

export async function generateCode(input: GenerateCodeInput): Promise<GenerateCodeOutput> {
  return generateCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCodePrompt',
  input: {schema: GenerateCodeInputSchema},
  output: {schema: GenerateCodeOutputSchema},
  prompt: `You are an expert React.js developer who specializes in generating code based on user ideas and PRDs.

  Based on the provided application idea and PRD overview, generate a single, self-contained React.js component that solves the outlined problem.

  Application Idea: {{{applicationIdea}}}
  PRD Overview: {{{prdOverview}}}
  
  Here are the constraints you must follow:
  1.  The final output must be a single React component.
  2.  The component must be named 'App' and exported as the default. For example: \`export default function App() { ... }\`.
  3.  Use only standard React and JSX. Do not use any external UI libraries like Material-UI or Chakra UI.
  4.  Do not include any 'import' or 'require' statements for external libraries, except for 'react' and 'lucide-react'.
  5.  Style the component using Tailwind CSS classes.
  6.  The code must be complete and ready to be rendered in a React environment.

  Prioritize a functional prototype that demonstrates the core features of the application.
  Specify a suitable theme name (e.g., "Minimalist", "Corporate", "Playful") in the theme output field.
  Provide the full, self-contained component code in the generatedCode output field.
`,
});

const generateCodeFlow = ai.defineFlow(
  {
    name: 'generateCodeFlow',
    inputSchema: GenerateCodeInputSchema,
    outputSchema: GenerateCodeOutputSchema,
    retry: {
      maxAttempts: 5,
      backoff: {
        delay: 2000,
        multiplier: 2,
      },
    },
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
