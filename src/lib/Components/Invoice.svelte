<script lang="ts">
  import { onMount } from "svelte";
  import { DoctorsService } from "../services";
  import Axios from "../services/axios";
  import InvoiceService from "../services/InvoiceService";
  import { clinicInfo } from "../stores/clinic";
  import AppButton from "./Common/AppButton.svelte";
  import Loading from "./Common/Loading.svelte";
  import DollarIcon from "./Icons/DollarIcon.svelte";
  import Confirm from "./Steps/Confirm.svelte";
  let {
    token,
  }: {
    token?: any;
  } = $props();
  let completeInformation = $state({
    user: {},
    doctor: {},
    service: {
      total_amount: 10000,
      prepay_amount: 10000,
    },
  });
  let loading = $state(true);
  let searchParams = $state(new URLSearchParams(window.location.search));
  let uuid = searchParams.get("uuid");
  onMount(async () => {
    if (!token || !uuid) return;
    if (token) {
      Axios.defaults.headers.common["API-TOKEN"] = token;
    }
    let { data } = await DoctorsService.config();
    clinicInfo.set(data);
    try {
      const res = await InvoiceService.get(uuid);
      console.log(res.data);
      completeInformation = {
        ...res.data.booking,
        doctor: res.data.booking.doctor,
        service: {
          ...res.data.booking.original_service,
          prepay_amount: res.data.amount,
        },
        user: res.data.booking.patient.user,
      };
      //   meeting = res.data;
    } catch (error) {}
    loading = false;
  });
  async function pay() {
    try {
      const res = await InvoiceService.pay(uuid, {
        callback_url: $clinicInfo.CALLBACK_URL,
      });
      eval(res.data.script);
    } catch (error) {}
  }
</script>

{#if loading}
  <Loading />
{:else}
  {#snippet actions()}
    <div class="flex justify-center w-full">
      <AppButton class="w-1/2" color="primary" onclick={pay}>
        <DollarIcon class="w-5 " />
        پرداخت
      </AppButton>
    </div>
  {/snippet}
  <div class="bg-white p-6 rounded-2xl">
    <Confirm {completeInformation} {actions} />
  </div>
{/if}
