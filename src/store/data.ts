import { writable, get } from "svelte/store"
import { formatDistance, fromUnixTime } from "date-fns"
import { decode } from "html-entities"

import type { Writable } from "svelte/store"

interface Post {
  title: string
  author: string
  content: string
  comment_count: number
}

interface Comment {
  author: string
  score: number
  content: string
  created: string
  replies: Comment[]
}

export const post: Writable<Post | null | undefined> = writable(null)
export const comments: Writable<Array<Comment> | null | undefined> =
  writable(null)
export const error: Writable<Error | null | undefined> = writable(null)
export const updated_at: Writable<Date> = writable(new Date())
export const fetch_interval: Writable<number> = writable(2000)

export async function fetchPostData(url: string) {
  try {
    const response = await fetch(`${url}.json?sort=new`).then((r) => r.json())
    if (!response || !Array.isArray(response))
      throw new Error("Unable to fetch post")

    const mapped_post = response[0].data.children.map((p) => ({
      title: p.data.title,
      author: p.data.author,
      content: p.data.selftext,
      comment_count: p.data.num_comments,
    }))

    post.set(Object.assign({}, ...mapped_post))

    const now = new Date()

    const getDateString = (unix) => {
      if (!unix) return ""
      return formatDistance(fromUnixTime(unix), now, {
        includeSeconds: true,
        addSuffix: true,
      })
    }

    comments.set(
      response[1].data.children
        .filter((c) => !c.data.stickied)
        .map((c) => ({
          author: c.data.author,
          score: c.data.score,
          content: decode(c.data.body_html),
          created: getDateString(c.data.created),
          replies: [],
        }))
    )

    updated_at.set(new Date())

    // auto fetch
    setTimeout(() => {
      fetchPostData(url)
    }, get(fetch_interval))
  } catch (error) {
    // @todo add error handling
    console.error(error)
    error.set(error)
  }
}

export function updateInterval(ms: number) {
  fetch_interval.set(ms)
}
