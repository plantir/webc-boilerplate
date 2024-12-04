<script lang="ts">
  let {
    labelText,
    value = $bindable(),
    oninput,
    placeholder,
  }: {
    labelText: string;
    value: any;
    oninput?: any;
    placeholder?: string;
  } = $props();
</script>

<div>
  <label for="input" class="block text-sm text-black mb-3">{labelText}</label>
  <input
    type="text"
    id="input"
    class="flex h-12 w-full items-center rounded-md border border-[#E8E8E8] px-3 !outline-none text-black placeholder:text-[#AAAAAA]"
    bind:value
    {placeholder}
    {oninput}
  />
</div>
