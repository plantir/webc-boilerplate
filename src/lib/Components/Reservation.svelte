<script lang="ts">
  import moment from "moment-jalaali";
  import { onMount } from "svelte";
  import { DoctorsService } from ".././services";
  import type { stepTypes } from ".././type";
  import Axios from "../services/axios";
  import { clinicInfo } from "../stores/clinic";
  import Loading from "./Common/Loading.svelte";
  import ChoseService from "./Steps/ChoseService.svelte";
  import Confirm from "./Steps/Confirm.svelte";
  import DateTime from "./Steps/DateTime.svelte";
  import ExpertsService from "./Steps/ExpertsService.svelte";
  import Information from "./Steps/Information.svelte";
  let {
    token,
  }: {
    token?: any;
  } = $props();
  let value: any = $state({
    user: {},
  });
  let step: stepTypes = $state("service");
  let services: any = $state([]);
  let doctors = $state([]);
  let completeInformation = $state({});
  let loading = $state(true);
  let searchParams = $state(new URLSearchParams(window.location.search));
  onMount(async () => {
    moment.loadPersian({ dialect: "persian-modern" });
    if (token) {
      Axios.defaults.headers.common["API-TOKEN"] = token;
    }
    try {
      let { data } = await DoctorsService.config();
      clinicInfo.set(data);
    } catch (error) {}
    let res = await DoctorsService.services();
    services = res.data;
    let step_step: stepTypes = "service";
    if (searchParams.get("service")) {
      value.service = searchParams.get("service");
      let res = await DoctorsService.get(value.service);
      doctors = res.data;
      if (doctors.length == 1) {
        value.doctor = doctors[0].key;
        step_step = "date";
      } else {
        step_step = "expert";
      }
    }
    if (searchParams.get("doctor")) {
      value.doctor = searchParams.get("doctor");
      step_step = "date";
      completeInformation = {
        doctor: doctors.find((x: any) => x.id == value.doctor),
        service: services.find((x: any) => x.id == value.service),
      };
    }
    if (searchParams.get("book_date") && searchParams.get("start_time")) {
      value.book_date = moment(
        searchParams.get("book_date"),
        "YYYY-MM-DD"
      ).toString();
      value.start_time = searchParams.get("start_time");
      step_step = "information";
      completeInformation = {
        doctor: doctors.find((x: any) => x.id == value.doctor),
        service: services.find((x: any) => x.id == value.service),
      };
    }
    step = step_step;
    loading = false;
  });
  const replaceURL = () => {
    var newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      `?${searchParams.toString()}`;
    window.history.replaceState({ path: newurl }, "", newurl);
  };
  const onNextStep = async () => {
    switch (step) {
      case "service":
        let res = await DoctorsService.get(value.service);
        doctors = res.data;
        searchParams.set("service", value.service);
        if (doctors.length == 1) {
          value.doctor = doctors[0].id;
          searchParams.set("doctor", value.doctor);
          replaceURL();
          step = "date";
        } else {
          replaceURL();
          step = "expert";
        }
        break;
      case "expert":
        searchParams.set("doctor", value.doctor);
        replaceURL();
        completeInformation = {
          doctor: doctors.find((x: any) => x.id == value.doctor),
          service: services.find((x: any) => x.id == value.service),
        };
        step = "date";
        break;
      case "date":
        searchParams.set(
          "book_date",
          moment(value.book_date).format("YYYY-MM-DD")
        );
        completeInformation = {
          doctor: doctors.find((x: any) => x.id == value.doctor),
          service: services.find((x: any) => x.id == value.service),
        };
        searchParams.set("start_time", value.start_time);
        replaceURL();
        step = "information";
        break;
      case "information":
        completeInformation = {
          book_date: moment(value.book_date).format("YYYY-MM-DD"),
          doctor: doctors.find((x: any) => x.id == value.doctor),
          service: services.find((x: any) => x.id == value.service),
          start_time: value.start_time,
          user: value.user,
          callback_url:
            $clinicInfo.CALLBACK_URL ||
            `${location.protocol}//${location.host}/gateway/callback`,
        };
        step = "confirm";
        break;
      case "confirm":
        const resReservation =
          await DoctorsService.sendReservation(completeInformation);
        console.log(resReservation);
        eval(resReservation.data.script);
    }
  };
  const goBack = () => {
    switch (step) {
      case "date":
        if (doctors.length == 1) {
          step = "service";
        } else {
          step = "expert";
        }
    }
  };
</script>

<div class="reservation-card w-[600px]">
  {#if loading}
    <Loading />
  {:else if step == "service"}
    <ChoseService bind:value bind:step {services} {onNextStep} />
  {:else if step == "expert"}
    <ExpertsService bind:value bind:step {doctors} {onNextStep} />
  {:else if step == "date"}
    <DateTime bind:step bind:value {onNextStep} {goBack} />
  {:else if step == "information"}
    <Information bind:step bind:value {onNextStep} {completeInformation} />
  {:else if step == "confirm"}
    <Confirm bind:value bind:step {onNextStep} {completeInformation} />
  {/if}
</div>

<style lang="scss">
  .reservation-card {
    @apply rounded-2xl border border-[#E8E8E8] bg-white p-4 sm:p-6;
    box-shadow: 0px 0px 16px 0px #0000001a;
  }
</style>
