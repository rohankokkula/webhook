#!/bin/bash

echo "🚀 Starting Webhook App..."
echo "📡 Webhook endpoint will be available at: http://localhost:3000/api/webhook"
echo "🌐 Main page will be available at: http://localhost:3000"
echo ""
echo "To test with Postman:"
echo "1. Send POST request to http://localhost:3000/api/webhook"
echo "2. Set Content-Type: application/json"
echo "3. Include JSON payload in body"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
