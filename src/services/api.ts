import axios from "axios"
import type { Post, PostsResponse, CreatePostDTO } from "../types/type"

const api = axios.create({
  baseURL: "https://dev.codeleap.co.uk/careers/"
})

export async function getPosts(): Promise<Post[]> {
  const response = await api.get<PostsResponse>("")
  return response.data.results
}

export async function createPost(data: {
  username: string
  title: string
  content: string
}): Promise<CreatePostDTO> {
  const response = await api.post<Post>("", data)
  return response.data
}

export async function updatePost(
  id: number,
  data: { title: string; content: string }
): Promise<Post> {
  const response = await api.patch<Post>(`${id}/`, data)
  return response.data
}

export async function deletePost(id: number): Promise<void> {
  await api.delete(`${id}/`)
}