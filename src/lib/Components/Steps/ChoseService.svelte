<script lang="ts">
	import CallIcon from '../Icons/CallIcon.svelte';
	import AppButton from '../Common/AppButton.svelte';
	import ArrowLeftIcon from '../Icons/ArrowLeftIcon.svelte';
	import Title from '../Common/Title.svelte';
	import SelectItem from '../Common/SelectItem.svelte';
	import type { stepTypes } from '../.././type';
	import { onMount } from 'svelte';
	import { DoctorsService } from '../.././services';
	import { baseURL } from '../.././stores/layout';

	let {
		value = $bindable(),
		step = $bindable(),
		services,
		onNextStep
	}: {
		value: any;
		step?: stepTypes;
		services: any;
		onNextStep: any;
	} = $props();

	const nextStep = () => {
		step = 'expert';
	};
</script>

{#snippet callIcon()}
	<CallIcon class="w-5 text-black" />
{/snippet}

{#snippet showImage(image: string)}
	<img src={baseURL + image} class="w-5 text-black" />
{/snippet}

<div>
	<Title title="سرویس مورد نظر خود را انتخاب کنید" />
	<div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
		{#each services as service}
			<SelectItem bind:value={value.service} title={service.name} key={service.id}>
				{#snippet iconWrapper()}
					<img src={baseURL + service.image} class="w-5 text-black" />
				{/snippet}
			</SelectItem>
		{/each}
	</div>
	{#if value.service}
		<div class="mt-4 flex items-center justify-end">
			<AppButton color="primary" onclick={onNextStep}>
				<span> مرحله بعد </span>
				<div>
					<ArrowLeftIcon class="w-6" />
				</div>
			</AppButton>
		</div>
	{/if}
</div>
