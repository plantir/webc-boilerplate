<script lang="ts">
	let {
		labelText,
		value = $bindable(),
		oninput
	}: {
		labelText: string;
		value: any;
		oninput?: any;
	} = $props();
</script>

<div>
	<label for="input" class="mb-4 text-sm">{labelText}</label>
	<input
		type="text"
		id="input"
		class="flex h-12 w-full items-center rounded-md border border-base-300 px-3 !outline-none"
		bind:value
		{oninput}
	/>
</div>
