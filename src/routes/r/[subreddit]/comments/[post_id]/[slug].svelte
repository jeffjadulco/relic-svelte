<script lang="ts">
  import { onMount } from "svelte"
  import { isRedditPostUrl } from "$src/lib/reddit"
  import { fetchPostData, post, post_url, comments } from "$src/store/data"

  import Feed from "$src/components/Feed.svelte"
  import Comment from "$src/components/Comment.svelte"
  import Post from "$src/components/Post.svelte"
  import Interval from "$src/components/Interval.svelte"

  onMount(() => {
    if (!$post_url) {
      const pathname = new URL(window.location.toString()).pathname

      if (isRedditPostUrl(pathname)) {
        post_url.set(pathname)
        fetchPostData(pathname)
      } else {
        console.log("please enter a valid url")
      }
    }
  })
</script>

<main>
  {#if $post && $comments}
    <Interval />
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
