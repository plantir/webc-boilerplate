<script lang="ts">
	let {
		title,
		class: className
	}: {
		title: string;
		class?: string;
	} = $props();
</script>

<div class="flex items-center gap-1 {className}">
	<div class="h-3 w-3 rounded-full bg-primary"></div>
	<div class="text-lg font-semibold text-black sm:text-xl">{title}</div>
</div>
