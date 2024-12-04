<script lang="ts">
  import { onMount } from "svelte";
  import Axios from "../services/axios";
  import { MeetingService } from "../services";
  import moment from "moment-jalaali";
  import CalendarIcon from "./Icons/CalendarIcon.svelte";
  import TimeIcon from "./Icons/TimeIcon.svelte";
  import ArrowLeftIcon from "./Icons/ArrowLeftIcon.svelte";
  import GoogleMeetIcon from "./Icons/GoogleMeetIcon.svelte";
  moment.loadPersian({ dialect: "persian-modern" });
  let {
    token,
  }: {
    token?: any;
  } = $props();
  let meeting: any = $state({});
  let searchParams = $state(new URLSearchParams(window.location.search));
  console.log(searchParams.get("track_id"));
  onMount(async () => {
    if (token) {
      Axios.defaults.headers.common["API-TOKEN"] = token;
    }
    const meetingToken = searchParams.get("token");
    const res = await MeetingService.get(meetingToken);
    meeting = res.data;
  });
</script>

<div class="bg-white border border-[#E8E8E8] rounded-2xl p-6">
  <div class="flex items-center gap-6">
    <div class="flex items-center gap-4 text-black">
      <div>
        <CalendarIcon class="w-8 h-8" />
      </div>
      <div>
        <div class=" font-semibold mb-2">تاریخ شروع جلسه</div>
        <div class="text-sm">
          {moment(meeting.book_date).format("dddd jD jMMMM")}ماه
        </div>
      </div>
    </div>
    <div class="flex items-center gap-4 text-black">
      <div>
        <TimeIcon class="w-8 h-8" />
      </div>
      <div>
        <div class="font-semibold mb-2">زمان شروع جلسه</div>
        <div class="text-sm">ساعت {meeting.time}</div>
      </div>
    </div>
  </div>
  <div class="mt-4">
    <div
      class="h-14 px-7 rounded-md flex items-center gap-2 justify-center text-white bg-[#656767] w-max cursor-pointer"
    >
      <div>
        <GoogleMeetIcon class="w-6 h-6" />
      </div>
      <div>ورود به جلسه</div>
      <div>
        <ArrowLeftIcon class="w-6 h-6" />
      </div>
    </div>
  </div>
</div>
