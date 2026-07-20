'use client'

import React from 'react'

// Polyfill missing useEffectEvent hook for Next.js internal React bundle compatibility
if (typeof (React as any).useEffectEvent === 'undefined') {
  ; (React as any).useEffectEvent = function useEffectEvent<A extends unknown[], R>(fn: (...args: A) => R) {
    const ref = React.useRef(fn)
    React.useInsertionEffect(() => {
      ref.current = fn
    })
    return React.useCallback((...args: A) => {
      return ref.current(...args)
    }, [])
  }
}

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export function Studio() {
  return <NextStudio config={config} />
}