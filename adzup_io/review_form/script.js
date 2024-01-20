const review_treshold = "{{ custom_values.review_threshold }}";

const radio_inputs = [
  ...document.querySelectorAll(
    "#_builder-form .option-radio input[type=radio]"
  ),
];

radio_inputs.forEach((radio_input) => {
  radio_input.addEventListener("change", handle_radio_input_change);
});

function handle_radio_input_change(event) {
  const value = event.target.value;

  const builder_form_cols = [
    ...document.querySelectorAll("#_builder-form .fields-container .col-12"),
  ];

  if (!value) return console.log("Error");

  if (Number(value) < review_treshold) {
    builder_form_cols.forEach((col) => {
      col.style.display = "none";
    });

    builder_form_cols.slice(2, 8).forEach((col) => {
      col.style.display = "block";
    });
  }

  if (Number(value) >= review_treshold) {
    builder_form_cols.forEach((col) => {
      col.style.display = "none";
    });

    builder_form_cols.slice(8, 10).forEach((col) => {
      col.style.display = "block";
    });
  }
}

function hlpt_is_g_login(network, status) {
  if (status == true) {
    document.getElementById("review_google").classList.add("show_review");
    document.getElementById("review_facebook").classList.add("hide_review");
    document.getElementById("review_trustpilot").classList.add("hide_review");
  } else {
    document.getElementById("review_google").classList.add("hide_review");
    hlpt_is_fb_login();
  }
}

function hlpt_is_fb_login() {
  const img = document.createElement("img");
  img.src =
    "https://www.facebook.com/login.php?next=https%3A%2F%2Fwww.facebook.com%2Ffavicon.ico%3F_rdr%3Dp";
  img.onload = function () {
    //Logged into FB
    document.getElementById("review_facebook").classList.add("show_review");
    document.getElementById("review_trustpilot").classList.add("hide_review");
  };
  img.onerror = function () {
    //Not logged into FB
    document.getElementById("review_facebook").classList.add("hide_review");
    document.getElementById("review_trustpilot").classList.add("show_review");
  };
  return true;
}
