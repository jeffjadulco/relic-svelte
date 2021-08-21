<script lang="ts">
  import { onMount } from "svelte"
  import { formatDistance } from "date-fns"
  import { isRedditPostUrl } from "./lib/reddit"
  import {
    fetchPostData,
    post,
    post_url,
    comments,
    updated_at,
    error,
  } from "./store/data"

  import InputField from "./components/InputField.svelte"
  import Interval from "./components/Interval.svelte"
  import Feed from "./components/Feed.svelte"
  import Comment from "./components/Comment.svelte"
  import Post from "./components/Post.svelte"

  let updated
  let isValidUrl: boolean

  function validateLocation() {
    if (!$post_url) {
      const pathname = new URL(window.location.toString()).pathname
      isValidUrl = isRedditPostUrl(pathname)

      if (isValidUrl) {
        post_url.set(pathname)
        fetchPostData(pathname)
      } else {
        console.log("please enter a valid url")
      }
    }
  }

  onMount(() => {
    const interval = setInterval(() => {
      updated = formatDistance($updated_at, new Date(), {
        includeSeconds: true,
        addSuffix: true,
      })
    }, 1000)

    console.log("pathname", window.location.pathname)

    validateLocation()

    return () => clearInterval(interval)
  })
</script>

<main>
  {#if !$post && !$comments}
    <h1>RELIC</h1>
    <InputField />
  {:else}
    <Interval />
    <p>Updated: {updated}</p>
    <Feed>
      <Post slot="post" post={$post} />
      <svelte:fragment slot="comments">
        {#each $comments as comment}
          <Comment {comment} />
        {/each}
      </svelte:fragment>
    </Feed>
  {/if}
</main>

<style type="text/postcss">
  main {
    @apply max-w-screen-md mx-auto;
  }
</style>
