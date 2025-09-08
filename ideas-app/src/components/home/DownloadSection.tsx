'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, QrCode, Loader2 } from "lucide-react";
import Image from "next/image";
import type { GenerationResult } from "@/lib/types";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface DownloadSectionProps {
  data: GenerationResult;
}

export function DownloadSection({ data }: DownloadSectionProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    
    // The QR code will now point to the page, and the user can initiate download from there.
    // This simplifies the QR logic as it doesn't need a unique, expiring URL.
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(pageUrl)}&qzone=1`;

    const handleDownload = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to generate download.');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'prototype-project.zip');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error("Download failed:", error);
            toast({
                variant: "destructive",
                title: "Download Failed",
                description: error instanceof Error ? error.message : "An unknown error occurred.",
            })
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="space-y-6">
            <div className="flex items-center gap-3">
                <Download className="w-8 h-8 text-accent" />
                <h2 className="text-3xl font-headline font-bold">Download Project Assets</h2>
            </div>
            <Card className="shadow-md">
                <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6 md:gap-10">
                    <div className="p-4 border bg-card rounded-lg shadow-inner">
                         <Image 
                            src={qrCodeUrl}
                            alt="QR code to access this page on a mobile device"
                            width={180}
                            height={180}
                         />
                    </div>
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-headline font-semibold">Ready for Development?</h3>
                        <p className="text-muted-foreground mt-2 max-w-md">
                            Download a complete project archive containing your prototype, the full Product Requirements Document (PRD), and all necessary configuration files to begin development.
                        </p>
                        <Button size="lg" className="mt-4 font-headline" onClick={handleDownload} disabled={isLoading}>
                            {isLoading ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <Download className="mr-2 h-5 w-5" />
                            )}
                            {isLoading ? 'Packaging...' : 'Download Project (.zip)'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
