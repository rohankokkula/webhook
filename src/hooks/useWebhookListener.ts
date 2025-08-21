import { useState, useEffect, useCallback } from 'react'

interface WebhookResponse {
  id: string
  timestamp: string
  method: string
  headers: Record<string, string>
  body: string | Record<string, unknown>
  status: number
}

export const useWebhookListener = () => {
  const [responses, setResponses] = useState<WebhookResponse[]>([])
  const [isListening, setIsListening] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Generate unique ID
  const generateId = () => Math.random().toString(36).substr(2, 9)

  // Load saved responses from localStorage
  useEffect(() => {
    const savedResponses = localStorage.getItem('webhookResponses')
    if (savedResponses) {
      try {
        const parsed = JSON.parse(savedResponses)
        setResponses(parsed)
        if (parsed.length > 0) {
          setLastUpdate(new Date(parsed[0].timestamp))
        }
      } catch (e) {
        console.error('Error loading saved responses:', e)
      }
    }
  }, [])

  // Save responses to localStorage whenever they change
  useEffect(() => {
    if (responses.length > 0) {
      localStorage.setItem('webhookResponses', JSON.stringify(responses))
    }
  }, [responses])

  // Add a new webhook response
  const addResponse = useCallback((response: Omit<WebhookResponse, 'id'>) => {
    const newResponse: WebhookResponse = {
      ...response,
      id: generateId()
    }

    setResponses(prev => {
      const newResponses = [newResponse, ...prev].slice(0, 20) // Keep last 20
      return newResponses
    })

    setLastUpdate(new Date())
  }, [])

  // Clear all responses
  const clearResponses = useCallback(() => {
    setResponses([])
    localStorage.removeItem('webhookResponses')
    setLastUpdate(new Date())
  }, [])

  // Simulate real-time webhook listening (for demo purposes)
  useEffect(() => {
    if (!isListening) return

    const interval = setInterval(() => {
      // Simulate new webhook arrivals
      if (Math.random() < 0.2) { // 20% chance every interval
        const newResponse = generateMockWebhook()
        addResponse(newResponse)
      }
    }, 8000) // Check every 8 seconds

    return () => clearInterval(interval)
  }, [isListening, addResponse])

  // Generate mock webhook data for demonstration
  const generateMockWebhook = (): Omit<WebhookResponse, 'id'> => {
    const payloads = [
      // User events
      {
        event: 'user.created',
        data: {
          userId: Math.random().toString(36).substr(2, 8),
          email: `user${Math.floor(Math.random() * 1000)}@example.com`,
          name: `User ${Math.floor(Math.random() * 1000)}`,
          age: Math.floor(Math.random() * 50) + 18,
          isActive: Math.random() > 0.5
        },
        metadata: {
          source: 'web-app',
          version: '1.0.0'
        },
        timestamp: new Date().toISOString()
      },
      // Order events
      {
        event: 'order.completed',
        data: {
          orderId: `ORD-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
          customer: {
            id: `CUST-${Math.floor(Math.random() * 1000)}`,
            name: `Customer ${Math.floor(Math.random() * 1000)}`,
            email: `customer${Math.floor(Math.random() * 1000)}@example.com`
          },
          items: [
            {
              productId: `PROD-${Math.floor(Math.random() * 1000)}`,
              name: ['Laptop', 'Mouse', 'Keyboard', 'Monitor', 'Headphones'][Math.floor(Math.random() * 5)],
              quantity: Math.floor(Math.random() * 5) + 1,
              price: Math.floor(Math.random() * 1000) + 10
            }
          ],
          total: Math.floor(Math.random() * 1000) + 50,
          currency: 'USD'
        },
        metadata: {
          source: 'ecommerce-system',
          version: '2.1.0',
          environment: 'production'
        },
        timestamp: new Date().toISOString()
      },
      // Payment events
      {
        event: 'payment.processed',
        data: {
          paymentId: `PAY-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
          amount: Math.floor(Math.random() * 1000) + 10,
          currency: 'USD',
          status: 'completed',
          method: ['credit_card', 'paypal', 'stripe', 'apple_pay'][Math.floor(Math.random() * 4)]
        },
        timestamp: new Date().toISOString()
      },
      // Simple text payloads
      'webhook test message',
      'ping from monitoring system',
      'health check completed',
      // Notification events
      {
        event: 'notification.sent',
        data: {
          type: ['email', 'sms', 'push'][Math.floor(Math.random() * 3)],
          recipient: `user${Math.floor(Math.random() * 1000)}@example.com`,
          template: ['welcome', 'reminder', 'alert'][Math.floor(Math.random() * 3)],
          status: 'delivered'
        },
        timestamp: new Date().toISOString()
      }
    ]

    const randomPayload = payloads[Math.floor(Math.random() * payloads.length)]
    const isJson = typeof randomPayload === 'object'

    return {
      timestamp: new Date().toISOString(),
      method: 'POST',
      headers: {
        'content-type': isJson ? 'application/json' : 'text/plain',
        'user-agent': 'PostmanRuntime/7.45.0',
        'postman-token': Math.random().toString(36).substr(2, 16),
        'accept': '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'connection': 'keep-alive',
        'host': 'webhook.eu-contentstackapps.com',
        'x-forwarded-for': '::1',
        'x-forwarded-host': 'webhook.eu-contentstackapps.com',
        'x-forwarded-port': '443',
        'x-forwarded-proto': 'https'
      },
      body: randomPayload,
      status: 200
    }
  }

  return {
    responses,
    isListening,
    lastUpdate,
    addResponse,
    clearResponses,
    setIsListening
  }
}
