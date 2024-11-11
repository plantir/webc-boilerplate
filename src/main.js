import { mount } from "svelte";
import "./app.css";
import ConsulationComponent from './lib/Components/Reservation.svelte'
let AppConsulation = document.querySelector("app-consulation");
if (AppConsulation) {
  while (AppConsulation.firstChild) {
    AppConsulation.removeChild(AppConsulation.lastChild);
  }
  mount(ConsulationComponent, {
    target: AppConsulation,
    props: {
    }
  })
  // mount()
  // new ConsulationComponent({
  //   target: AppConsulation,
  //   props: { title, apikey },
  // });
}
