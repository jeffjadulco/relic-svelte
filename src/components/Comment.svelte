<script lang="ts">
  import { UserIcon } from "svelte-feather-icons"
  import type { Comment } from "../types/reddit"

  export let comment: Comment
</script>

<li>
  <div class="comment-info">
    <UserIcon size="1x" />
    <span>{comment.author} • {comment.created}</span>
  </div>

  <p class="content">{@html comment.content}</p>

  <ul>
    {#each comment.replies as reply}
      <svelte:self comment={reply} />
    {/each}
  </ul>
</li>

<style type="text/postcss">
  ul {
    @apply pl-4 border-l border-yellow-600;
  }

  li {
    @apply py-1;
  }

  .comment-info {
    @apply flex items-center gap-1 text-gray-700;
  }

  .comment-info span {
    @apply text-xs;
  }

  p.content {
    @apply prose-sm prose-yellow pt-1 pb-4 text-gray-900;
  }
</style>
