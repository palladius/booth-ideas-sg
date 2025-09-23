'use server';

/**
 * @fileOverview A flow to generate a full Product Requirements Document (PRD).
 *
 * - generatePrd - A function that takes an application idea, PRD overview, and evaluation criteria to generate a detailed PRD.
 * - GeneratePrdInput - The input type for the generatePrd function.
 * - GeneratePrdOutput - The return type for the generatePrd function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePrdInputSchema = z.object({
  idea: z.string().describe('The application idea provided by the user.'),
  prdOverview: z.string().describe('The generated PRD overview.'),
  evaluationCriteria: z.string().describe('The generated evaluation criteria.'),
});
export type GeneratePrdInput = z.infer<typeof GeneratePrdInputSchema>;

const GeneratePrdOutputSchema = z.object({
  prd: z.string().describe('The full, detailed Product Requirements Document in Markdown format.'),
});
export type GeneratePrdOutput = z.infer<typeof GeneratePrdOutputSchema>;

export async function generatePrd(input: GeneratePrdInput): Promise<GeneratePrdOutput> {
  return generatePrdFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePrdPrompt',
  input: {schema: GeneratePrdInputSchema},
  output: {schema: GeneratePrdOutputSchema},
  prompt: `You are a Senior Product Manager tasked with creating a comprehensive Product Requirements Document (PRD).

  Based on the initial idea, the PRD overview, and the AI-powered evaluation criteria, generate a detailed PRD in Markdown format. The PRD should be thorough, professional, and ready for a development team to start working from.

  **Initial Idea:**
  {{{idea}}}

  **PRD Overview:**
  {{{prdOverview}}}

  **Evaluation Criteria:**
  {{{evaluationCriteria}}}

  Structure the PRD with the following sections. Please provide detailed and thoughtful content for each:
  1.  **Introduction**: Briefly explain the project's purpose and what it aims to achieve.
  2.  **Problem Statement**: Elaborate on the problem this product will solve. Go into detail about the pain points.
  3.  **Target Audience**: Describe the primary users of this product in detail, including their motivations and goals.
  4.  **Goals/Objectives**: List the key business and user goals, making them specific, measurable, achievable, relevant, and time-bound (SMART), if possible.
  5.  **Features & Requirements**: Detail the core features and their functional requirements. For each feature, describe what it does and why it's important. Be specific.
  6.  **User Stories**: Write a few key user stories from the perspective of the target user (e.g., "As a [user type], I want to [action] so that I can [benefit].").
  7.  **Technical Considerations**: Suggest a high-level technical approach. Mention potential technologies or architecture choices that would be suitable.
  8.  **Potential Risks & Mitigations**: Identify potential risks (e.g., technical challenges, market competition, user adoption) and suggest ways to mitigate them.
  9.  **Success Metrics**: Define how the success of the product will be measured. Use concrete metrics (e.g., user engagement, conversion rates, customer satisfaction scores).

  Ensure the document is well-formatted, clear, and professional. Use Markdown for formatting (e.g., headings, bold text, lists).
  IMPORTANT: You must output the full, complete, and unabridged PRD. Do not truncate or summarize it. Keep it to max 16000 tokens.
  `,
  config: {
    maxOutputTokens: 32000,
  }
});

const generatePrdFlow = ai.defineFlow(
  {
    name: 'generatePrdFlow',
    inputSchema: GeneratePrdInputSchema,
    outputSchema: GeneratePrdOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
