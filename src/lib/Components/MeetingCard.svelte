<script lang="ts">
  import moment from "moment-jalaali";
  import type { Component } from "svelte";
  import { onMount } from "svelte";
  import { DoctorsService, MeetingService } from "../services";
  import Axios from "../services/axios";
  import Loading from "./Common/Loading.svelte";
  import ArrowLeftIcon from "./Icons/ArrowLeftIcon.svelte";
  import CalendarIcon from "./Icons/CalendarIcon.svelte";
  import GoogleMeetIcon from "./Icons/GoogleMeetIcon.svelte";
  import TimeIcon from "./Icons/TimeIcon.svelte";
  import CubeIcon from "./Icons/CubeIcon.svelte";
  import CallIcon from "./Icons/CallIcon.svelte";
  import UserIcon from "./Icons/UserIcon.svelte";
  import { clinicInfo } from "../stores/clinic";
  import { numberWithCommas } from "../help";
  import { baseURL } from "../stores/layout";
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
      let { data } = await DoctorsService.config();
      clinicInfo.set(data);
      const res = await MeetingService.get(trackingCode);
      meeting = res.data;
    } catch (error) {}
    loading = false;
  });
  const diff = $derived.by(() => {
    const outpot = {
      day: 0,
      hours: 0,
      minute: 0,
    };
    const now = moment();
    const book_date = meeting.book_date.split(" ");
    const date = moment(
      `${book_date[0]} ${meeting.start_time}`,
      "YYYY-MM-DD hh:mm:ss"
    );
    let diff = moment(date).diff(moment(now), "day");
    outpot.day = diff;
    diff = moment(date).diff(moment(now.add(outpot.day, "d")), "minute");
    outpot.hours = Math.floor(diff / 60);
    outpot.minute = diff % 60;
    console.log(diff, outpot);
    return outpot;
  });
</script>

{#snippet itemValue(
  title: string,
  value: string,
  icon: Component,
  border_top: boolean = true
)}
  <div
    class="flex h-[56px] items-center justify-between {border_top
      ? 'border-t border-[#F2F2F2]'
      : ''} text-sm"
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
{#if loading}
  <Loading />
{/if}
{#if meeting}
  <div
    class="p-6 border border-[#E8E8E8] bg-white grid md:grid-cols-2 grid-cols-1 gap-4 md:gap-8 rounded-2xl"
    style="box-shadow: 0px 11px 50px 0px #00000017;
"
  >
    <div class="flex flex-col justify-center gap-4">
      <div>
        <div>
          <img
            src={baseURL + meeting.doctor?.image}
            class="w-16 h-16 rounded-full"
            alt=""
          />
        </div>
      </div>
      <div class="text-2xl font-bold text-black">
        جلسه آنلاین با دکتر
        <span class="text-[#029E91]"> {meeting.doctor?.display_name}</span>
      </div>
      <div class="text-lg font-bold text-black">زمان مانده تا شروع جلسه</div>
      <div class="flex items-end gap-4">
        <div class="grid grid-cols-3 w-[210px] text-black">
          <div class="flex flex-col items-center">
            <div class="text-[13px]">روز</div>
            <div class="h-9 text-lg font-bold">{diff.day}</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-[13px]">ساعت</div>
            <div class="h-9 text-lg font-bold">{diff.hours}</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-[13px]">دقیقه</div>
            <div class="h-9 text-lg font-bold">{diff.minute}</div>
          </div>
        </div>
        <div>
          <a
            class:pointer-events-none={!meeting.meeting_link ||
             ( diff.day !== 0 &&
              diff.hours !== 0 &&
              diff.minute > 10)}
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
    </div>
    <div class="rounded-2xl border border-[#E8E8E8] p-6">
      <div>
        {@render itemValue(
          `نام شما`,
          meeting.patient.user.name + " " + meeting.patient.user.family,
          UserIcon,
          false
        )}
        {@render itemValue(
          "تاریخ نوبت دهی",
          moment(meeting.book_date).format("jYYYY/jMM/jDD"),
          CalendarIcon
        )}
        {@render itemValue("ساعت حضور", meeting.start_time, TimeIcon)}
        {@render itemValue("سرویس شما", meeting.service.name, CubeIcon)}
        {@render itemValue(
          "شماره موبایل",
          meeting.patient.user.mobile,
          CallIcon
        )}
      </div>
    </div>
  </div>
{/if}
