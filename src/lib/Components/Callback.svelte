<script lang="ts">
  import moment from "moment-jalaali";
  import type { Component } from "svelte";
  import { onMount } from "svelte";
  import { DoctorsService } from "../services";
  import Axios from "../services/axios";
  import AppButton from "./Common/AppButton.svelte";
  import CalendarIcon from "./Icons/CalendarIcon.svelte";
  import CallIcon from "./Icons/CallIcon.svelte";
  import CubeIcon from "./Icons/CubeIcon.svelte";
  import RotateRightIcon from "./Icons/RotateRightIcon.svelte";
  import TimeIcon from "./Icons/TimeIcon.svelte";
  import UserIcon from "./Icons/UserIcon.svelte";
  let {
    token,
  }: {
    token?: any;
  } = $props();
  let searchParams = $state(new URLSearchParams(window.location.search));
  let completeInformation: any = $state(null);
  onMount(async () => {
    if (token) {
      Axios.defaults.headers.common["API-TOKEN"] = token;
    }
    if (searchParams.get("track_id")) {
      const res = await DoctorsService.reservationInformation(
        searchParams.get("track_id")
      );
      completeInformation = res.data;
    }
  });
  const gotoBank = async () => {
    const res = await DoctorsService.sendReservationAgain(
      searchParams.get("track_id")
    );
    eval(res.data.script);
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
{#if completeInformation}
  <div class="bg-white border border-[#E8E8E8] rounded-2xl p-6">
    {#if completeInformation.status == "success"}
      <div class="bg-green-50 px-5 py-8 flex items-center flex-col w-96">
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M28.0003 4.66663C15.1437 4.66663 4.66699 15.1433 4.66699 28C4.66699 40.8566 15.1437 51.3333 28.0003 51.3333C40.857 51.3333 51.3337 40.8566 51.3337 28C51.3337 15.1433 40.857 4.66663 28.0003 4.66663ZM39.1537 22.6333L25.9237 35.8633C25.597 36.19 25.1537 36.3766 24.687 36.3766C24.2203 36.3766 23.777 36.19 23.4503 35.8633L16.847 29.26C16.1703 28.5833 16.1703 27.4633 16.847 26.7866C17.5237 26.11 18.6437 26.11 19.3203 26.7866L24.687 32.1533L36.6803 20.16C37.357 19.4833 38.477 19.4833 39.1537 20.16C39.8303 20.8366 39.8303 21.9333 39.1537 22.6333Z"
            fill="#00A645"
          />
        </svg>

        <span class="text-lg font-semibold"> پرداخت با موفقیت انجام شد </span>
      </div>

      <span class="text-lg font-medium">
        کد پیگیری: {searchParams.get("track_id")}
      </span>
      <p>پرداخت شما با موفقیت انجام شد</p>
      <div>
        {@render itemValue(
          "تاریخ نوبت دهی",
          moment(completeInformation.book_date).format("jYYYY/jMM/jDD"),
          CalendarIcon
        )}
        {@render itemValue(
          "ساعت حضور",
          completeInformation.start_time,
          TimeIcon
        )}
        {@render itemValue(
          "نام وکیل",
          completeInformation.doctor.display_name,
          UserIcon
        )}
        {@render itemValue(
          "سرویس شما",
          completeInformation.service.name,
          CubeIcon
        )}
        {@render itemValue(
          "شماره موبایل",
          completeInformation.user.mobile,
          CallIcon
        )}
        {@render itemValue(
          "مبلغ کل",
          `${completeInformation.service.total_amount} تومان`,
          CalendarIcon
        )}
      </div>
      <div
        class="my-4 flex h-[64px] items-center justify-between rounded-md bg-[#F3F1FF] px-4"
      >
        <div class="text-sm">مبلغ قابل پرداخت</div>
        <div class="text-lg font-bold text-black">
          {completeInformation.service.prepay_amount} تومان
        </div>
      </div>
    {:else}
      <div
        class="bg-red-50 px-5 py-8 flex items-center flex-col w-full rounded-2xl"
      >
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M28.0003 4.66663C15.1437 4.66663 4.66699 15.1433 4.66699 28C4.66699 40.8566 15.1437 51.3333 28.0003 51.3333C40.857 51.3333 51.3337 40.8566 51.3337 28C51.3337 15.1433 40.857 4.66663 28.0003 4.66663ZM35.8403 33.3666C36.517 34.0433 36.517 35.1633 35.8403 35.84C35.4903 36.19 35.047 36.3533 34.6037 36.3533C34.1603 36.3533 33.717 36.19 33.367 35.84L28.0003 30.4733L22.6337 35.84C22.2837 36.19 21.8403 36.3533 21.397 36.3533C20.9537 36.3533 20.5103 36.19 20.1603 35.84C19.4837 35.1633 19.4837 34.0433 20.1603 33.3666L25.527 28L20.1603 22.6333C19.4837 21.9566 19.4837 20.8366 20.1603 20.16C20.837 19.4833 21.957 19.4833 22.6337 20.16L28.0003 25.5266L33.367 20.16C34.0437 19.4833 35.1637 19.4833 35.8403 20.16C36.517 20.8366 36.517 21.9566 35.8403 22.6333L30.4737 28L35.8403 33.3666Z"
            fill="#FF0004"
          />
        </svg>
        <span class="text-xl font-semibold mt-4">
          پرداخت شما با شکست مواجه شد
        </span>
      </div>
      <div class="text-lg font-medium my-4">
        کد پیگیری: {searchParams.get("track_id")}
      </div>
      <p>
        در صورتی که وجه مورد نظر از حساب شما کسر شده است طی ۷۲ ساعت به حساب شما
        بازگردانده میشود در غیر اینصورت لطفا با پشتیبانی تماس بگیرید
      </p>
      <div class="mt-4">
        {@render itemValue(
          "تاریخ نوبت دهی",
          moment(completeInformation.booking.book_date).format("jYYYY/jMM/jDD"),
          CalendarIcon
        )}
        {@render itemValue(
          "ساعت حضور",
          completeInformation.booking.start_time,
          TimeIcon
        )}
        {@render itemValue(
          "نام وکیل",
          completeInformation.doctor.display_name,
          UserIcon
        )}
        {@render itemValue(
          "سرویس شما",
          completeInformation.booking.original_service.name,
          CubeIcon
        )}
        {@render itemValue(
          "شماره موبایل",
          completeInformation.patient.user.mobile,
          CallIcon
        )}
        {@render itemValue(
          "مبلغ کل",
          `${completeInformation.booking.original_service.total_amount} تومان`,
          CalendarIcon
        )}
      </div>
      <div
        class="my-4 flex h-[64px] items-center justify-between rounded-md bg-[#F3F1FF] px-4"
      >
        <div class="text-sm">مبلغ قابل پرداخت</div>
        <div class="text-lg font-bold text-black">
          {completeInformation.booking.original_service.prepay_amount} تومان
        </div>
      </div>
      <div class="flex items-center justify-end">
        <AppButton color="primary" onclick={gotoBank}>
          <RotateRightIcon class="w-6" />
          تلاش مجدد
        </AppButton>
      </div>
    {/if}
  </div>
{/if}
