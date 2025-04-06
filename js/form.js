document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".input-text");

  inputs.forEach(input => {
    toggleLabel(input);
    input.addEventListener("input", function () {
      toggleLabel(input);
    });

    function toggleLabel(input) {
      if (input.value !== "") {
        input.classList.add("not-empty");
      } else {
        input.classList.remove("not-empty");
      }
    }
  });

  const modal = document.getElementById('thanksModal');
  const closeButton = document.getElementsByClassName('close')[0];

  modal.classList.remove("show");

  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const form = e.target;

    // 値の取得
    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
      inquiryType: form.inquiryType.value
    };

    // バリデーション（簡易）
    if (!formData.name || !formData.email || !formData.message || !formData.inquiryType) {
      alert("全ての必須項目を入力してください。");
      return;
    }

    // GASエンドポイント（★ご自身のURLに置き換えてください）
    const endpoint = "https://script.google.com/macros/s/AKfycby2cXTFvwpUqTMT6lTJj1gzkG_gCWqxc1xCXHGWPekOyGbGiZomIbXyKmOV_Z7z9yAF4w/exec";

    fetch(endpoint, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          modal.classList.add("show");
          form.reset();
          document.querySelectorAll('.input-text').forEach(input => {
            input.classList.remove('not-empty');
          });
        } else {
          alert("送信に失敗しました：" + result.error);
        }
      })
      .catch(error => {
        alert("送信に失敗しました：" + error);
      });
  });

  closeButton.onclick = function () {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
    }, 400);
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
      }, 400);
    }
  };
});