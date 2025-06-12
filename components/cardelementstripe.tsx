// components/cardelementstripe.tsx
"use client"

import React, { useEffect, useState } from 'react'
import { CardElement } from '@stripe/react-stripe-js'
import type { StripeCardElementChangeEvent } from '@stripe/stripe-js'

interface CardElementStripProps {
  onCardChange: (isValid: boolean, error?: string) => void
}

export function CardElementstrip({ onCardChange }: CardElementStripProps) {
  const [error, setError] = useState<string | null>(null)
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = (event: StripeCardElementChangeEvent) => {
    if (event.error) {
      setError(event.error.message)
      onCardChange(false, event.error.message)
    } else {
      setError(null)
      onCardChange(event.complete, undefined)
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#374151', // Dark gray for text to match your form inputs
        fontFamily: 'Inter, system-ui, sans-serif',
        backgroundColor: 'transparent',
        '::placeholder': {
          color: '#9ca3af', // Light gray for placeholders
        },
        iconColor: '#2563eb', // Blue to match your theme
      },
      invalid: {
        color: '#dc2626', // Red for errors
        iconColor: '#dc2626',
      },
    },
    hidePostalCode: true,
    classes: {
      focus: 'ring-2 ring-blue-500 ring-opacity-20',
    },
  }

  return (
    <div 
      className={`p-3 bg-white border rounded-lg transition-all text-lg ${
        isFocused 
          ? 'border-blue-500 ring-2 ring-blue-500/20' 
          : error 
            ? 'border-red-500' 
            : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      <CardElement 
        options={cardElementOptions}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      
      {error && (
        <p className="text-red-500 text-sm mt-2 font-medium">
          {error}
        </p>
      )}
    </div>
  )
}