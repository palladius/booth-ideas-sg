'use client';

import { useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { generateAll } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";
import type { ServerActionState } from '@/lib/types';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Rocket, Sparkles } from 'lucide-react';
import { LoadingState } from './LoadingState';
import { GeneratedContent } from './GeneratedContent';

const initialState: ServerActionState = {
  success: false,
  data: undefined,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full sm:w-auto font-headline">
      {pending ? (
        <>
          <Sparkles className="mr-2 h-5 w-5 animate-spin" />
          Building...
        </>
      ) : (
        <>
          <Rocket className="mr-2 h-5 w-5" />
          Build Your Prototype
        </>
      )}
    </Button>
  );
}

function FormResult({ state }: { state: ServerActionState }) {
  const { pending } = useFormStatus();

  if (pending) {
    return <LoadingState />;
  }

  if (state.success && state.data) {
    return (
      <div className="space-y-8">
        <GeneratedContent data={state.data} />
      </div>
    );
  }
  
  return null;
}


export default function CodeGeniusClient() {
  const [state, formAction] = useActionState(generateAll, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.success === false && state.error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <div className="space-y-12">
        <Card className="shadow-lg border-primary/20">
          <form action={formAction}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-primary" />
                <CardTitle className="font-headline text-3xl tracking-tight">Describe Your Product Concept</CardTitle>
              </div>
              <CardDescription className="pt-2 text-base">
                Provide a detailed description of your idea. Our AI will generate a technical product brief, create a functional prototype, and initiate a GitHub workflow for development.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                name="idea"
                id="idea"
                placeholder="Example: A platform for B2B logistics management that tracks shipments in real-time, automates inventory updates, and provides predictive analytics for supply chain optimization..."
                className="min-h-[150px] text-base resize-y"
                required
              />
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </form>
        </Card>
      
      <FormResult state={state} />
    </div>
  );
}
