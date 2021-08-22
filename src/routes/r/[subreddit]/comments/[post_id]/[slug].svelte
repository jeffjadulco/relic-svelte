<script lang="ts">
  import { onMount } from "svelte"
  import { isRedditPostUrl } from "$src/lib/reddit"
  import {
    fetchPostData,
    post,
    post_url,
    comments,
    reset,
  } from "$src/store/data"

  import Feed from "$src/components/Feed.svelte"
  import Comment from "$src/components/Comment.svelte"
  import Post from "$src/components/Post.svelte"
  import Live from "$src/components/Live.svelte"

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

<Live>
  {#if $post && $comments}
    <Feed>
      <Post slot="post" post={$post} />
      <svelte:fragment slot="comments">
        {#each $comments as comment}
          <Comment {comment} />
        {/each}
      </svelte:fragment>
    </Feed>
  {/if}
</Live>
