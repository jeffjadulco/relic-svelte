<script lang="ts">
  import type { Post } from "../types/reddit"

  export let post: Post
</script>

<div>
  <h1>{post.title}</h1>
  {@html post.content}
</div>

<style type="text/postcss">
  div {
    @apply my-8;
  }

  h1 {
    @apply text-2xl;
  }
</style>
