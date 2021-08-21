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
  <input
    bind:value={link}
    type="text"
    placeholder="Paste a Reddit post link"
    class="bg-gray-100 px-3 py-2 rounded focus-within:ring-1 outline-none"
  />
  <button
    type="submit"
    class="px-3 py-2 rounded bg-blue-200 text-blue-600 hover:bg-blue-300"
  >
    Search
  </button>
</form>
