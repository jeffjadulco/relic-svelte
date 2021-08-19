<script lang="ts">
  import { fetchPostData } from "../store/data"
  let link: string

  function onClickSearch(event: Event) {
    event.preventDefault()
    fetchPostData(link)
  }
</script>

<form on:submit={onClickSearch}>
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
