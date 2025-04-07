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
    e.preventDefault(); // ← ページ遷移を防ぐ

    const formData = {
      name: contactForm.querySelector('[name="name"]').value,
      email: contactForm.querySelector('[name="email"]').value,
      inquiryType: contactForm.querySelector('[name="inquiryType"]:checked')?.value || "",
      message: contactForm.querySelector('[name="message"]').value
    };

    console.log("送信データ:", formData);
    console.log("送信先URL:", contactForm.action);

    fetch(contactForm.action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
      mode: "cors"  // ← 必須
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          modal.style.display = "block";
          setTimeout(() => modal.classList.add("show"), 10);
          contactForm.reset();
          inputs.forEach(input => input.classList.remove("not-empty"));
        } else {
          console.error("送信失敗:", result.error);
          alert("送信に失敗しました。");
        }
      })
      .catch(error => {
        console.error("通信エラー:", error);
        alert("通信エラーが発生しました");
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
