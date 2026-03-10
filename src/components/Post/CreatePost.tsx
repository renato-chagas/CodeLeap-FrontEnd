import { useState } from "react"
import { createPost } from "../../services/api"

type Props = {
  reloadPosts: () => void | Promise<void>
}

export default function CreatePost({ reloadPosts }: Props) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canSubmit = title.trim() !== "" && content.trim() !== "" && !loading

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canSubmit) return

    try {
      setLoading(true)
      setError(null)

      const username = localStorage.getItem("username") ?? "anonymous"

      await createPost({
        username,
        title: title.trim(),
        content: content.trim()
      })

      setTitle("")
      setContent("")
      await Promise.resolve(reloadPosts())
    } catch (err) {
      console.error(err)
      setError("Não foi possível criar o post.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <article className="CreatePostCard">
      <h2>What's on your mind?</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="post-title">Title</label>
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Hello World"
          maxLength={120}
        />

        <label htmlFor="post-content">Content</label>
        <textarea
          id="post-content"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content here"
          maxLength={2000}
        />

        {error && <p>{error}</p>}

        <button
          type="submit"
          className="CreateButton"
          disabled={!canSubmit}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </article>
  )
}