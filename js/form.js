let submitted = false;

document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".input-text");
  const modal = document.getElementById('thanksModal');
  const closeButton = document.getElementsByClassName('close')[0];
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

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const encodedData = new URLSearchParams(formData).toString(); // x-www-form-urlencoded に変換

    fetch(contactForm.action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: encodedData
    })
      .then(response => response.text())
      .then(text => {
        let result;
        try {
          result = JSON.parse(text);
        } catch (e) {
          throw new Error('レスポンスの解析に失敗しました。内容: ' + text);
        }

        if (result.success) {
          submitted = true;
          modal.style.display = "block";
          setTimeout(() => modal.classList.add("show"), 10);

          contactForm.reset();
          inputs.forEach(input => input.classList.remove("not-empty"));
        } else {
          alert('送信に失敗しました：' + (result.error || '不明なエラー'));
        }
      })
      .catch(error => {
        alert('送信に失敗しました：' + error.message);
      });
  });

  closeButton.onclick = function () {
    modal.classList.remove("show");
    setTimeout(() => modal.style.display = "none", 400);
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.classList.remove("show");
      setTimeout(() => modal.style.display = "none", 400);
    }
  };
});
