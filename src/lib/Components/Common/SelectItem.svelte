<script lang="ts">
	let {
		value = $bindable(),
		key,
		title,
		iconWrapper
	}: {
		value: any;
		key: any;
		title: string;
		iconWrapper?: any;
	} = $props();
</script>

<button
	class="box-border flex h-16 items-center gap-2 rounded-md p-2 {value == key
		? 'bg-primary text-white'
		: 'border border-base-100 bg-white text-black'} "
	onclick={() => {
		value = key;
	}}
>
	{#if iconWrapper}
		<div class=" flex h-12 w-12 items-center justify-center rounded-md bg-[#F4F2FF]">
			{@render iconWrapper()}
		</div>
	{/if}
	<div>
		{title}
	</div>
</button>
