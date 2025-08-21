import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read the Postman collection file
    const filePath = path.join(process.cwd(), 'webhook-postman-collection.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Parse the JSON to validate it
    JSON.parse(fileContent);
    
    // Return the collection with proper headers
    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="webhook-postman-collection.json"',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error reading Postman collection:', error);
    return NextResponse.json(
      { 
        error: 'Failed to load Postman collection',
        message: 'The Postman collection file could not be loaded'
      },
      { status: 500 }
    );
  }
}
