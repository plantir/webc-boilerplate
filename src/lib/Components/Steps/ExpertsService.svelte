<script lang="ts">
  import { baseURL } from "../.././stores/layout";
  import type { stepTypes } from "../.././type";
  import AppButton from "../Common/AppButton.svelte";
  import SelectItem from "../Common/SelectItem.svelte";
  import Title from "../Common/Title.svelte";
  import ArrowLeftIcon from "../Icons/ArrowLeftIcon.svelte";
  import ArrowRightIcon from "../Icons/ArrowRightIcon.svelte";
  let {
    value = $bindable(),
    step = $bindable(),
    onNextStep,
    doctors,
  }: {
    value: any;
    step: stepTypes;
    onNextStep: any;
    doctors: any;
  } = $props();
  const goBack = () => {
    step = "service";
  };
  const reserveNext = () => {
    step = "date";
  };
  const goNext = () => {
    if (value.doctor) {
      onNextStep();
    }
  };
</script>

{#snippet doctorImage(image: string)}
  <img src={image} alt="" />
{/snippet}
<div>
  <div class="mb-4 sm:hidden">
    <AppButton outline onclick={goBack}>
      <ArrowRightIcon class="w-5 " />
      بازگشت
    </AppButton>
  </div>
  <div>
    <Title title="متخصص مورد نظر خود را انتخاب کنید" />
  </div>
  <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
    {#each doctors as doctor}
      <SelectItem
        bind:value={value.doctor}
        key={doctor.id}
        title={doctor.display_name}
      >
        {#snippet iconWrapper()}
          <img src={baseURL + doctor.image} class="rounded-md" alt="" />
        {/snippet}
      </SelectItem>
    {/each}
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
    {#if value.doctor}
      <div class="flex items-center gap-2">
        <!-- <AppButton color="primary" outline onclick={reserveNext}>انتخاب اولین نوبت آزاد</AppButton> -->
        <AppButton color="primary" onclick={goNext}>
          رزرو نوبت
          <ArrowLeftIcon class="w-5 " />
        </AppButton>
      </div>
    {/if}
  </div>
</div>
