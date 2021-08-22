<script lang="ts">
  import { updateInterval } from "../store/data"

  const options = [
    {
      value: 2000,
      label: "2s",
    },
    {
      value: 5000,
      label: "5s",
    },
    {
      value: 10000,
      label: "10s",
    },
    {
      value: 30000,
      label: "30s",
    },
    {
      value: 60000,
      label: "60s",
    },
  ]

  let interval = options[0].value

  $: updateInterval(interval)
</script>

<div>
  <span>Auto-refresh: </span>
  {#each options as option}
    <input
      name={option.label}
      id={option.label}
      type="radio"
      bind:group={interval}
      value={option.value}
    />
    <label for={option.label}>
      {option.label}
    </label>
  {/each}
</div>

<style type="text/postcss">
  input[type="radio"]:checked + label {
    @apply text-gray-900 font-semibold;
  }

  input {
    @apply absolute invisible;
  }

  label {
    @apply text-sm cursor-pointer text-gray-700 hover:text-yellow-600;
  }

  span {
    @apply text-xs text-gray-700;
  }
</style>
