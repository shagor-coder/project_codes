import { handle_mutation } from "./helpers/handle_mutation";
import styles from "./style.css?inline=true";

const styleTag = document.createElement("style");
styleTag.innerHTML = styles;

document.head.appendChild(styleTag);

let mutationObsever = null;
let mutationConfig = {
  subtree: true,
  childList: true,
};

mutationObsever = new MutationObserver(handle_mutation);

const main = () => {
  const app = document.querySelector("#app");
  mutationObsever.observe(app, mutationConfig);
};

main();
