'use client'

import { useState, useEffect } from 'react'

interface RealWebhookData {
  id: string
  timestamp: string
  method: string
  headers: Record<string, string>
  body: string | Record<string, unknown>
  status: number
  source: 'console' | 'api'
}

export default function RealWebhookCapture() {
  const [webhooks, setWebhooks] = useState<RealWebhookData[]>([])
  const [isCapturing, setIsCapturing] = useState(true)

  // Simulate capturing real webhook data from console logs
  useEffect(() => {
    if (!isCapturing) return

    // Load existing webhooks from localStorage
    const savedWebhooks = localStorage.getItem('realWebhookData')
    if (savedWebhooks) {
      try {
        setWebhooks(JSON.parse(savedWebhooks))
      } catch (e) {
        console.error('Error loading saved webhooks:', e)
      }
    }

    // Simulate capturing webhook data every few seconds
    const interval = setInterval(() => {
      if (Math.random() < 0.4) { // 40% chance every interval
        captureNewWebhook()
      }
    }, 6000) // Check every 6 seconds

    return () => clearInterval(interval)
  }, [isCapturing])

  // Save webhooks to localStorage whenever they change
  useEffect(() => {
    if (webhooks.length > 0) {
      localStorage.setItem('realWebhookData', JSON.stringify(webhooks))
    }
  }, [webhooks])

  const captureNewWebhook = () => {
    // Simulate capturing real webhook data that matches your console logs
    const webhookTypes = [
      {
        method: 'POST' as const,
        headers: {
          'accept': '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'connection': 'keep-alive',
          'content-length': '14',
          'content-type': 'text/plain',
          'host': 'localhost:3001',
          'postman-token': Math.random().toString(36).substr(2, 16),
          'user-agent': 'PostmanRuntime/7.45.0',
          'x-forwarded-for': '::1',
          'x-forwarded-host': 'localhost:3001',
          'x-forwarded-port': '3001',
          'x-forwarded-proto': 'http'
        },
        body: 'working baby' as const,
        status: 200 as const
      },
      {
        method: 'POST' as const,
        headers: {
          'accept': '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'connection': 'keep-alive',
          'content-length': '213',
          'content-type': 'application/json',
          'host': 'localhost:3001',
          'user-agent': 'Test-Script/1.0',
          'x-forwarded-for': '::1',
          'x-forwarded-host': 'localhost:3001',
          'x-forwarded-port': '3001',
          'x-forwarded-proto': 'http',
          'postman-token': Math.random().toString(36).substr(2, 16)
        },
        body: {
          event: 'user.created',
          data: {
            userId: Math.random().toString(36).substr(2, 8),
            email: `user${Math.floor(Math.random() * 1000)}@example.com`,
            name: `User ${Math.floor(Math.random() * 1000)}`,
            age: Math.floor(Math.random() * 50) + 18,
            isActive: Math.random() > 0.5
          },
          metadata: { 
            source: 'test-script', 
            version: '1.0.0' 
          },
          timestamp: new Date().toISOString()
        },
        status: 200 as const
      }
    ]

    const randomWebhook = webhookTypes[Math.floor(Math.random() * webhookTypes.length)]
    
    const newWebhook: RealWebhookData = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      method: randomWebhook.method,
      headers: randomWebhook.headers,
      body: randomWebhook.body,
      status: randomWebhook.status,
      source: 'console'
    }

    setWebhooks(prev => {
      const newWebhooks = [newWebhook, ...prev].slice(0, 15) // Keep last 15
      return newWebhooks
    })
  }

  const clearWebhooks = () => {
    setWebhooks([])
    localStorage.removeItem('realWebhookData')
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }

  const formatBody = (body: string | Record<string, unknown>) => {
    if (typeof body === 'string') {
      return body
    }
    return JSON.stringify(body, null, 2)
  }

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    if (status >= 400 && status < 500) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
    if (status >= 500) return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case 'GET': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'POST': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'PUT': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'DELETE': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Real Webhook Capture</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isCapturing ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className={`text-sm ${isCapturing ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {isCapturing ? 'Capturing' : 'Stopped'}
            </span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {webhooks.length} webhook{webhooks.length !== 1 ? 's' : ''}
          </span>
          <button
            onClick={() => setIsCapturing(!isCapturing)}
            className={`px-3 py-2 text-white text-sm font-medium rounded-lg transition-colors ${
              isCapturing 
                ? 'bg-yellow-600 hover:bg-yellow-700' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isCapturing ? 'Stop' : 'Start'} Capture
          </button>
          <button
            onClick={clearWebhooks}
            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-center space-x-2 text-blue-800 dark:text-blue-200">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium">
            This component simulates capturing real webhook data from your console logs. 
            In a production app, this would connect to your webhook endpoint and capture actual incoming requests.
          </span>
        </div>
      </div>

      {webhooks.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-500 dark:text-gray-400">No webhooks captured yet...</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Webhooks will be captured automatically</p>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isCapturing ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className={`text-sm ${isCapturing ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {isCapturing ? 'Capturing webhooks' : 'Capture stopped'}
            </span>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {webhooks.map((webhook, index) => (
            <div 
              key={webhook.id} 
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ${
                index === 0 ? 'ring-2 ring-blue-200 dark:ring-blue-800' : ''
              }`}
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMethodColor(webhook.method)}`}>
                      {webhook.method}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(webhook.status)}`}>
                      {webhook.status}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-medium rounded-full">
                      {webhook.source.toUpperCase()}
                    </span>
                    {index === 0 && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs font-medium rounded-full animate-pulse">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formatTimestamp(webhook.timestamp)}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Headers */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                      Headers
                    </h4>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="space-y-2 text-xs">
                        {Object.entries(webhook.headers).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="font-mono text-gray-600 dark:text-gray-400">{key}:</span>
                            <span className="font-mono text-gray-800 dark:text-gray-200 break-all">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                      Body
                    </h4>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <pre className="text-xs font-mono text-gray-800 dark:text-gray-200 overflow-x-auto whitespace-pre-wrap">
                        {formatBody(webhook.body)}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Timestamp Details */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Captured at: {new Date(webhook.timestamp).toLocaleString()}</span>
                    <span>ID: {webhook.id}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
