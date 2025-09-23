import type { GenerationResult } from '@/lib/types';
import { DownloadSection } from './DownloadSection';
import { FullPrdSection } from './FullPrdSection';
import { Separator } from '../ui/separator';

interface GeneratedContentProps {
  data: GenerationResult;
}

export function GeneratedContent({ data }: GeneratedContentProps) {
  return (
    <div className="space-y-12">
      <DownloadSection data={data} />
      <Separator />
      <FullPrdSection prdHtml={data.fullPrdHtml} />
    </div>
  );
}
