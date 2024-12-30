<script lang="ts">
  let {
    times = [],
    value = $bindable(),
  }: {
    times?: any[];
    value: string;
  } = $props();

  const setTime = (t: any) => {
    value = t;
  };
</script>

<div class="grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-4">
  {#each times as item}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
      onclick={() => setTime(item.time)}
      class="time cursor-pointer {item.status == 'available'
        ? ''
        : 'disable-time'} {item.time == value ? 'active-time' : ''}"
    >
      {item.time}
    </div>
  {/each}
</div>

<style lang="scss">
  .time {
    @apply flex h-11 w-full items-center justify-center rounded-md border border-base-300 text-black;
    &.disable-time {
      @apply bg-base-300;
    }
    &.active-time {
      @apply border-primary bg-primary text-white;
    }
  }
</style>
