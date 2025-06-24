import { mount } from "svelte";
import "./app.css";
import Home from "./lib/webcomponents/home.svelte";

let HomeSelector = document.querySelector("app-home");
if (HomeSelector) {
  const attributes = HomeSelector.getAttributeNames();
  let props = {};
  attributes.forEach((attribute) => {
    props[attribute] = HomeSelector.getAttribute(attribute);
  });
  console.log(props);
  while (HomeSelector.firstChild) {
    HomeSelector.removeChild(HomeSelector.lastChild);
  }
  mount(Home, {
    target: HomeSelector,
    props,
  });
}
