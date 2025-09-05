import type { GeneratePrdOverviewOutput } from '@/ai/flows/generate-prd-overview';
import type { SuggestEvaluationCriteriaOutput } from '@/ai/flows/suggest-evaluation-criteria';
import type { GenerateCodeOutput } from '@/ai/flows/generate-code';
import type { GeneratePrdOutput } from '@/ai/flows/generate-prd';

export type GitHubPushResult = {
  success: boolean;
  error: string | null;
  pullRequestUrl: string | null;
  branchName: string | null;
  messages?: { type: 'info' | 'error', text: string }[];
};

export interface GenerationResult {
  prd: GeneratePrdOverviewOutput;
  criteria: SuggestEvaluationCriteriaOutput;
  code: GenerateCodeOutput;
  fullPrd: GeneratePrdOutput;
  fullPrdHtml: string;
  githubResult: GitHubPushResult;
}

export interface ServerActionState {
  success: boolean;
  data?: GenerationResult;
  error?: string | null;
  messages?: { type: 'info' | 'error', text: string }[];
}
