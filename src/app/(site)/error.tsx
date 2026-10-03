'use client'

import { useEffect } from 'react'

import { Button, Container } from '@/design-system'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <Container className="flex min-h-[60svh] flex-col items-start justify-center gap-6 py-20">
      <p className="text-label text-danger">Something went wrong</p>
      <h1 className="max-w-2xl text-h1">We hit an unexpected problem loading this page.</h1>
      <p className="max-w-xl text-muted">
        Please try again. If it keeps happening, email hello@oqtekal.com and we will fix it fast.
      </p>
      <Button onClick={reset}>Try again</Button>
    </Container>
  )
}
