import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { GeneratePrdOutput } from "@/ai/flows/generate-prd";
import { BookText } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface FullPrdSectionProps {
  prd: GeneratePrdOutput;
}

export function FullPrdSection({ prd }: FullPrdSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <BookText className="w-8 h-8 text-accent" />
        <h2 className="text-3xl font-headline font-bold">Full Product Requirements Document (PRD)</h2>
      </div>
      <Card className="shadow-lg">
        <CardContent className="p-0">
          <ScrollArea className="h-[500px] w-full p-6">
            <div className="prose prose-sm dark:prose-invert max-w-none 
              [&_h1]:font-headline [&_h1]:text-2xl [&_h1]:text-primary
              [&_h2]:font-headline [&_h2]:text-xl [&_h2]:text-primary/90
              [&_h3]:font-headline [&_h3]:text-lg
              [&_p]:text-muted-foreground 
              [&_li]:text-muted-foreground
              [&_strong]:text-foreground
            ">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{prd.prd}</ReactMarkdown>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </section>
  );
}
