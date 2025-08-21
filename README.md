# Webhook App

A Next.js application with webhook functionality that you can test with Postman or any HTTP client.

## Features

- **Webhook Endpoint**: `POST /api/webhook` to receive webhook payloads
- **Payload Logging**: All received webhooks are logged to the console
- **Error Handling**: Proper error handling and response formatting
- **Testing Interface**: Built-in instructions for testing with Postman

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Webhook Testing

### Endpoint Details

- **URL**: `http://localhost:3000/api/webhook`
- **Method**: `POST`
- **Content-Type**: `application/json`

### Testing with Postman

1. **Create a new request in Postman**
   - Method: `POST`
   - URL: `http://localhost:3000/api/webhook`

2. **Set Headers**
   - `Content-Type: application/json`

3. **Set Body (raw JSON)**
   ```json
   {
     "event": "user.created",
     "data": {
       "userId": "12345",
       "email": "user@example.com",
       "name": "John Doe"
     },
     "timestamp": "2024-01-01T00:00:00Z"
   }
   ```

4. **Send the request**

### Expected Response

```json
{
  "success": true,
  "message": "Webhook received successfully",
  "timestamp": "2024-01-01T00:00:00Z",
  "receivedData": {
    "event": "user.created",
    "data": {
      "userId": "12345",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

### Viewing Logs

All webhook payloads are logged to your terminal/console where you're running the Next.js app. You'll see detailed information including:

- Timestamp
- Request method
- Headers
- Body payload

## API Endpoints

### `POST /api/webhook`
Receives webhook payloads and processes them.

### `GET /api/webhook`
Returns information about the webhook endpoint.

## Customization

You can extend the webhook functionality by:

1. **Adding Database Storage**: Modify the webhook route to save payloads to a database
2. **Adding Authentication**: Implement webhook signature verification
3. **Adding Event Processing**: Add specific logic for different event types
4. **Adding Rate Limiting**: Implement request throttling

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── webhook/
│   │       └── route.ts      # Webhook API endpoint
│   ├── page.tsx              # Main page with instructions
│   ├── layout.tsx            # App layout
│   └── globals.css           # Global styles
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **ESLint** - Code quality

## Deployment

This app can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Any Node.js hosting platform**

## License

MIT
# webhook
