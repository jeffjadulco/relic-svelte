<script lang="ts">
  import { onMount } from "svelte"
  import { isRedditPostUrl } from "../lib/reddit"
  import {
    fetchPostData,
    post,
    post_url,
    comments,
    reset,
  } from "$src/store/data"

  import InputField from "$src/components/InputField.svelte"
  import Feed from "$src/components/Feed.svelte"
  import Comment from "$src/components/Comment.svelte"
  import Post from "$src/components/Post.svelte"
  import Live from "$src/components/Live.svelte"

  reset()

  onMount(() => {
    if (!$post_url) {
      const pathname = new URL(window.location.toString()).pathname

      if (isRedditPostUrl(pathname)) {
        post_url.set(pathname)
        fetchPostData(pathname)
      }
    }

    return () => reset()
  })
</script>

<main>
  {#if !$post && !$comments}
    <div>
      <h1>RELIC</h1>
      <p>Reddit Live Comments</p>
      <InputField />
    </div>
  {:else}
    <Live>
      <Feed>
        <Post slot="post" post={$post} />
        <svelte:fragment slot="comments">
          {#each $comments as comment}
            <Comment {comment} />
          {/each}
        </svelte:fragment>
      </Feed>
    </Live>
  {/if}
</main>

<style type="text/postcss">
  h1 {
    @apply text-6xl font-bold inline text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-yellow-500;
  }

  main div {
    @apply flex flex-col items-center h-full justify-center mt-40;
  }

  p {
    @apply text-gray-700;
  }
</style>
