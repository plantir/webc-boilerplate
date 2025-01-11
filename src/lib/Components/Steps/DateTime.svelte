<script lang="ts">
  import moment from "moment-jalaali";
  import { onMount } from "svelte";
  import { showDateTime } from "../.././help";
  import { TimeService } from "../.././services";
  import AppButton from "../Common/AppButton.svelte";
  import Loading from "../Common/Loading.svelte";
  import Title from "../Common/Title.svelte";
  import DatePicker from "../DatePicker2/DatePicker.svelte";
  import ArrowLeftIcon from "../Icons/ArrowLeftIcon.svelte";
  import ArrowRightIcon from "../Icons/ArrowRightIcon.svelte";
  import TimePicker from "../TimePicker/TimePicker.svelte";
  let {
    step = $bindable(),
    value = $bindable(),
    onNextStep,
    goBack,
    completeInformation,
  }: {
    step: any;
    value: any;
    onNextStep: any;
    goBack: any;
    completeInformation: any;
  } = $props();
  let availableDays: any = $state({});
  let loading = $state(true);
  let setUpMonth = moment().startOf("jMonth");
  const goNext = () => {
    if (
      completeInformation.service.constraint_type == "calendar_based" &&
      value.book_date &&
      value.start_time
    ) {
      onNextStep();
    }
    if (
      completeInformation.service.constraint_type ==
        "limited_by_day_and_quantity" &&
      value.book_date
    ) {
      onNextStep();
    }
  };
  onMount(async () => {
    const res: any = await TimeService.get(value.doctor, value.service);
    Object.values(res.data).forEach((item: any) => {
      item.map((x) => {
        availableDays[x.date] = x.times;
      });
    });
    if (Object.keys(availableDays).length > 0) {
      setUpMonth = moment(Object.keys(availableDays)[0]).startOf("jMonth");
    }
    loading = false;
  });

  let availbaleTimes = $derived.by(() => {
    let availabel_times =
      availableDays[moment(value.book_date).format("YYYY-MM-DD")];
    return availabel_times;
  });

  let hasAvailableDays = $derived.by(() => {
    return availableDays && Object.keys(availableDays).length > 0;
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
    <Title
      title={`تاریخ مورد نظر خود را برای دریافت ${completeInformation.service.name} انتخاب کنید`}
    />
  </div>
  <div class="my-4 border-b border-base-100"></div>
  {#if loading}
    <Loading />
  {:else}
    {#if !hasAvailableDays}
      <div class="text-error font-bold text-center">
        متاسفانه هیچ نوبتی در آینده یافت نشد.
      </div>
    {/if}
    <div class:blur-sm={!hasAvailableDays}>
      <div class="my-4 text-black text-sm">روز مورد نظر را انتخاب کنید:</div>
      <DatePicker
        bind:value={value.book_date}
        currentMonth={setUpMonth}
        availableDays={Object.keys(availableDays)}
      />
      {#if value.book_date && completeInformation.service.constraint_type == "calendar_based"}
        <div class="mt-5">
          <div class="my-4 text-sm text-black">
            زمان مورد نطر خود را انتخاب کنید
          </div>
          <TimePicker bind:value={value.start_time} times={availbaleTimes} />
        </div>
      {/if}
      {#if value.book_date}
        <div class="mt-4 rounded-md bg-[#E7E4FF] p-2 text-sm text-black">
          زمان انتخابی شما {showDateTime(value.book_date, value.start_time)}
          می باشد.
        </div>
      {/if}
    </div>
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
      <AppButton color="primary" onclick={goNext} disabled={!hasAvailableDays}>
        رزرو نوبت
        <ArrowLeftIcon class="w-5 " />
      </AppButton>
    </div>
  </div>
  <div class="flex items-center justify-center mt-4 gap-4">
    <div class="flex items-center gap-2">
      <div class="w-4 h-4 rounded-[4px] bg-[#E0E0E0]"></div>
      روز بدون نوبت
    </div>
    <div class="flex items-center gap-2">
      <div class="w-4 h-4 rounded-[4px] bg-[#B6AEFF]"></div>
      روز انتخابی
    </div>
  </div>
</div>
