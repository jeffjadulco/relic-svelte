<script lang="ts">
  import { fetchPostData, post_url } from "../store/data"
  import { isRedditPostUrl } from "../lib/reddit"

  let link: string

  function onClickSearch() {
    const { pathname } = new URL(link)

    if (isRedditPostUrl(pathname)) {
      history.pushState({ pathname }, document.title, pathname)
      post_url.set(pathname)
      fetchPostData(pathname)
    }
  }
</script>

<form on:submit|preventDefault={onClickSearch}>
  <div class="input-container">
    <label for="input_link">Enter a Reddit post url</label>
    <input bind:value={link} name="input_link" type="text" required />
  </div>
  <button type="submit"> View Comments </button>
</form>

<style type="text/postcss">
  form {
    @apply mt-8 flex flex-col items-center;
  }

  input {
    min-width: 450px;
    @apply px-4 py-3 ring-1 ring-gray-300 outline-none text-sm text-gray-700 focus-within:ring-yellow-500 focus-within:text-gray-800;
  }

  input:invalid {
    @apply ring-red-500;
  }

  .input-container {
    @apply flex flex-col items-center;
  }

  .input-container label {
    @apply -mb-3 px-2 py-1 bg-[#fafafa] z-10 text-sm text-gray-700 font-light;
  }

  button {
    @apply mt-4 px-4 py-3 bg-gray-900 text-white text-sm font-semibold border border-transparent;
  }

  button:hover {
    @apply bg-[#fafafa] text-gray-900 border border-black;
  }

  button:focus-within {
    @apply ring-1 ring-yellow-600 ring-offset-2 outline-none;
  }
</style>
