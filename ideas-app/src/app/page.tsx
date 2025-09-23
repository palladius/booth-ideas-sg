import CodeGeniusClient from '@/components/home/CodeGeniusClient';
import Header from '@/components/layout/Header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <CodeGeniusClient />
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground">
        <p>built with ❤️ on <a href="https://firebase.studio/">Firebase Studio</a></p>
        <p>GitHub code: <a href="https://github.com/palladius/booth-ideas-sg">palladius/booth-ideas-sg</a></p>
        <p>🇸🇬 Paul Datta, Nigel Cheong, 💛 Riccardo Carlesso</p>
      </footer>
    </div>
  );
}
