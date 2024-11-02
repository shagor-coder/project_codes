import handle_icons_click from "./handle_icon_clicks";

export const google_maps_icons_container = document.createElement("div");
google_maps_icons_container.classList = "_d_h_b-maps-con";
google_maps_icons_container.innerHTML = `
<!--<span style="font-size: 14px;color: #0c2d3f;font-weight: 500;line-height: 21px;">View Maps:</span>-->
<span id="zillow_button" style="display: inline-flex;align-items:center;justify-content:center;width: 24px;">
  <img style="max-width: 100%;width: 18px;height: 18px;border-radius:3px;cursor: pointer;margin-top: 2px"
   src="https://storage.googleapis.com/msgsndr/zY9uMzbEpJUrPPD0yfTL/media/64b7100af601aa83be46942e.webp"
   alt="zillow" />
</span>
<span id="maps_button" style="display: inline-flex;align-items:center;justify-content:center;width: 24px;">
  <img style="max-width: 100%;width: 20px;height: 20px;border-radius:3px;cursor: pointer;"
   src="https://storage.googleapis.com/msgsndr/zY9uMzbEpJUrPPD0yfTL/media/64b7100acb72ab364e9164b7.png"
   alt="Maps" />
</span>
`;

google_maps_icons_container.style = `
 position: absolute;
 width: 62px;
 height: 22px;
 right: 0;
 top: -2px;
 display: flex;
 align-items: center;
 gap: 5px;
`;

export const zillow_button =
  google_maps_icons_container.querySelector("#zillow_button img");
export const maps_button =
  google_maps_icons_container.querySelector("#maps_button img");

zillow_button.addEventListener("click", handle_icons_click);
maps_button.addEventListener("click", handle_icons_click);
