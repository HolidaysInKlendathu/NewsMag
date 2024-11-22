// app/articles/[slug]/not-found.tsx
export default function ArticleNotFound() {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <p className="text-muted-foreground">
          The article you are looking for does not exist or has been removed.
        </p>
      </div>
    )
  }