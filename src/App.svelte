<script lang="ts">
  import InputField from "./lib/InputField.svelte"
  import { post, comments, updated_at, error } from "./store/data"
  import { formatDistance } from "date-fns"
  import Interval from "./lib/Interval.svelte"

  let updated

  setInterval(() => {
    updated = formatDistance($updated_at, new Date(), {
      includeSeconds: true,
      addSuffix: true,
    })
  }, 1000)
</script>

<main class="max-w-screen-md mx-auto">
  <Interval />
  {#if !$post && !$comments}
    <h1>RELIC</h1>
    <InputField />
  {:else}
    <p>Updated: {updated}</p>
    <p class="my-8">{$post.content}</p>
    <ul class="flex flex-col gap-4 divide-y">
      {#each $comments as comment}
        <li>
          <span class="text-xs">{comment.author} {comment.created}</span>
          <p>{@html comment.content}</p>
        </li>
      {/each}
    </ul>
  {/if}
</main>
