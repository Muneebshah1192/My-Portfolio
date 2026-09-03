import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Force dynamic execution at runtime to prevent Next.js from pre-rendering the 37MB buffer during static build compilation.
export const dynamic = 'force-dynamic';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'syed_muneeb_portfolio_vercel.zip');
  
  if (!fs.existsSync(filePath)) {
    const rootPath = path.join(process.cwd(), '..', 'syed_muneeb_portfolio_vercel.zip');
    if (fs.existsSync(rootPath)) {
      const fileBuffer = fs.readFileSync(rootPath);
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Disposition': 'attachment; filename="syed_muneeb_portfolio_vercel.zip"',
          'Content-Type': 'application/zip',
          'Content-Length': fileBuffer.length.toString(),
        },
      });
    }
    return new NextResponse('Zip package not found', { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Disposition': 'attachment; filename="syed_muneeb_portfolio_vercel.zip"',
      'Content-Type': 'application/zip',
      'Content-Length': fileBuffer.length.toString(),
    },
  });
}
