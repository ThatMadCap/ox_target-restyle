import { createOptions } from "./createOptions.js";

const optionsWrapper = document.getElementById("options-wrapper");
const body = document.body;
const eye = document.getElementById("eyeSvg");

window.addEventListener("message", (event) => {
  optionsWrapper.innerHTML = "";

  switch (event.data.event) {
    case "visible": {
      body.style.visibility = event.data.state ? "visible" : "hidden";
      eye.classList.remove("eye-hover");
      document.querySelector('circle').classList.remove('circle-hover');
      document.querySelector('circle').style.fill = '';
      return
    }

    case "leftTarget": {
      eye.classList.remove("eye-hover");
      document.querySelector('circle').classList.remove('circle-hover');
      document.querySelector('circle').style.fill = '';
      return;
    }

    case "setTarget": {
      eye.classList.add("eye-hover");
      document.querySelector('circle').classList.add('circle-hover');
      document.querySelector('circle').style.fill = '';

      if (event.data.options) {
        for (const type in event.data.options) {
          event.data.options[type].forEach((data, id) => {
            createOptions(type, data, id + 1);
          });
        }
      }

      if (event.data.zones) {
        for (let i = 0; i < event.data.zones.length; i++) {
          event.data.zones[i].forEach((data, id) => {
            createOptions("zones", data, id + 1, i + 1);
          });
        }
      }
    }
  }
});
