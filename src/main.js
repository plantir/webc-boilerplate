import { mount } from "svelte";
import "./app.css";
import Callback from "./lib/Components/Callback.svelte";
import MeetInfo from "./lib/Components/MeetInfo.svelte";
import Reservation from "./lib/Components/Reservation.svelte";
let EmonshiNobat = document.querySelector("emonshi-nobat");
if (EmonshiNobat) {
  const token = EmonshiNobat.getAttribute("token");
  while (EmonshiNobat.firstChild) {
    EmonshiNobat.removeChild(EmonshiNobat.lastChild);
  }
  mount(Reservation, {
    target: EmonshiNobat,
    props: {
      token,
    },
  });
}
let EmonshiCallback = document.querySelector("emonshi-callback");
if (EmonshiCallback) {
  const token = EmonshiCallback.getAttribute("token");
  while (EmonshiCallback.firstChild) {
    EmonshiCallback.removeChild(EmonshiCallback.lastChild);
  }
  mount(Callback, {
    target: EmonshiCallback,
    props: {
      token,
    },
  });
}
let EmonshiMeetInfo = document.querySelector("emonshi-meet-info");
if (EmonshiMeetInfo) {
  const token = EmonshiMeetInfo.getAttribute("token");
  while (EmonshiMeetInfo.firstChild) {
    EmonshiMeetInfo.removeChild(EmonshiMeetInfo.lastChild);
  }
  mount(MeetInfo, {
    target: EmonshiMeetInfo,
    props: {
      token,
    },
  });
}
