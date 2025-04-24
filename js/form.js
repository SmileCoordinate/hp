document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".input-text");
  const modal = document.getElementById("thanksModal");
  const closeButton = document.querySelector(".close");
  const contactForm = document.getElementById("contactForm");

  modal.style.display = "none";

  function toggleLabel(input) {
    input.classList.toggle("not-empty", input.value.trim() !== "");
  }

  inputs.forEach(input => {
    toggleLabel(input);
    input.addEventListener("input", () => toggleLabel(input));
  });

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = {};
    formData.forEach((value, key) => data[key] = value);

    fetch("https://script.google.com/macros/s/AKfycbwL6-C5v8cmcG_QUy9fbRx0VhwKMK6xC1dSgom77yofRPlcinuClsV2eFqDtwzvRUHd/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        modal.style.display = "block";
        modal.classList.add("show");
        contactForm.reset();
        inputs.forEach(input => input.classList.remove("not-empty"));
      } else {
        alert("送信エラーが発生しました（サーバーエラー）");
      }
    })
    .catch(error => {
      alert("ネットワークエラーが発生しました。");
      console.error(error);
    });
  });

  closeButton.onclick = () => {
    modal.classList.remove("show");
    setTimeout(() => modal.style.display = "none", 300);
  };

  window.onclick = event => {
    if (event.target === modal) {
      modal.classList.remove("show");
      setTimeout(() => modal.style.display = "none", 300);
    }
  };
});
