import { decode } from "html-entities"
import { formatDistance, fromUnixTime } from "date-fns"

import type { Comment, Post } from "../types/reddit"

function getDateString(unix) {
  if (!unix) return ""
  return formatDistance(fromUnixTime(unix), new Date(), {
    includeSeconds: true,
    addSuffix: true,
  })
}

export function parsePost(data: any): Post {
  const mapped_post = data[0].data.children.map((p) => ({
    title: p.data.title,
    author: p.data.author,
    content: decode(p.data.selftext_html),
    comment_count: p.data.num_comments,
  }))

  return Object.assign({}, ...mapped_post)
}

function parseComment(comment: any): Comment {
  const replies = comment.data.replies?.data?.children.map((c) =>
    parseComment(c)
  )

  return {
    author: comment.data.author,
    score: comment.data.score,
    content: decode(comment.data.body_html),
    created: getDateString(comment.data.created),
    replies: replies || [],
  }
}

export function parseComments(data: any): Comment[] {
  return data[1].data.children
    .filter((c) => !c.data.stickied)
    .map((c) => parseComment(c))
}

export function isRedditPostUrl(pathname: string) {
  const matches = /\/r\/[a-zA-z0-9]+\/comments\/\S+/.test(pathname)
  return matches
}
