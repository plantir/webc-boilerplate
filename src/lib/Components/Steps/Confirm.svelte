<script lang="ts">
	import { serviceLabel, type stepTypes } from '../.././type';
	import type { Component } from 'svelte';
	import CalendarIcon from '../Icons/CalendarIcon.svelte';
	import moment from 'moment-jalaali';
	import CallIcon from '../Icons/CallIcon.svelte';
	import TimeIcon from '../Icons/TimeIcon.svelte';
	import UserIcon from '../Icons/UserIcon.svelte';
	import CubeIcon from '../Icons/CubeIcon.svelte';
	import AppButton from '../Common/AppButton.svelte';
	import ArrowRightIcon from '../Icons/ArrowRightIcon.svelte';
	import ArrowLeftIcon from '../Icons/ArrowLeftIcon.svelte';
	import DollarIcon from '../Icons/DollarIcon.svelte';

	let {
		value = $bindable(),
		step = $bindable(),
		onNextStep,
		completeInformation
	}: {
		value: any;
		step: stepTypes;
		onNextStep: any;
		completeInformation: any;
	} = $props();
	const goBack = () => {
		step = 'information';
	};
	const goNext = () => {
		onNextStep();
	};
</script>

{#snippet itemValue(title: string, value: string, icon: Component)}
	<div class="flex h-[64px] items-center justify-between border-t border-base-300">
		<div class="flex items-center gap-2">
			<svelte:component this={icon} class="w-6" />
			<div>
				{title}
			</div>
		</div>
		<div>
			{value}
		</div>
	</div>
{/snippet}
<div>
	<div class="mb-4 text-center text-xl font-semibold text-black">صورت حساب شما</div>
	<div>
		{@render itemValue(
			'تاریخ نوبت دهی',
			moment(completeInformation.book_date).format('jYYYY/jMM/jDD'),
			CalendarIcon
		)}
		{@render itemValue('ساعت حضور', completeInformation.start_time, TimeIcon)}
		{@render itemValue('نام وکیل', completeInformation.doctor.display_name, UserIcon)}
		{@render itemValue('سرویس شما', completeInformation.service.name, CubeIcon)}
		{@render itemValue('شماره موبایل', completeInformation.user.mobile, CallIcon)}
		{@render itemValue(
			'مبلغ کل',
			`${completeInformation.service.total_amount} تومان`,
			CalendarIcon
		)}
	</div>
	<div class="my-4 flex h-[64px] items-center justify-between rounded-md bg-[#F3F1FF] px-4">
		<div class="text-sm">مبلغ قابل پرداخت</div>
		<div class="text-lg font-bold text-black">
			{completeInformation.service.prepay_amount} تومان
		</div>
	</div>
	<div class="flex items-center justify-between">
		<div>
			<AppButton outline onclick={goBack}>
				<ArrowRightIcon class="w-5 " />
				بازگشت
			</AppButton>
		</div>
		<div>
			<AppButton color="primary" onclick={goNext}>
				<DollarIcon class="w-5 " />
				پرداخت
			</AppButton>
		</div>
	</div>
</div>
