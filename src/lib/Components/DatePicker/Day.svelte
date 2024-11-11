<script lang="ts">
  import moment from "moment";
  import { onMount } from "svelte";

  let {
    click,
    index,
    date,
    firstDayOfMonth,
    disableFormule,
    monthDates,
  }: {
    click: any;
    index: any;
    date: any;
    firstDayOfMonth: any;
    disableFormule?: any;
    monthDates?: any;
  } = $props();
  let classes = $derived.by(() => {
    const currentDay = moment(firstDayOfMonth).add(index, "day");
    if (
      date &&
      moment(date).format("YYYY/MM/DD") == currentDay.format("YYYY/MM/DD")
    ) {
      return "active";
    }
  });
  let disabledDate = $derived.by(() => {
    if (disableFormule) {
      const disabled = disableFormule(
        moment(firstDayOfMonth).add(index, "day")
      );
    } else {
      return false;
    }
  });
  let activeMonth = $derived.by(() => {
    const currentDay = moment(firstDayOfMonth)
      .add(index, "day")
      .format("YYYY-MM-DD");
    const haveDay = monthDates.findIndex((x: any) => {
      return x.date == currentDay;
    });
    return monthDates[haveDay];
  });
  let borderFill = $derived.by(() => {
    if (activeMonth) {
      if (moment(activeMonth.date).format("dddd") !== "Friday") {
        const hundred = activeMonth.times.length;
        let disabledTimes: any = [];
        activeMonth.times.forEach((x: any) => {
          if (!x.available) {
            disabledTimes.push(x);
          }
        });
        console.log(disabledTimes);
        const percent = Math.floor((disabledTimes.length * 100) / hundred);
        console.log(percent);
        let rightPart;
        let leftPart;
        if (percent > 50) {
          const extera = percent - 50;
          const deg = Math.floor((extera * 360) / 100);
          rightPart = "linear-gradient(-90deg, #1A00FF 50%, white 50%)";
          leftPart = `linear-gradient(${deg - 90}deg, #1A00FF 50%, transparent 50%)`;
        } else {
          const deg = Math.floor((percent * 360) / 100);
          rightPart = `linear-gradient(-90deg, #1A00FF 50%, white 50%)`;
          leftPart = `linear-gradient(${deg - 90}deg, white 50%, transparent 50%)`;
        }
        console.log(percent);
        return `background-image:${leftPart},  ${rightPart};text:${percent}`;
      } else {
        return "";
      }
    } else {
      return "";
    }
  });
  let isFriday = $derived.by(() => {
    return moment(firstDayOfMonth).add(index, "day").format("dddd") == "Friday";
  });
  onMount(() => {});
</script>

<button
  class="flex h-7 w-7 items-center justify-center rounded-full p-0.5 text-xs text-current sm:h-9 sm:w-9 sm:p-1"
  style={borderFill}
  disabled={!activeMonth || isFriday}
  onclick={() => click(index)}
>
  <div
    class="flex h-full w-full items-center justify-center rounded-full bg-white {isFriday
      ? 'friday'
      : ''} {classes} {activeMonth ? 'available' : 'unavailable'}"
  >
    {index + 1}
  </div>
</button>

<style lang="scss">
  .active {
    @apply rounded-full bg-[#B6AEFF] text-white;
  }
  .unavailable {
    @apply bg-base-300 text-[#949494];
  }
  .friday {
    @apply bg-white !text-error;
  }
</style>
