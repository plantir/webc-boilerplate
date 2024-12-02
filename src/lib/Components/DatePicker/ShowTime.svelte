<script lang="ts">
  import moment from "moment-jalaali";
  import ArrowLeftIcon from "../Icons/ArrowLeftIcon.svelte";
  import Day from "./Day.svelte";
  import { onMount } from "svelte";

  let {
    month = $bindable(),
    date = $bindable(),
    time = $bindable(),
    class: className,
    selectDate,
    disableFormule,
    months,
  }: {
    month: any;
    date: any;
    class?: string;
    time: any;
    selectDate: any;
    disableFormule?: any;
    months: any;
  } = $props();
  let daysInNextMonth = $derived.by(() => {
    let first_day = moment(month).startOf("jMonth");
    let end_day = moment(month).endOf("jMonth");
    let num_day = end_day.jDayOfYear() - first_day.jDayOfYear() + 1;
    return num_day;
  });
  let monthDates: any = $state([]);
  let firstDayOfMonth = $derived(moment(month).startOf("jMonth"));
  let days = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه",
  ];
  let daysIndexPersian = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
  let daysIndexEnglish = ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"];
  let differentStartetDay = $derived.by(() => {
    console.log(firstDayOfMonth.format("dd"), "avalin roz mah");
    let index = daysIndexPersian.findIndex(
      (x) => x == firstDayOfMonth.format("dd")
    );
    if (index < 0) {
      index = daysIndexEnglish.findIndex(
        (x) => x == firstDayOfMonth.format("dd")
      );
    }
    return index;
  });

  function PrevMonth() {
    month = moment(month).add(-1, "month");
  }
  function NextMonth() {
    month = moment(month).add(1, "month");
  }
  onMount(async () => {});
  $effect(() => {
    month;
    getMonthDates();
  });
  let getMonthDates = async () => {
    console.log(Object.keys(months), moment(firstDayOfMonth).format("YYYY-MM"));
    console.log(months);

    if (
      Object.keys(months).includes(moment(firstDayOfMonth).format("YYYY-MM"))
    ) {
      monthDates = months[moment(firstDayOfMonth).format("YYYY-MM")];
      console.log(monthDates);
    } else {
      console.log(
        months[moment(month).format("YYYY-MM")],
        "in month ro neshon nade"
      );
    }
  };
  let selectedDateItem = $derived.by(() => {
    if (date) {
      const item = monthDates.find(
        (x: any) =>
          moment(x.date).format("YYYY/MM/DD") ==
          moment(date).format("YYYY/MM/DD")
      );
      return item;
    } else {
      return false;
    }
  });
  const setTime = (t: any) => {
    time = t;
  };
</script>

<div class={className}>
  <div class="relative mb-2 text-center font-semibold">
    {moment(month).format("jMMMM jYYYY")}
    <div
      class="absolute -top-2 right-0 z-10 flex w-full items-center justify-between"
    >
      <div onclick={PrevMonth}>
        <div class="pointer-events-none rotate-180">
          <ArrowLeftIcon class="w-3" />
        </div>
      </div>
      <div onclick={NextMonth}>
        <div class="pointer-events-none">
          <ArrowLeftIcon class="w-3" />
        </div>
      </div>
    </div>
  </div>
  <div class=" mb-1 grid grid-cols-7">
    {#each days as day, index}
      <div class="text-center text-xs {index == 6 ? 'text-error' : ''}">
        {day}
      </div>
    {/each}
  </div>
  <div class="custom-color grid grid-cols-7 gap-2">
    {#each { length: differentStartetDay } as s}
      <div></div>
    {/each}
    {#each { length: daysInNextMonth } as i, index}
      <div class="flex items-center justify-center">
        <Day
          click={selectDate}
          {index}
          {disableFormule}
          {monthDates}
          {date}
          {firstDayOfMonth}
        />
      </div>
    {/each}
  </div>
</div>
{#if selectedDateItem}
  <div class="my-4 text-sm text-black">زمان مورد نطر خود را انتخاب کنید</div>
  <div class="grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-4">
    {#each selectedDateItem.times as item}
      <div
        onclick={() => setTime(item.time)}
        class="time {item.status == 'available'
          ? ''
          : 'disable-time'} {item.time == time ? 'active-time' : ''}"
      >
        {item.time}
      </div>
    {/each}
  </div>
{/if}

<style lang="scss">
  .custom-color {
    > div:nth-child(7n) {
      @apply text-error;
    }
  }
  .time {
    @apply flex h-11 w-full items-center justify-center rounded-md border border-base-300 text-black;
    &.disable-time {
      @apply bg-base-300;
    }
    &.active-time {
      @apply border-primary bg-primary text-white;
    }
  }
</style>
