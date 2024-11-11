<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import ShowTime from './ShowTime.svelte';
	import type { size } from './type';
	import moment from 'moment-jalaali';

	let {
		size = 'md',
		bordered = true,
		value = $bindable(),
		placeholder = 'انتخاب کنید',
		displayFormat = 'jYYYY/jMM/jDD',
		show = $bindable(false),
		element = $bindable(),
		customElement = false,
		disableFormule,
		time = $bindable(),
		months
	}: {
		size?: size;
		bordered?: boolean;
		value: any;
		placeholder?: string;
		displayFormat?: string;
		show?: boolean;
		element?: any;
		customElement?: boolean;
		disableFormule?: any;
		time?: any;
		months: any;
	} = $props();
	let Y = $state(0);
	let top: any = $state();
	let right: any = $state();
	let left: any = $state();
	let bottom: any = $state();
	let width = $state(0);
	let currentMonth: any = $state(moment());
	let firstDayOfMonth = $derived(moment(currentMonth).startOf('jMonth'));
	function selectDate(index: any) {
		const selected = moment(firstDayOfMonth).add(index, 'day');
		value = selected;
		time = '';
	}
</script>

<ShowTime
	bind:month={currentMonth}
	{disableFormule}
	{selectDate}
	bind:date={value}
	bind:time
	{months}
/>

<style lang="scss">
	.datepicker {
		@apply flex cursor-pointer items-center bg-base-100 px-4;
		&.xl {
			@apply h-14;
		}
		&.lg {
			@apply h-12;
		}
		&.md {
			@apply h-10;
		}
		&.sm {
			@apply h-8;
		}
	}
</style>
