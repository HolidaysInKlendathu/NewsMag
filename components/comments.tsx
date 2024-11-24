import { useState, FormEvent } from 'react'
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Comment, CommentType } from './Comment'

export function Comments({ articleId }: { articleId: string }) {
  const [comments, setComments] = useState<CommentType[]>([])
  const [newComment, setNewComment] = useState('')
  const { toast } = useToast()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!newComment.trim()) return

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          articleId,
          content: newComment,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit comment')
      }

      const createdComment: CommentType = await response.json()
      setComments(prevComments => [createdComment, ...prevComments])
      setNewComment('')

      toast({
        title: "Comment submitted",
        description: "Your comment has been successfully posted.",
      })
    } catch (error) {
      console.error('Error submitting comment:', error)
      toast({
        title: "Error",
        description: "Failed to submit comment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleReply = async (parentId: string, content: string) => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          articleId,
          parentId,
          content,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit reply')
      }

      const createdReply: CommentType = await response.json()
      setComments(prevComments => addReply(prevComments, parentId, createdReply))

      toast({
        title: "Reply submitted",
        description: "Your reply has been successfully posted.",
      })
    } catch (error) {
      console.error('Error submitting reply:', error)
      toast({
        title: "Error",
        description: "Failed to submit reply. Please try again.",
        variant: "destructive",
      })
    }
  }

  const addReply = (comments: CommentType[], parentId: string, newReply: CommentType): CommentType[] => {
    return comments.map(comment => {
      if (comment.id === parentId) {
        return { ...comment, replies: [newReply, ...comment.replies] }
      } else if (comment.replies.length > 0) {
        return { ...comment, replies: addReply(comment.replies, parentId, newReply) }
      }
      return comment
    })
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave a comment..."
          className="mb-2"
          required
        />
        <Button type="submit">Submit Comment</Button>
      </form>
      <div className="space-y-4">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} onReply={handleReply} />
        ))}
      </div>
    </div>
  )
}

