<script lang="ts">
  import moment from "moment-jalaali";
  import { onMount } from "svelte";
  import { MeetingService } from "../services";
  import Axios from "../services/axios";
  import Loading from "./Common/Loading.svelte";
  import ArrowLeftIcon from "./Icons/ArrowLeftIcon.svelte";
  import CalendarIcon from "./Icons/CalendarIcon.svelte";
  import GoogleMeetIcon from "./Icons/GoogleMeetIcon.svelte";
  import TimeIcon from "./Icons/TimeIcon.svelte";
  moment.loadPersian({ dialect: "persian-modern" });
  let {
    token,
  }: {
    token?: any;
  } = $props();
  let meeting: any = $state(null);
  let loading = $state(true);
  let searchParams = $state(new URLSearchParams(window.location.search));
  onMount(async () => {
    if (token) {
      Axios.defaults.headers.common["API-TOKEN"] = token;
    }
    const trackingCode = searchParams.get("trackingCode");
    try {
      const res = await MeetingService.get(trackingCode);
      meeting = res.data;
    } catch (error) {}
    loading = false;
  });
</script>

{#if loading}
  <Loading />
{/if}
{#if meeting}
  <div class="p-6">
    <div class="flex flex-col md:flex-row gap-6">
      <div class="flex items-center gap-4 text-black">
        <div>
          <CalendarIcon class="w-8 h-8" />
        </div>
        <div>
          <div class=" font-semibold mb-2">تاریخ شروع جلسه</div>
          <div class="text-sm">
            {moment(meeting.book_date).format("dddd jD jMMMM")} ماه
          </div>
        </div>
      </div>
      <div class="flex items-center gap-4 text-black">
        <div>
          <TimeIcon class="w-8 h-8" />
        </div>
        <div>
          <div class="font-semibold mb-2">زمان شروع جلسه</div>
          <div class="text-sm">
            ساعت {moment(meeting.start_time, "HH:mm:ss").format("HH:mm")} -
            {moment(meeting.end_time, "HH:mm:ss").format("HH:mm")}
          </div>
        </div>
      </div>
    </div>
    <div class="mt-6">
      <a
        class:pointer-events-none={!meeting.meeting_link}
        class:opacity-60={!meeting.meeting_link}
        class="h-14 w-full md:w-[210px] px-4 rounded-md flex items-center gap-x-2.5 justify-center text-white bg-[#656767] cursor-pointer"
        target="_blank"
        href={meeting.meeting_link}
      >
        <div>
          <GoogleMeetIcon class="w-6 h-6" />
        </div>
        <div>ورود به جلسه</div>
        <div>
          <ArrowLeftIcon class="w-6 h-6" />
        </div>
      </a>
    </div>
  </div>
{/if}
