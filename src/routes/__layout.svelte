<script>
  import "../app.postcss"
</script>

<slot />

<style type="text/postcss">
  :global(main) {
    @apply max-w-screen-md mx-auto;
  }
</style>
