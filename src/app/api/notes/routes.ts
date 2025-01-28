import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const { title, content } = await request.json();
  
  // Sanitize title for filename
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const filePath = path.join(process.cwd(), 'notes', `${slug}.md`);

  try {
    fs.writeFileSync(filePath, content);
    return NextResponse.json({ success: true, slug });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to save note' },
      { status: 500 }
    );
  }
}