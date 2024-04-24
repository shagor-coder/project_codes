const mv_app = document.querySelector("#preview-container");
const mv_observer_options = {
  subtree: true,
  childList: true,
};
const mv_observer = new MutationObserver(mv_observer_handler(1000));
mv_observer.observe(mv_app, mv_observer_options);

function mv_observer_handler(timeout) {
  let timeout_id = null;
  return () => {
    clearTimeout(timeout_id);
    timeout_id = setTimeout(() => {
      const mv_video_overlay = document.querySelector("#videoleadoverlay");
      if (!mv_video_overlay) return;
      const mv_page_popup_btn = document.querySelector(".popup_btn");
      if (mv_page_popup_btn)
        mv_page_popup_btn.click(),
          mv_page_popup_btn.classList.remove("hide-preview");
      mv_observer.disconnect();
    }, timeout);
  };
}
