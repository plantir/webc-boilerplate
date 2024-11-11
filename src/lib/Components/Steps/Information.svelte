<script lang="ts">
	import { showDateTime, validate } from '../.././help';
	import type { stepTypes } from '../.././type';
	import AppButton from '../Common/AppButton.svelte';
	import AppInput from '../Common/AppInput.svelte';
	import Title from '../Common/Title.svelte';
	import ArrowLeftIcon from '../Icons/ArrowLeftIcon.svelte';
	import ArrowRightIcon from '../Icons/ArrowRightIcon.svelte';
	let {
		value = $bindable(),
		step = $bindable(),
		onNextStep
	}: {
		value: any;
		step: stepTypes;
		onNextStep: any;
	} = $props();
	let error = $state({
		name: '',
		family: '',
		email: '',
		mobile: '',
		national_code: '',
		terms: ''
	});
	const goBack = () => {
		step = 'date';
	};
	const goNext = () => {
		let have_error = false;
		if (!validate('email', value.user.email)) {
			have_error = true;
			error.email = 'ایمیل وارد شده درست نمی‌باشد';
		}
		if (!validate('phone', value.user.mobile)) {
			have_error = true;
			error.mobile = 'فرمت موبایل وارد شده درست نمی‌باشد';
		}
		if (!validate('string', value.user.name)) {
			have_error = true;
			error.name = 'لطفا نام را وارد نمایید';
		}
		if (!validate('string', value.user.family)) {
			have_error = true;
			error.family = 'لطفا نام خانوادگی را وارد نمایید';
		}
		if (!validate('string', value.user.national_code)) {
			have_error = true;
			error.national_code = 'لطفا کد ملی را وارد نمایید';
		}
		if (!value.user.accept_terms) {
			have_error = true;
			error.terms = 'لطفا شرایط را مطالعه و قبول بفرمایید';
		}
		if (!have_error) {
			onNextStep();
		}
	};
</script>

{#snippet errorMessage(message: string)}
	{#if message}
		<div class="mt-1 text-sm text-error">{message}</div>
	{/if}
{/snippet}
<div>
	<div class="mb-4 sm:hidden">
		<AppButton outline onclick={goBack}>
			<ArrowRightIcon class="w-5 " />
			بازگشت
		</AppButton>
	</div>
	<Title title="مشخصات خود را وارد کنید" />
	<div class="mb-4 border-b border-base-300"></div>
	<div class="mb-4 text-sm">
		سرویس نوبت تلفنی در تاریخ {showDateTime(value.book_date, value.start_time)}
	</div>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		<div>
			<AppInput
				labelText="نام"
				bind:value={value.user.name}
				oninput={() => {
					error.name = '';
				}}
			/>
			{@render errorMessage(error.name)}
		</div>
		<div>
			<AppInput
				labelText="نام خانوادگی"
				bind:value={value.user.family}
				oninput={() => {
					error.family = '';
				}}
			/>
			{@render errorMessage(error.family)}
		</div>
		<div class="sm:col-span-2">
			<AppInput
				labelText="آدرس الکترونیکی"
				bind:value={value.user.email}
				oninput={() => {
					error.email = '';
				}}
			/>
			{@render errorMessage(error.email)}
		</div>
		<div>
			<AppInput
				labelText="تلفن همراه"
				bind:value={value.user.mobile}
				oninput={() => {
					error.mobile = '';
				}}
			/>
			{@render errorMessage(error.mobile)}
		</div>
		<div>
			<AppInput
				labelText="کد ملی"
				bind:value={value.user.national_code}
				oninput={() => {
					error.national_code = '';
				}}
			/>
			{@render errorMessage(error.national_code)}
		</div>
		<div>
			<div class="flex items-center gap-2 text-sm text-black">
				<input
					type="checkbox"
					id="checkbox"
					bind:checked={value.user.accept_terms}
					oninput={() => {
						error.terms = '';
					}}
				/>
				<label for="checkbox"> قوانین و مقررات را مطالعه کردم </label>
			</div>
			<div></div>
			{@render errorMessage(error.terms)}
		</div>
	</div>
	<div class="mt-4 flex items-center justify-between">
		<div>
			<div class="hidden sm:block">
				<AppButton outline onclick={goBack}>
					<ArrowRightIcon class="w-5 " />
					بازگشت
				</AppButton>
			</div>
		</div>
		<div>
			<AppButton color="primary" onclick={goNext}>
				<ArrowLeftIcon class="w-5 " />
				رزرو نوبت
			</AppButton>
		</div>
	</div>
</div>
