'use client' // if you're using App Router

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RedirectPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/admin/overview') // change '/new-page' to your target
  }, [router])

  return <p>Redirecting...</p>
}
