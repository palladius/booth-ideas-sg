import { Card, CardContent } from "@/components/ui/card";
import type { GenerationResult } from "@/lib/types";
import { BookText } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

interface FullPrdSectionProps {
  prdHtml: GenerationResult['fullPrdHtml'];
}

export function FullPrdSection({ prdHtml }: FullPrdSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <BookText className="w-8 h-8 text-accent" />
        <h2 className="text-3xl font-headline font-bold">Full Product Requirements Document (PRD)</h2>
      </div>
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <ScrollArea className="h-[400px] w-full pr-4">
            <div
              className="prose prose-sm dark:prose-invert max-w-none 
              prose-headings:font-headline prose-headings:tracking-tight prose-headings:text-primary
              prose-h1:text-3xl prose-h1:mb-4 prose-h1:pb-2 prose-h1:border-b prose-h1:border-border
              prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-3 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border
              prose-h3:text-xl prose-h3:mt-4 prose-h3:mb-2
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-ul:list-disc prose-ul:ml-6 prose-ul:space-y-1 prose-ul:text-muted-foreground
              prose-ol:list-decimal prose-ol:ml-6 prose-ol:space-y-1 prose-ol:text-muted-foreground
              prose-strong:text-foreground
              prose-code:bg-muted prose-code:text-foreground prose-code:rounded-md prose-code:px-1.5 prose-code:py-1
            "
              dangerouslySetInnerHTML={{ __html: prdHtml }}
            />
          </ScrollArea>
        </CardContent>
      </Card>
    </section>
  );
}
