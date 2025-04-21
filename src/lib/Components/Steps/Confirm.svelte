<script lang="ts">
  import moment from "moment-jalaali";
  import { onMount, type Component } from "svelte";
  import { type stepTypes } from "../.././type";
  import { numberWithCommas } from "../../help";
  import { clinicInfo } from "../../stores/clinic";
  import AppButton from "../Common/AppButton.svelte";
  import ArrowRightIcon from "../Icons/ArrowRightIcon.svelte";
  import CalendarIcon from "../Icons/CalendarIcon.svelte";
  import CallIcon from "../Icons/CallIcon.svelte";
  import CubeIcon from "../Icons/CubeIcon.svelte";
  import DollarIcon from "../Icons/DollarIcon.svelte";
  import TimeIcon from "../Icons/TimeIcon.svelte";
  import UserIcon from "../Icons/UserIcon.svelte";
  let {
    value = $bindable(),
    step = $bindable(),
    onNextStep,
    completeInformation,
    actions,
  }: {
    value?: any;
    step?: stepTypes;
    onNextStep?: any;
    completeInformation: any;
    actions?: any;
  } = $props();
  const goBack = () => {
    step = "information";
  };
  const goNext = () => {
    onNextStep();
  };
  onMount(() => {
    console.log(completeInformation);
  });
  const getTotalAmount = () => {
    let service =
      completeInformation.doctor.doctor_service || completeInformation.service;
    return service.total_amount;
  };
  const getPrePayAmount = () => {
    let service =
      completeInformation.doctor.doctor_service || completeInformation.service;
    return service.prepay_amount;
  };
</script>

{#snippet itemValue(title: string, value: string, icon: Component)}
  <div
    class="flex h-[64px] items-center justify-between border-t border-[#F2F2F2] text-sm"
  >
    <div class="flex items-center gap-2">
      <svelte:component this={icon} class="w-6" />
      <div>
        {title}
      </div>
    </div>
    <div class="text-black">
      {value}
    </div>
  </div>
{/snippet}
<div>
  <div class="mb-4 text-center text-xl font-semibold text-black">
    صورت حساب شما
  </div>
  <div>
    {@render itemValue(
      "تاریخ نوبت دهی",
      moment(completeInformation.book_date).format("jYYYY/jMM/jDD"),
      CalendarIcon
    )}
    {#if completeInformation.service.constraint_type == "calendar_based"}
      {@render itemValue("ساعت حضور", completeInformation.start_time, TimeIcon)}
    {/if}
    {@render itemValue(
      `نام ${$clinicInfo.PROFESSION}`,
      completeInformation.doctor.display_name,
      UserIcon
    )}
    {@render itemValue("سرویس شما", completeInformation.service.name, CubeIcon)}
    {@render itemValue(
      "شماره موبایل",
      completeInformation.user.mobile,
      CallIcon
    )}
    {@render itemValue(
      "مبلغ کل",
      `${numberWithCommas(getTotalAmount())} تومان`,
      CalendarIcon
    )}
  </div>
  <div
    class="my-4 flex h-[64px] items-center justify-between rounded-md bg-[#F3F1FF] px-4"
  >
    <div class="text-sm">مبلغ قابل پرداخت</div>
    <div class="text-lg font-bold text-black">
      {numberWithCommas(getPrePayAmount())} تومان
    </div>
  </div>
  {#if getPrePayAmount() > 0 && getTotalAmount() > getPrePayAmount()}
    <div>
      <div class="daisy-alert daisy-alert-warning my-2">
        مبلغ
        {numberWithCommas(getTotalAmount() - getPrePayAmount())}
        تومان به صورت نقدی دریافت می گردد.
      </div>
    </div>
  {/if}
  <div class="flex items-center justify-between">
    {#if actions}
      {@render actions()}
    {:else}
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
    {/if}
  </div>
</div>
