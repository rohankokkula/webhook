import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json();
    
    // Log the webhook payload
    console.log('Webhook received:', {
      timestamp: new Date().toISOString(),
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
      body: body
    });

    // You can add your webhook processing logic here
    // For example, save to database, trigger other actions, etc.
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Webhook received successfully',
      timestamp: new Date().toISOString(),
      receivedData: body
    }, { status: 200 });

  } catch (error) {
    console.error('Webhook error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Error processing webhook',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 400 });
  }
}

// Optional: Handle GET requests to show webhook info
export async function GET() {
  return NextResponse.json({
    message: 'Webhook endpoint is active',
    endpoint: '/api/webhook',
    method: 'POST',
    description: 'Send POST requests to this endpoint with your payload'
  });
}
