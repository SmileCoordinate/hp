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

    const nameInput = contactForm.querySelector('[name="name"]');
    const emailInput = contactForm.querySelector('[name="email"]');
    const inquiryTypeInput = contactForm.querySelector('[name="inquiryType"]');
    const messageInput = contactForm.querySelector('[name="message"]');

    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      inquiryType: inquiryTypeInput.value,
      message: messageInput.value
    };

    fetch(contactForm.action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.ok) {
          modal.style.display = "block";
          setTimeout(() => modal.classList.add("show"), 10);
          contactForm.reset();
          inputs.forEach(input => input.classList.remove("not-empty"));
        } else {
          alert("送信エラーが発生しました（サーバー応答不良）。");
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
