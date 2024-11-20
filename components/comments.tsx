'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { useToast } from './ui/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const commentSchema = z.object({
  content: z.string().min(1).max(500),
})

interface CommentsProps {
  articleId: string
}

export function Comments({ articleId }: CommentsProps) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [comments, setComments] = useState([])
  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: '',
    },
  })

  async function onSubmit(data: z.infer<typeof commentSchema>) {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: data.content,
          articleId,
        }),
      })

      if (!response.ok) throw new Error('Failed to post comment')

      const newComment = await response.json()
      setComments([newComment, ...comments])
      form.reset()
      
      toast({
        title: 'Comment posted successfully',
      })
    } catch (error) {
      toast({
        title: 'Error posting comment',
        variant: 'destructive',
      })
    }
  }

  if (!session) {
    return (
      <div className="text-center py-8">
        <p>Please sign in to leave a comment.</p>
        <Button className="mt-4">Sign In</Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto mt-16">
      <h2 className="text-2xl font-bold mb-8">Comments</h2>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8">
        <Textarea
          placeholder="Leave a comment..."
          {...form.register('content')}
          className="mb-4"
        />
        <Button type="submit">Post Comment</Button>
      </form>

      <div className="space-y-8">
        {comments.map((comment: any) => (
          <div key={comment.id} className="flex space-x-4">
            <Avatar>
              <AvatarImage src={comment.user.image} />
              <AvatarFallback>{comment.user.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <p className="font-semibold">{comment.user.name}</p>
                <span className="text-muted-foreground text-sm">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-1">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}