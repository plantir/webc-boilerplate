<script lang="ts">
  import type { Snippet } from "svelte";
  let {
    class: className,
    color,
    children,
    disabled = false,
    onclick,
    outline = false,
  }: {
    class?: string;
    color?: "primary";
    disabled?: boolean;
    children?: Snippet;
    onclick?: any;
    outline?: boolean;
  } = $props();
</script>

<div
  class="app-button color-{color} cursor-pointer outline-{outline} {className}"
  class:disabled
  {onclick}
>
  {#if children}
    {@render children()}
  {/if}
</div>

<style lang="scss">
  .app-button {
    @apply flex h-11 items-center justify-center gap-2 rounded-[10px] px-4 py-2;
    &.color-primary {
      @apply bg-primary text-white;
    }
    &.color- {
      @apply bg-base-100;
    }
    &.outline-true {
      @apply border bg-transparent;
      &.color- {
        @apply border-base-100 text-black;
      }
      &.color-primary {
        @apply border-primary text-primary;
      }
    }
    &.disabled {
      @apply opacity-50 pointer-events-none;
    }
  }
</style>
