import { mount } from "svelte";
import "./app.css";
import ConsulationComponent from './lib/Components/Reservation.svelte'
let AppConsulation = document.querySelector("app-consulation");
if (AppConsulation) {
  const token = AppConsulation.getAttribute("token");
  while (AppConsulation.firstChild) {
    AppConsulation.removeChild(AppConsulation.lastChild);
  }
  mount(ConsulationComponent, {
    target: AppConsulation,
    props: {
      token
    }
  })
  // mount()
  // new ConsulationComponent({
  //   target: AppConsulation,
  //   props: { title, apikey },
  // });
}
