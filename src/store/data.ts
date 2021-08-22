import { writable, get } from "svelte/store"
import { parsePost, parseComments } from "../lib/reddit"

import type { Writable } from "svelte/store"
import type { Comment, Post } from "../types/reddit"

export const post: Writable<Post | null | undefined> = writable(null)
export const comments: Writable<Array<Comment> | null | undefined> =
  writable(null)
export const error: Writable<Error | null | undefined> = writable(null)
export const updated_at: Writable<Date> = writable(new Date())
export const fetch_interval: Writable<number> = writable(2000)
export const post_url: Writable<string | null | undefined> = writable(null)
export const refetch_handle: Writable<NodeJS.Timeout | null | undefined> =
  writable(null)

export async function fetchPostData(url: string) {
  try {
    if (!url.includes("www.reddit.com")) {
      url = `https://www.reddit.com${url}`
    }

    const response = await fetch(`${url}.json?sort=new`).then((r) => r.json())
    if (!response || !Array.isArray(response))
      throw new Error("Unable to fetch post")

    if (post_url) {
      // @todo ugly. handle this one better
      post.set(parsePost(response))
      comments.set(parseComments(response))
      updated_at.set(new Date())
    }

    // auto fetch
    const handle = setTimeout(() => {
      fetchPostData(url)
    }, get(fetch_interval))

    refetch_handle.set(handle)
  } catch (error) {
    // @todo add error handling
    console.error(error)
    error.set(error)
  }
}

export function updateInterval(ms: number) {
  if (ms !== undefined) {
    fetch_interval.set(ms)
  }
}

export function reset() {
  clearTimeout(get(refetch_handle))
  post.set(null)
  comments.set(null)
  error.set(null)
  updated_at.set(null)
  post_url.set(null)
  refetch_handle.set(null)
}
