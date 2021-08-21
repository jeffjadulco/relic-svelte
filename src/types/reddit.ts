export interface Post {
  title: string
  author: string
  content: string
  comment_count: number
}

export interface Comment {
  author: string
  score: number
  content: string
  created: string
  replies: Comment[]
}
