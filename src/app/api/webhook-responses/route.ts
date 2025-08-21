import { NextResponse } from 'next/server';

// In a real app, this would come from a database
const mockResponses = [
  {
    id: '1',
    timestamp: new Date().toISOString(),
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'user-agent': 'PostmanRuntime/7.45.0',
      'postman-token': 'fff9a7c7-3609-4035-a80d-a178599739b0'
    },
    body: {
      event: 'user.created',
      data: {
        userId: '12345',
        email: 'user@example.com',
        name: 'John Doe'
      }
    },
    status: 200
  }
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      responses: mockResponses,
      count: mockResponses.length
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error fetching webhook responses',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
