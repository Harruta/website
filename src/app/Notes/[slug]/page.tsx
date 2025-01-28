import fs from 'fs';
import path from 'path';
import { Note } from '@/app/types/note';

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  const notesDir = path.join(process.cwd(), 'notes');
  const files = fs.readdirSync(notesDir);
  return files.map(file => ({ slug: file.replace(/\.md$/, '') }));
}

const getNoteContent = (slug: string): Note => {
  const filePath = path.join(process.cwd(), 'notes', `${slug}.md`);
  const content = fs.readFileSync(filePath, 'utf8');
  
  return {
    slug,
    title: slug,
    content
  };
};

export default function NotePage({ params }: { params: Params }) {
  const note = getNoteContent(params.slug);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
      <div className="prose max-w-none">
        <pre>{note.content}</pre>
      </div>
    </div>
  );
}