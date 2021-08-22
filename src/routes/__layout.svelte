<script>
  import "../app.postcss"
  import Footer from "$src/components/Footer.svelte"
</script>

<slot />
<Footer />

<style type="text/postcss">
  :global(main) {
    @apply flex-grow h-full max-w-screen-md mx-auto px-4;
  }
</style>
