
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, GitBranch, GitPullRequest, AlertCircle } from "lucide-react";
import Image from "next/image";
import type { GenerationResult } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


interface DownloadSectionProps {
  data: GenerationResult;
}

export function DownloadSection({ data }: DownloadSectionProps) {
    const repoUrl = process.env.NEXT_PUBLIC_GITHUB_REPO_URL || "https://github.com/palladius/booth-ideas-sg/";

    const { githubResult } = data;
    let qrCodeUrl = '';

    if (githubResult.success && githubResult.branchName && repoUrl) {
      const branchUrl = `${repoUrl.replace(/\.git$/, '')}/tree/${githubResult.branchName}`;
      qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(branchUrl)}&qzone=1`;
    }

    const renderGitHubStatus = () => {
        if (githubResult.success && githubResult.pullRequestUrl && githubResult.branchName && repoUrl) {
             const branchUrl = `${repoUrl.replace(/\.git$/, '')}/tree/${githubResult.branchName}`;
            return (
                 <Alert variant="default" className="bg-transparent border-0 p-0">
                    <AlertTitle className="text-xl font-headline font-semibold text-green-400">
                        Your Project Is Ready!
                    </AlertTitle>
                    <AlertDescription className="text-muted-foreground mt-2">
                        A new branch <code className="font-mono bg-muted text-foreground rounded px-1 py-0.5">{githubResult.branchName}</code> has been created and a pull request opened for your review.
                        <div className="mt-4 flex flex-wrap gap-4">
                            <Button asChild variant="link" className="p-0 h-auto text-primary font-bold">
                                <a href={branchUrl} target="_blank" rel="noopener noreferrer">
                                    <GitBranch className="mr-1 h-4 w-4" />
                                    View Branch
                                </a>
                            </Button>
                            <Button asChild variant="link" className="p-0 h-auto text-primary font-bold">
                                <a href={githubResult.pullRequestUrl} target="_blank" rel="noopener noreferrer">
                                    <GitPullRequest className="mr-1 h-4 w-4" />
                                    View Pull Request
                                </a>
                            </Button>
                        </div>
                    </AlertDescription>
                </Alert>
            );
        }

        if(!githubResult.success) {
            return (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>GitHub Push Failed</AlertTitle>
                    <AlertDescription>
                        {githubResult.error ? githubResult.error : "An unknown error occurred. Please check your environment variables."}
                    </AlertDescription>
                </Alert>
            )
        }

        return null
    }

    return (
        <section className="space-y-6">
            <div className="flex items-center gap-3">
                <QrCode className="w-8 h-8 text-accent" />
                <h2 className="text-3xl font-headline font-bold">Scan to View Project Source</h2>
            </div>
            <Card className="shadow-md">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                        {qrCodeUrl ? (
                            <div className="p-4 border bg-card rounded-lg shadow-inner flex-shrink-0">
                                <Image
                                    src={qrCodeUrl}
                                    alt="QR code to access the project source code on GitHub"
                                    width={180}
                                    height={180}
                                />
                            </div>
                        ) : (
                            <div className="p-4 border bg-card rounded-lg shadow-inner w-[196px] h-[196px] flex-shrink-0 flex items-center justify-center text-center text-sm text-muted-foreground">
                                QR code will be available once the GitHub workflow is configured.
                            </div>
                        )}
                        <div className="text-center md:text-left flex-grow">
                            {renderGitHubStatus()}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
