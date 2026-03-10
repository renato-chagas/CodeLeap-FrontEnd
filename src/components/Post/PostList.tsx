import type { Post } from "../../types/type"
import PostCard from "./PostCard"

type Props = {
  posts: Post[]
  loading: boolean
  error: string | null
  reloadPosts: () => void
}

export default function PostList({
  posts,
  loading,
  error,
  reloadPosts
}: Props) {
  if (loading) return <p>Loading posts...</p>

  if (error) return <p>{error}</p>

  return (
    <section className="PostList">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          reloadPosts={reloadPosts}
        />
      ))}
    </section>
  )
}