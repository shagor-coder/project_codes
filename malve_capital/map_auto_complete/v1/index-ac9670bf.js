(function () {
  (function () {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const n of document.querySelectorAll('link[rel="modulepreload"]'))
      i(n);
    new MutationObserver((n) => {
      for (const s of n)
        if (s.type === "childList")
          for (const r of s.addedNodes)
            r.tagName === "LINK" && r.rel === "modulepreload" && i(r);
    }).observe(document, { childList: !0, subtree: !0 });
    function o(n) {
      const s = {};
      return (
        n.integrity && (s.integrity = n.integrity),
        n.referrerPolicy && (s.referrerPolicy = n.referrerPolicy),
        n.crossOrigin === "use-credentials"
          ? (s.credentials = "include")
          : n.crossOrigin === "anonymous"
          ? (s.credentials = "omit")
          : (s.credentials = "same-origin"),
        s
      );
    }
    function i(n) {
      if (n.ep) return;
      n.ep = !0;
      const s = o(n);
      fetch(n.href, s);
    }
  })();
  function a(t = "", e = "") {
    return new Promise((o, i) => {
      let n = null,
        s;
      (s = setInterval(() => {
        e === "multi"
          ? (n = [...document.querySelectorAll(t)])
          : (n = document.querySelector(t)),
          !(e === "multi" && !n.length) && n && (clearInterval(s), o(n));
      }, 200)),
        setTimeout(() => {
          n || (clearInterval(s), o(!1));
        }, 2e4);
    });
  }
  async function g(t) {
    if (location.href.includes("/opportunities/list")) {
      const e = await a(
        "#opportunitiesCustomFieldForm input[placeholder='Property Address'"
      );
      if (!e) return console.log("Property Address element not found");
      const o = e.value.trim();
      if (t.target.parentElement.id.trim() === "zillow_button") {
        const i = "https://www.zillow.com/homes/" + o;
        window.open(i, "_blank");
      }
      if (t.target.parentElement.id.trim() === "maps_button") {
        const i = "https://google.com/maps/search/" + o;
        window.open(i, "_blank");
      }
      return;
    } else {
      const e = await a(
          '.hl_contact-details-left input[name="contact.address1"]'
        ),
        o = await a(".hl_contact-details-left input[name='contact.city']"),
        i = await a(".hl_contact-details-left input[name='contact.state']"),
        n = await a(
          ".hl_contact-details-left input[name='contact.postal_code']"
        );
      if (!e || !o || !i || !n) return;
      const s = `${e.value} ${o.value} ${i.value} ${n.value}`;
      if (t.target.parentElement.id.trim() === "zillow_button") {
        const r = "https://www.zillow.com/homes/" + s;
        window.open(r, "_blank");
      }
      if (t.target.parentElement.id.trim() === "maps_button") {
        const r = "https://google.com/maps/search/" + s;
        window.open(r, "_blank");
      }
    }
  }
  const l = document.createElement("div");
  l.classList = "_d_h_b-maps-con";
  l.innerHTML = `
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
  l.style = `
 position: absolute;
 width: 62px;
 height: 22px;
 right: 0;
 top: -2px;
 display: flex;
 align-items: center;
 gap: 5px;
`;
  const E = l.querySelector("#zillow_button img"),
    x = l.querySelector("#maps_button img");
  E.addEventListener("click", g);
  x.addEventListener("click", g);
  async function P() {
    const t = await a(".form-footer.save button.bg-apple-500");
    t && t.click();
  }
  async function L() {
    const t = await a("#CreateUpdateOpportunity");
    t && t.click();
  }
  function d(t, e) {
    const o = new Event("input");
    (t.value = e || ""), o.initEvent("input", !0), t.dispatchEvent(o);
  }
  function b(t) {
    return new google.maps.places.Autocomplete(t, {
      componentRestrictions: { country: "us" },
      fields: ["address_components", "geometry", "name"],
      types: ["address"],
    });
  }
  async function z(t = {}) {
    const {
        street_adress_input: e,
        city_input: o,
        state_input: i,
        postal_code_input: n,
      } = t,
      s = b(e);
    s.addListener("place_changed", async () => {
      const r = s.getPlace(),
        { address_components: u, name: _ } = r,
        m = _,
        f = u.find(
          (p) => p.types.includes("locality") && p.types.includes("political")
        ),
        h = u.find((p) => p.types.includes("administrative_area_level_1")),
        c = u.find((p) => p.types.includes("postal_code"));
      d(e, m),
        d(o, f && f.short_name),
        d(i, h && h.short_name),
        d(n, c && c.short_name);
      const v = new Event("blur");
      e.dispatchEvent(v), await P();
    });
  }
  async function k(t = null) {
    const e = b(t);
    e.addListener("place_changed", async () => {
      const o = e.getPlace(),
        { address_components: i, name: n } = o,
        s = n,
        r = i.find(
          (c) => c.types.includes("locality") && c.types.includes("political")
        ),
        u = i.find(
          (c) =>
            c.types.includes("sublocality_level_1") &&
            c.types.includes("political")
        ),
        _ = i.find((c) => c.types.includes("administrative_area_level_1")),
        m = i.find((c) => c.types.includes("postal_code"));
      console.log(i);
      const f = `${s} ${r ? r.short_name : u.short_name} ${
        _ ? _.short_name : ""
      } ${m ? m.short_name : ""}`;
      d(t, f);
      const h = new Event("blur");
      t.dispatchEvent(h), await L();
    });
  }
  async function j() {
    const t = await a('.hl_contact-details-left [id="contact.address1"]');
    if (!t) return;
    t.style = `
	  position: relative !important;
	`;
    const e = await a(
        '.hl_contact-details-left input[name="contact.address1"]'
      ),
      o = await a(".hl_contact-details-left input[name='contact.city']"),
      i = await a(".hl_contact-details-left input[name='contact.state']"),
      n = await a(".hl_contact-details-left input[name='contact.postal_code']");
    if (!e || !o || !i || !n) return;
    await z({
      street_adress_input: e,
      city_input: o,
      state_input: i,
      postal_code_input: n,
    }),
      t.append(l);
  }
  async function y() {
    if (l.isConnected) return;
    const t = await a(
      "#opportunitiesCustomFieldForm input[placeholder='Property Address'"
    );
    if (!t) return console.log("Property Address element not found");
    await k(t);
    const e =
      t.offsetParent.offsetParent.offsetParent.offsetParent.parentElement;
    (e.style.position = "relative"), e.append(l);
  }
  async function A() {
    if (l.isConnected) return;
    if (await a("#opportunitiesCustomFieldForm")) return await y();
    const e = await a(".opportunitiesCard", "multi");
    if (!e.length) return console.log("No opportunity cards found");
    e.forEach((o) => {
      o.removeEventListener("click", y);
    }),
      e.forEach((o) => {
        o.addEventListener("click", y);
      });
  }
  const q = `.pac-container{z-index:9999!important}
`,
    w = document.createElement("style");
  w.type = "text/css";
  w.innerHTML = q;
  document.head.appendChild(w);
  function C() {
    let t;
    return () => {
      clearTimeout(t),
        (t = setTimeout(async () => {
          const e = new URL(location.href);
          if (e.pathname.includes("location") && !l.isConnected) {
            if (e.pathname.includes("/contacts/detail/")) {
              [...document.querySelectorAll(".pac-container")].forEach((o) => {
                o.remove();
              }),
                await j(e.pathname);
              return;
            }
            if (e.pathname.includes("/opportunities/list")) {
              [...document.querySelectorAll(".pac-container")].forEach((o) => {
                o.remove();
              }),
                await A();
              return;
            }
          }
        }, 500));
    };
  }
  const M = new MutationObserver(C());
  async function O() {
    const t = document.querySelector("body");
    t && M.observe(t, { childList: !0, subtree: !0, attributes: !0 });
  }
  O();
})();
