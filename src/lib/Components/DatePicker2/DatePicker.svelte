<script lang="ts">
  import moment from "moment-jalaali";
  import ArrowLeftIcon from "../Icons/ArrowLeftIcon.svelte";
  let {
    value = $bindable(),
    availableDays,
    currentMonth = moment().startOf("jMonth"),
  }: {
    value: any;
    availableDays: string[];
    currentMonth?: any;
  } = $props();

  let daysOfMonth = $derived.by(() => {
    let end_day = currentMonth.clone().endOf("jMonth").format("jD");
    return end_day;
  });
  let days = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
  ];
  let monthGap = $derived.by(() => {
    let index = Math.abs(
      (+currentMonth.clone().startOf("jMonth").format("d") + 1) % 7
    );
    return index;
  });

  function PrevMonth() {
    moment.locale("fa");
    currentMonth = moment(currentMonth)
      .clone()
      .subtract(1, "jMonth")
      .startOf("jMonth");
  }
  function NextMonth() {
    moment.locale("fa");
    currentMonth = moment(currentMonth)
      .clone()
      .add(1, "jMonth")
      .startOf("jMonth");
  }
  function selectDate(day: any) {
    const selected = moment(currentMonth).startOf("jMonth").add("days", day);
    value = selected;
  }
  const isDayActive = (day) => {
    let formattedDay = moment(currentMonth)
      .startOf("jMonth")
      .add("days", day)
      .format("YYYY-MM-DD");
    return availableDays.includes(formattedDay);
  };
  const isDaySelected = (day) => {
    if (!value) return false;
    let x = moment(currentMonth)
      .startOf("jMonth")
      .add("days", day)
      .format("YYYY-MM-DD");
    return x == value.format("YYYY-MM-DD");
  };
</script>

<div class=" mb-2 select-none font-semibold">
  <div class=" h-6 z-10 flex w-full items-center justify-between px-6">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->

    <div
      onclick={PrevMonth}
      class="cursor-pointer"
      class:disabled={moment(currentMonth).format("jMM") ==
        moment().format("jMM")}
    >
      <div class="pointer-events-none rotate-180">
        <ArrowLeftIcon class="w-6 text-black" />
      </div>
    </div>
    <div class="text-black">
      {moment(currentMonth).format("jMMMM jYYYY")}
    </div>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div onclick={NextMonth} class="cursor-pointer">
      <div class="pointer-events-none">
        <ArrowLeftIcon class="w-6 text-black" />
      </div>
    </div>
  </div>
</div>
<!-- <div class="my-4 text-black text-sm">روز مورد نظر را انتخاب کنید:</div> -->
<div class="custom-color select-none grid grid-cols-7 gap-y-4">
  {#each days as day}
    <div class="text-center text-xs">
      {day}
    </div>
  {/each}
  {#each { length: monthGap } as s}
    <div></div>
  {/each}
  {#each { length: daysOfMonth } as i, index}
    <div class="calendar-day">
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <span
        onclick={() => selectDate(index)}
        class:active={isDayActive(index)}
        class:selected={isDaySelected(index)}
        class:current={+moment().format("jDD") == index + 1}
      >
        {index + 1}
      </span>
    </div>
  {/each}
</div>

<style lang="scss">
  .disabled {
    @apply pointer-events-none opacity-50;
  }
  .calendar-day {
    @apply flex items-center justify-center rounded-full text-current;
    span {
      @apply flex w-6 h-6 sm:h-8 sm:w-8 items-center justify-center text-xs sm:text-sm rounded-full bg-base-300 text-[#949494] pointer-events-none;
      &.active {
        @apply border-primary border-2 cursor-pointer bg-white pointer-events-auto text-black;
      }
      &.selected {
        @apply bg-[#B6AEFF];
      }
      &.current {
        @apply bg-[#c0d4ee];
      }
    }
  }
  .custom-color {
    > div:nth-child(7n) {
      @apply text-error;
    }
  }
</style>
