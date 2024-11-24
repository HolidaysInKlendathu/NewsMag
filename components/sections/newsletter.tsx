'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Success!',
      description: 'You have been subscribed to our newsletter.',
    })
    setEmail('')
  }

  return (
    <section className="rounded-xl bg-muted p-8 text-center">
      <h2 className="mb-2 text-4xl">Stay Updated</h2>
      <p className="mb-6 text-muted-foreground">
        Subscribe to our newsletter for the latest news and updates.
      </p>
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-md gap-4">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit">Subscribe</Button>
      </form>
    </section>
  )
}