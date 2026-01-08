// Menu + jaartal + simpele form-validatie feedback
(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("navMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const form = document.getElementById("contactForm");
  if (!form) return;

  const status = document.getElementById("formStatus");

  function setHint(name, msg) {
    const el = document.querySelector(`[data-hint-for="${name}"]`);
    if (el) el.textContent = msg || "";
  }

  function validate() {
    let ok = true;

    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const topic = form.querySelector("#topic");
    const message = form.querySelector("#message");
    const privacy = form.querySelector("#privacy");

    setHint("name", "");
    setHint("email", "");
    setHint("topic", "");
    setHint("message", "");
    setHint("privacy", "");

    if (!name.value.trim()) { setHint("name", "Vul je naam in."); ok = false; }
    if (!email.value.trim()) { setHint("email", "Vul je e-mail in."); ok = false; }
    else if (!email.value.includes("@")) { setHint("email", "Gebruik een geldig e-mailadres."); ok = false; }

    if (!topic.value) { setHint("topic", "Kies een onderwerp."); ok = false; }
    if (!message.value.trim()) { setHint("message", "Schrijf een kort bericht."); ok = false; }
    if (!privacy.checked) { setHint("privacy", "Vink dit aan om verder te gaan."); ok = false; }

    return ok;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validate()) {
      if (status) status.textContent = "Check de velden hierboven.";
      return;
    }

    // Demo: geen echte verzending
    if (status) status.textContent = "Dank! Je bericht is klaar om te verzenden. Gebruik de mailknop of koppel Formspree/Netlify Forms.";
    form.reset();
  });
})();
