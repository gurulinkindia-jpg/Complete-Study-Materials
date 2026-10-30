(function () {
  "use strict";
  function send(reference, question) {
    if (window.parent === window) {
      alert("Open this practice test inside your G10 LMS course to type, write, upload and submit an answer.");
      return;
    }
    var target;
    try { target = new URL(document.referrer).origin; } catch (_) { return; }
    window.parent.postMessage({ type: "g10:written-question", reference: reference, question: question }, target);
  }
  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-written-question]");
    if (button) send(button.dataset.reference || "Written question", button.dataset.writtenQuestion || "");
  });
  function enhance() {
    document.querySelectorAll(".question:not([data-written-enhanced])").forEach(function (card, index) {
      var prompt = card.querySelector(".question-text");
      if (!prompt) return;
      card.dataset.writtenEnhanced = "true";
      var button = document.createElement("button");
      button.type = "button";
      button.textContent = "Write an explanation / show working in LMS";
      button.style.cssText = "display:block;margin:12px 0;padding:10px 14px;border:1px solid #174e86;border-radius:6px;background:#eaf3ff;color:#143f6b;cursor:pointer";
      button.dataset.reference = document.title.slice(0,100) + " · " + (card.id || "Q" + (index + 1));
      button.dataset.writtenQuestion = prompt.textContent;
      card.appendChild(button);
    });
  }
  enhance();
  new MutationObserver(enhance).observe(document.body, { childList: true, subtree: true });
}());
