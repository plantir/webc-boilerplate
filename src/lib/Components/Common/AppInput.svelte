<script lang="ts">
  import { useConvertPersianNumbers } from "../../help";

  let {
    labelText,
    value = $bindable(),
    oninput,
    placeholder,
    convertPersian = false,
  }: {
    labelText: string;
    value: any;
    oninput?: any;
    convertPersian: boolean;
    placeholder?: string;
  } = $props();
</script>

<div>
  <label for="input" class="block text-sm text-black mb-3">{labelText}</label>
  {#if convertPersian}
    <input
      type="text"
      id="input"
      class="flex h-12 w-full items-center !rounded-md border !border-[#E8E8E8] px-3 !outline-none text-black placeholder:text-[#AAAAAA]"
      bind:value
      use:useConvertPersianNumbers
      {placeholder}
      {oninput}
    />
  {:else}
    <input
      type="text"
      id="input"
      class="flex h-12 w-full items-center !rounded-md border !border-[#E8E8E8] px-3 !outline-none text-black placeholder:text-[#AAAAAA]"
      bind:value
      {placeholder}
      {oninput}
    />
  {/if}
</div>
