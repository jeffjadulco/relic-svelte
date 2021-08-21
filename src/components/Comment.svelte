<script lang="ts">
  import type { Comment } from "../types/reddit"

  export let comment: Comment
</script>

<li>
  <span class="info">{comment.author} {comment.created}</span>

  <p>{@html comment.content}</p>

  <ul>
    {#each comment.replies as reply}
      <svelte:self comment={reply} />
    {/each}
  </ul>
</li>

<style type="text/postcss">
  ul {
    @apply pl-4 border-l border-gray-400;
  }

  li {
    @apply py-1;
  }

  .info {
    @apply text-xs font-semibold;
  }
</style>
