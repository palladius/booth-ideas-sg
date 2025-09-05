import CodeGeniusClient from '@/components/home/CodeGeniusClient';
import Header from '@/components/layout/Header';
import packageJson from '../../package.json';

export default function Home() {
  const version = packageJson.version;
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <CodeGeniusClient />
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>built with ❤️ on firebase studio <b>v{version}</b></p>
      </footer>
    </div>
  );
}
