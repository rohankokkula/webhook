const http = require('http');

// Test payload
const testPayload = {
  event: "user.created",
  data: {
    userId: "12345",
    email: "user@example.com",
    name: "John Doe",
    age: 30,
    isActive: true
  },
  metadata: {
    source: "test-script",
    version: "1.0.0"
  },
  timestamp: new Date().toISOString()
};

// Convert payload to JSON string
const postData = JSON.stringify(testPayload);

// Request options
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/webhook',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
    'User-Agent': 'Test-Script/1.0'
  }
};

// Make the request
const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('\nResponse Body:');
    try {
      const response = JSON.parse(data);
      console.log(JSON.stringify(response, null, 2));
    } catch (e) {
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error(`Request error: ${e.message}`);
});

// Send the payload
req.write(postData);
req.end();

console.log('Sending webhook payload...');
console.log('Payload:', JSON.stringify(testPayload, null, 2));
console.log('\n--- Response ---\n');
