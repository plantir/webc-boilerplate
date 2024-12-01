import { mount } from "svelte";
import "./app.css";
import Callback from "./lib/Components/Callback.svelte";
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
