import { ExternalLink } from 'lucide-react';

export default function Header() {
  return (
    <header className="py-4 px-4 md:px-8 header-gradient shadow-lg">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold font-headline text-white tracking-tight">
            Idea to Code 🇨🇭
          </h1>
        </div>
        <a 
          href="https://github.com/google-gemini/gemini-cli" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 text-sm text-gray-200 hover:text-white transition-colors"
        >
          Learn more
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </header>
  );
}
