<script lang="ts">
  import { updateInterval } from "../store/data"

  let selected

  $: updateInterval(selected)
</script>

<select bind:value={selected}>
  <option value={2000}>2s</option>
  <option value={5000}>5s</option>
  <option value={10000}>10s</option>
  <option value={30000}>30s</option>
  <option value={60000}>60s</option>
</select>
