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

    fetch(contactForm.action, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(result => {
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
        alert('送信に失敗しました：' + error);
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
