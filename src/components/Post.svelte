<script lang="ts">
  import type { Post } from "../types/reddit"

  export let post: Post
</script>

<div>
  <h2>{post.title}</h2>
  <div class="content">{@html post.content}</div>
</div>

<style type="text/postcss">
  div {
    @apply mt-4 mb-8;
  }

  h2 {
    @apply text-2xl font-semibold text-gray-800;
  }

  .content {
    @apply prose-sm;
  }
</style>
