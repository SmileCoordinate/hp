document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const modal = document.getElementById("thanksModal");
  const closeButton = document.querySelector(".close");
  const inputs = document.querySelectorAll(".input-text");

  const scriptURL = "https://script.google.com/macros/s/AKfycbyg9Yf9AGGis0Ep9_cipYEV7Noi2uAwdObWl_RZuK3TFdqgGkXGJIfuX3VOtAHPUSMpcQ/exec";

  if (!form || !modal || !closeButton) {
    console.error("必要な要素が見つかりません。HTML を確認してください。");
    return;
  }

  // ラベル制御
  inputs.forEach(input => {
    toggleLabel(input);
    input.addEventListener("input", () => toggleLabel(input));
  });

  function toggleLabel(input) {
    input.classList.toggle("not-empty", input.value.trim() !== "");
  }

  modal.style.display = "none";

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      name: form.querySelector('[name="name"]').value,
      email: form.querySelector('[name="email"]').value,
      inquiryType: form.querySelector('[name="inquiryType"]').value,
      message: form.querySelector('[name="message"]').value,
    };

    fetch(scriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.text())
      .then(text => {
        console.log("レスポンステキスト:", text);
        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.error("JSONパース失敗:", e);
          throw new Error("無効なレスポンス形式");
        }

        if (data.success) {
          form.reset();
          inputs.forEach(input => toggleLabel(input));
          modal.style.display = "block";
          setTimeout(() => modal.classList.add("show"), 10);
        } else {
          alert("送信に失敗しました。もう一度お試しください。");
        }
      })
      .catch(error => {
        console.error("送信エラー:", error);
        alert("送信に失敗しました。通信状況をご確認の上、再度お試しください。");
      });
  });

  closeButton.addEventListener("click", closeModal);
  window.addEventListener("click", event => {
    if (event.target === modal) closeModal();
  });

  function closeModal() {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
    }, 400);
  }
});
