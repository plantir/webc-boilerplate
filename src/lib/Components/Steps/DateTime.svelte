<script lang="ts">
  import { showDateTime } from "../.././help";
  import type { stepTypes } from "../.././type";
  import { onMount } from "svelte";
  import AppButton from "../Common/AppButton.svelte";
  import Title from "../Common/Title.svelte";
  import DatePicker from "../DatePicker/DatePicker.svelte";
  import ArrowLeftIcon from "../Icons/ArrowLeftIcon.svelte";
  import ArrowRightIcon from "../Icons/ArrowRightIcon.svelte";
  import { TimeService } from "../.././services";
  import Loading from "../Common/Loading.svelte";
  let {
    step = $bindable(),
    value = $bindable(),
    onNextStep,
    goBack,
  }: {
    step: stepTypes;
    value: any;
    onNextStep: any;
    goBack: any;
  } = $props();
  let months: any = $state({});
  let loading = $state(true);
  const goNext = () => {
    if (value.book_date && value.start_time) {
      onNextStep();
    }
  };
  onMount(async () => {
    const res: any = await TimeService.get(value.doctor, value.service);
    months = res.data;
    loading = false;
  });
</script>

<div>
  <div class="mb-4 sm:hidden">
    <AppButton outline onclick={goBack}>
      <ArrowRightIcon class="w-5 " />
      بازگشت
    </AppButton>
  </div>
  <div>
    <Title title="تاریخ مورد نظر خود را برای دریافت مشاوره تلفنی انتخاب کنید" />
  </div>
  <div class="my-4 border-b border-base-100"></div>
  {#if loading}
    <Loading />
  {:else}
    <DatePicker
      bind:value={value.book_date}
      bind:time={value.start_time}
      {months}
    />
    {#if value.book_date}
      <div class="mt-4 rounded-md bg-[#E7E4FF] p-2 text-sm text-black">
        زمان انتخابی شما {showDateTime(value.book_date, value.start_time)}
        می باشد.
      </div>
    {/if}
  {/if}
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
        رزرو نوبت
        <ArrowLeftIcon class="w-5 " />
      </AppButton>
    </div>
  </div>
  <div class="flex items-center justify-center mt-4 gap-4">
    <div class="flex items-center gap-2">
      <div class="w-4 h-4 rounded-[4px] bg-[#E0E0E0]">

      </div>
      روز بدون نوبت
    </div>
    <div class="flex items-center gap-2">
      <div class="w-4 h-4 rounded-[4px] bg-[#B6AEFF]">

      </div>
      روز انتخابی
    </div>
  </div>
</div>
