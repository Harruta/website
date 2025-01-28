import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { Note } from '../types/note';

const getNotes = (): Note[] => {
  const notesDir = path.join(process.cwd(), 'notes');
  return fs.readdirSync(notesDir).map(file => ({
    slug: file.replace(/\.md$/, ''),
    title: file.replace(/\.md$/, ''),
    content: ''
  }));
};

export default function NotesPage() {
  const notes = getNotes();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">My Notes</h1>
      <div className="space-y-4">
        {notes.map(note => (
          <Link 
            key={note.slug}
            href={`/notes/${note.slug}`}
            className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-semibold">{note.title}</h2>
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <Link
          href="/add-note"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Note
        </Link>
      </div>
    </div>
  );
}