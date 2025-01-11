<script lang="ts">
  import { onMount } from "svelte";
  import { showDateTime, validate } from "../.././help";
  import type { stepTypes } from "../.././type";
  import { clinicInfo } from "../../stores/clinic";
  import AppButton from "../Common/AppButton.svelte";
  import AppInput from "../Common/AppInput.svelte";
  import Title from "../Common/Title.svelte";
  import ArrowLeftIcon from "../Icons/ArrowLeftIcon.svelte";
  import ArrowRightIcon from "../Icons/ArrowRightIcon.svelte";
  import CheckCIrcleIcon from "../Icons/CheckCIrcleIcon.svelte";
  import CheckIcon from "../Icons/CheckIcon.svelte";
  import CloseCircleIcon from "../Icons/CloseCircleIcon.svelte";

  let {
    value = $bindable(),
    step = $bindable(),
    onNextStep,
    completeInformation,
  }: {
    value: any;
    step: stepTypes;
    onNextStep: any;
    completeInformation: any;
  } = $props();
  let error = $state({
    name: "",
    family: "",
    email: "",
    mobile: "",
    national_code: "",
    terms: "",
  });
  let show_modal = $state(false);
  const goBack = () => {
    step = "date";
  };
  onMount(() => {
    let user = localStorage.getItem("user");
    if (user) {
      value.user = JSON.parse(user);
    }
  });
  const goNext = () => {
    let have_error = false;
    if (
      completeInformation.service.is_meeting &&
      !validate("email", value.user.email)
    ) {
      have_error = true;
      error.email = "ایمیل وارد شده درست نمی‌باشد";
    }
    if (!validate("phone", value.user.mobile)) {
      have_error = true;
      error.mobile = "فرمت موبایل وارد شده درست نمی‌باشد";
    }
    if (!validate("string", value.user.name)) {
      have_error = true;
      error.name = "لطفا نام را وارد نمایید";
    }
    if (!validate("string", value.user.family)) {
      have_error = true;
      error.family = "لطفا نام خانوادگی را وارد نمایید";
    }
    if (!validate("string", value.user.national_code)) {
      have_error = true;
      error.national_code = "لطفا کد ملی را وارد نمایید";
    }
    if (!value.user.accept_terms) {
      have_error = true;
      error.terms = "لطفا شرایط را مطالعه و قبول بفرمایید";
    }
    if (!have_error) {
      localStorage.setItem("user", JSON.stringify(value.user));
      onNextStep();
    }
  };
  const showRulesDialog = (e) => {
    e.preventDefault();
    show_modal = true;
  };
  const closeModal = () => {
    show_modal = false;
  };
  const acceptRules = () => {
    value.user.accept_terms = true;
    show_modal = false;
  };
</script>

{#snippet errorMessage(message: string)}
  {#if message}
    <div class="mt-1 text-sm text-error">{message}</div>
  {/if}
{/snippet}
<div>
  <div class="mb-4 sm:hidden">
    <AppButton outline onclick={goBack}>
      <ArrowRightIcon class="w-5 " />
      بازگشت
    </AppButton>
  </div>
  <Title title="مشخصات خود را وارد کنید" />
  <div class="mb-4 border-b border-[#F2F2F2]"></div>
  <div class="mb-4 text-sm text-black">
    سرویس {completeInformation.service.name} در تاریخ {showDateTime(
      value.book_date,
      value.start_time
    )}
  </div>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div>
      <AppInput
        labelText="نام"
        bind:value={value.user.name}
        oninput={() => {
          error.name = "";
        }}
        placeholder="نام خود را وارد کنید"
      />
      {@render errorMessage(error.name)}
    </div>
    <div>
      <AppInput
        labelText="نام خانوادگی"
        bind:value={value.user.family}
        oninput={() => {
          error.family = "";
        }}
        placeholder="نام خانوادگی خود را وارد کنید"
      />
      {@render errorMessage(error.family)}
    </div>
    {#if completeInformation.service.is_meeting}
      <div class="sm:col-span-2">
        <AppInput
          labelText="آدرس الکترونیکی"
          bind:value={value.user.email}
          oninput={() => {
            error.email = "";
          }}
          placeholder="example@example.com"
        />
        {@render errorMessage(error.email)}
      </div>
    {/if}
    <div>
      <AppInput
        labelText="تلفن همراه"
        bind:value={value.user.mobile}
        oninput={() => {
          error.mobile = "";
        }}
        convertPersian={true}
        placeholder="09123456789"
      />
      {@render errorMessage(error.mobile)}
    </div>
    <div>
      <AppInput
        labelText="کد ملی"
        bind:value={value.user.national_code}
        oninput={() => {
          error.national_code = "";
        }}
        convertPersian={true}
        placeholder="0012233445"
      />
      {@render errorMessage(error.national_code)}
    </div>
    <div>
      <div class="flex items-center gap-2 text-sm text-black">
        <div class="relative custom-app-checkbox">
          <input
            type="checkbox"
            id="checkbox"
            class="w-5 h-5 text-[#C3C3C3]"
            bind:checked={value.user.accept_terms}
            oninput={() => {
              error.terms = "";
            }}
          />
          {#if value.user.accept_terms}
            <div
              class="absolute top-0 right-0 h-5 w-5 flex items-center justify-center pointer-events-none"
            >
              <CheckIcon class="w-3 text-white" />
            </div>
          {/if}
        </div>
        <label for="checkbox">
          <span class="text-primary cursor-pointer" onclick={showRulesDialog}>
            قوانین و مقررات
          </span>
          را مطالعه کردم
        </label>
      </div>
      <div></div>
      {@render errorMessage(error.terms)}
    </div>
  </div>
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
</div>
{#if show_modal}
  <div
    class="fixed top-0 right-0 w-full h-full flex items-center justify-center z-[999]"
  >
    <div
      class="absolute top-0 right-0 w-full h-full bg-[#01010182]"
      onclick={closeModal}
    ></div>
    <div
      class="w-[600px] h-[70vh] overflow-hidden flex flex-col bg-white border border-[#E8E8E8] rounded-2xl relative z-30"
    >
      <div
        class="flex items-center justify-between sticky top-0 pt-6 px-6 pb-4 border-b border-[#F2F2F2] mb-4 bg-white"
      >
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-primary"></div>
          <div class="text-xl font-semibold text-black">قوانین و مقررات</div>
        </div>
        <div class="cursor-pointer" onclick={closeModal}>
          <CloseCircleIcon class="w-6" />
        </div>
      </div>
      <div class="text-black mb-4 px-6 flex-1 overflow-y-auto" style="">
        {@html $clinicInfo.terms}
      </div>
      <div class="flex sticky bottom-0 p-6 bg-white border-t border-[#F2F2F2]">
        <AppButton color="primary" onclick={acceptRules}>
          <CheckCIrcleIcon class="w-6" />
          قوانین را میپذیرم
        </AppButton>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .custom-app-checkbox {
    input[type="checkbox"] {
      -moz-appearance: none;
      -webkit-appearance: none;
      -o-appearance: none;
      outline: none;
      content: none;
    }

    input[type="checkbox"] {
      border: 1px solid #c3c3c3;
      border-radius: 5px !important ;
    }
    input[type="checkbox"]:checked {
      @apply rounded-[5px] !bg-primary !border-primary;
    }

    input[type="checkbox"]:checked:before {
      color: black !important;
    }
  }
</style>
