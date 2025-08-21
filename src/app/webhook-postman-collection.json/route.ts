import { NextResponse } from 'next/server';

export async function GET() {
  // Redirect to the new API endpoint
  return NextResponse.redirect(new URL('/api/postman-collection', 'https://webhook.eu-contentstackapps.com'), 301);
}
