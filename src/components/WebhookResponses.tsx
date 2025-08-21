'use client'

import { useState, useEffect } from 'react'

interface WebhookResponse {
  id: string
  timestamp: string
  method: string
  headers: Record<string, string>
  body: any
  status: number
}

export default function WebhookResponses() {
  const [responses, setResponses] = useState<WebhookResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock data for demonstration - in a real app, this would come from your backend
  const mockResponses: WebhookResponse[] = [
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
        },
        timestamp: '2024-01-01T00:00:00Z'
      },
      status: 200
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 60000).toISOString(), // 1 minute ago
      method: 'POST',
      headers: {
        'content-type': 'text/plain',
        'user-agent': 'PostmanRuntime/7.45.0',
        'postman-token': '5299e87a-f408-48a4-bfa5-7dc2364b8348'
      },
      body: 'working baby',
      status: 200
    }
  ]

  useEffect(() => {
    setResponses(mockResponses)
  }, [])

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

  const formatBody = (body: any) => {
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
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Webhook Responses</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {responses.length} response{responses.length !== 1 ? 's' : ''}
          </span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {responses.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-500 dark:text-gray-400">No webhook responses yet</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Send a request to see responses here</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {responses.map((response) => (
            <div key={response.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMethodColor(response.method)}`}>
                      {response.method}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(response.status)}`}>
                      {response.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formatTimestamp(response.timestamp)}</span>
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
                        {Object.entries(response.headers).map(([key, value]) => (
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
                        {formatBody(response.body)}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Timestamp Details */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Received at: {new Date(response.timestamp).toLocaleString()}</span>
                    <span>ID: {response.id}</span>
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
