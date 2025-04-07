document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".input-text");
  const modal = document.getElementById('thanksModal');
  const closeButton = document.querySelector('.close');
  const contactForm = document.getElementById('contactForm');

  modal.style.display = "none";

  function toggleLabel(input) {
    if (input.value.trim() !== "") {
      input.classList.add("not-empty");
    } else {
      input.classList.remove("not-empty");
    }
  }

  inputs.forEach(input => {
    toggleLabel(input);
    input.addEventListener("input", () => toggleLabel(input));
  });

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      name: contactForm.querySelector('[name="name"]').value,
      email: contactForm.querySelector('[name="email"]').value,
      inquiryType: contactForm.querySelector('[name="inquiryType"]:checked')?.value || "",
      message: contactForm.querySelector('[name="message"]').value
    };

    fetch(contactForm.action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          modal.style.display = "block";
          setTimeout(() => modal.classList.add("show"), 10);
          contactForm.reset();
          inputs.forEach(input => input.classList.remove("not-empty"));
        } else {
          alert("送信エラーが発生しました：" + (result.error || "不明なエラー"));
        }
      })
      .catch(error => {
        console.error("送信エラー:", error);
        alert("ネットワークエラーが発生しました。");
      });
  });

  closeButton.onclick = () => {
    modal.classList.remove("show");
    setTimeout(() => (modal.style.display = "none"), 300);
  };

  window.onclick = event => {
    if (event.target == modal) {
      modal.classList.remove("show");
      setTimeout(() => (modal.style.display = "none"), 300);
    }
  };
});
