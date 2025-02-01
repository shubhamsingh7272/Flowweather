import { render } from '@testing-library/react'
import { useRouter, useSearchParams } from 'next/navigation'

// Mock the Next.js hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn()
}))

export function renderWithRouter(ui: React.ReactElement) {
  // Setup mock implementations
  (useRouter as jest.Mock).mockImplementation(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn()
  }))
  
  (useSearchParams as jest.Mock).mockImplementation(() => ({
    get: jest.fn(),
    has: jest.fn()
  }))

  return render(ui)
}

export * from '@testing-library/react' 