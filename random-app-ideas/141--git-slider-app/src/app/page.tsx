"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [markdown, setMarkdown] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleConvert = async () => {
    if (!file) {
      return;
    }

    // Placeholder for file conversion logic
    setMarkdown(`File content of ${file.name} will be converted to markdown here.`);
  };

  const handlePublish = async () => {
    // Placeholder for GitHub Pages publishing logic
    alert("Publishing to GitHub Pages is not implemented yet.");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">git-slider</h1>
      <div className="flex flex-col items-center space-y-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-md p-2"
        />
        <button
          onClick={handleConvert}
          disabled={!file}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
        >
          Convert to Markdown
        </button>
        <textarea
          value={markdown}
          readOnly
          className="w-full h-64 border border-gray-300 rounded-md p-2"
          placeholder="Converted markdown will appear here..."
        />
        <button
          onClick={handlePublish}
          disabled={!markdown}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
        >
          Publish to GitHub Pages
        </button>
      </div>
    </main>
  );
}