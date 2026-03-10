import { useEffect, useState } from "react"
import "./main.css"
import { getPosts } from "../../services/api"
import type { Post } from "../../types/type"
import CreatePost from "../../components/Post/CreatePost"
import PostList from "../../components/Post/PostList"

export default function Main() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [postsError, setPostsError] = useState<string | null>(null)

  async function loadPosts() {
    try {
      setLoadingPosts(true)

      const data = await getPosts()

      const sortedPosts = data.sort(
        (a, b) =>
          new Date(b.created_datetime).getTime() -
          new Date(a.created_datetime).getTime()
      )

      setPosts(sortedPosts)
      setPostsError(null)
    } catch (error) {
      console.error(error)
      setPostsError("Could not load posts.")
    } finally {
      setLoadingPosts(false)
    }
  }

  useEffect(() => {
    void loadPosts()
  }, [])

  return (
    <main className="MainPage">
      <section className="MainContainer">

        <header className="MainHeader">
          CodeLeap Network
        </header>

        <CreatePost reloadPosts={loadPosts} />

        <PostList
          posts={posts}
          loading={loadingPosts}
          error={postsError}
          reloadPosts={loadPosts}
        />

      </section>
    </main>
  )
}