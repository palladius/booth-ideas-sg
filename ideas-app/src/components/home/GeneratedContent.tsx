import type { GenerationResult } from '@/lib/types';
import { PrdSection } from './PrdSection';
import { CriteriaSection } from './CriteriaSection';
import { SandboxSection } from './SandboxSection';
import { DownloadSection } from './DownloadSection';
import { FullPrdSection } from './FullPrdSection';
import { GitHubPushSection } from './GitHubPushSection';
import { Separator } from '../ui/separator';

interface GeneratedContentProps {
  data: GenerationResult;
}

export function GeneratedContent({ data }: GeneratedContentProps) {
  return (
    <div className="space-y-12">
      <PrdSection prd={data.prd} />
      <Separator />
      <CriteriaSection criteria={data.criteria} />
      <Separator />
      <SandboxSection code={data.code} />
      <Separator />
      <DownloadSection data={data} />
      <Separator />
      <FullPrdSection prd={data.fullPrd} />
      <Separator />
      <GitHubPushSection result={data.githubResult} />
    </div>
  );
}
