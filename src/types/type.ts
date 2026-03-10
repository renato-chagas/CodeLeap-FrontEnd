
export type Post = {
  id: number
  username: string
  created_datetime: string
  title: string
  content: string
}

export type PostsResponse = {
  results: Post[]
}

// DTOS

export type CreatePostDTO = {
  username: string
  title: string
  content: string
}