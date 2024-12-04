<script lang="ts">
  let {
    value = $bindable(),
    key,
    title,
    iconWrapper,
    onchange,
  }: {
    value: any;
    key: any;
    title: string;
    iconWrapper?: any;
    onchange?: any;
  } = $props();
  const changeValue = () => {
    value = key;
    onchange();
  };
</script>

<div
  class="box-border flex h-16 cursor-pointer items-center gap-2 rounded-md p-2 {value ==
  key
    ? 'bg-primary text-white'
    : 'border border-base-100 bg-white text-black'} "
  onclick={changeValue}
>
  {#if iconWrapper}
    <div
      class=" flex h-12 w-12 items-center justify-center rounded-md bg-[#F4F2FF]"
    >
      {@render iconWrapper()}
    </div>
  {/if}
  <div class="whitespace-nowrap">
    {title}
  </div>
</div>
