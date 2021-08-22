<script lang="ts">
  import { LoaderIcon } from "svelte-feather-icons"
  import Interval from "$src/components/Interval.svelte"
</script>

<header>
  <h1><a href="/">RELIC</a></h1>
  <Interval />
</header>
<main>
  <slot>
    <LoaderIcon class="animate-spin" size="1x" />
  </slot>
</main>

<style type="text/postcss">
  header {
    @apply max-w-screen-md w-full mx-auto px-4 py-2 sticky top-0 bg-[#fafafa] border-b flex justify-between items-center;
  }

  h1 {
    @apply text-2xl font-bold inline text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-yellow-500;
  }
</style>
