import { getElementsByPromise } from "./get-element-by-promise";

export const opportunityButton = document.createElement("button");
opportunityButton.classList = `opportunityButtton flex items-center border border-gray-300 rounded-md relative pl-[12px]`;
opportunityButton.type = "button";

opportunityButton.innerHTML = `<img src="https://storage.googleapis.com/msgsndr/XuqRXK2aMJFTIGJOg9f6/media/676446359ea10041d695409e.png" class="md:mr-0 h-5 w-5 mr-2 lg:mr-2 xl:mr-2">`;

opportunityButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const currentURL = new URL(location.href);
  const isConversation = currentURL.pathname.includes(
    "/conversations/conversations/"
  );

  if (isConversation) {
    const contactLinkEl = await getElementsByPromise(
      ".new-crp--contacts--transition .avatar-container + div.items-center a",
      false
    );
    if (!contactLinkEl) return console.error("No contact link found!!");
    const contactLink = contactLinkEl.href.trim();
    const paths = contactLink.split("/");
    const contactId = paths[paths.length - 1];
    window.open(
      `https://malvecapital.com/opportunity?contactid=${contactId}`,
      "_blank"
    );
  } else {
    const paths = currentURL.pathname.split("/");
    const contactId = paths[paths.length - 1];
    window.open(
      `https://malvecapital.com/opportunity?contactid=${contactId}`,
      "_blank"
    );
  }
});
