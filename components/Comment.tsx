import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { formatDistanceToNow } from 'date-fns'

export type CommentType = {
  id: string
  content: string
  author: string
  createdAt: string
  replies: CommentType[]
}

interface CommentProps {
  comment: CommentType
  onReply: (parentId: string, content: string) => void
}

export function Comment({ comment, onReply }: CommentProps) {
  const [isReplying, setIsReplying] = useState(false)
  const [replyContent, setReplyContent] = useState('')

  const handleReply = () => {
    if (replyContent.trim()) {
      onReply(comment.id, replyContent)
      setReplyContent('')
      setIsReplying(false)
    }
  }

  return (
    <div className="mb-4">
      <div className="flex space-x-4">
        <Avatar>
          <AvatarImage src="/placeholder-avatar.jpg" alt={comment.author} />
          <AvatarFallback>{comment.author[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center">
            <p className="font-semibold">{comment.author}</p>
            <span className="mx-2 text-muted-foreground">•</span>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </p>
          </div>
          <p className="mt-1">{comment.content}</p>
          <Button 
            variant="link" 
            className="p-0 h-auto font-normal text-muted-foreground" 
            onClick={() => setIsReplying(!isReplying)}
          >
            Reply
          </Button>
          {isReplying && (
            <div className="mt-2">
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="mb-2"
              />
              <Button onClick={handleReply} size="sm">Post Reply</Button>
            </div>
          )}
        </div>
      </div>
      {comment.replies.length > 0 && (
        <div className="ml-12 mt-4">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  )
}

