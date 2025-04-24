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
    const form = e.target;
    const formData = new FormData(form);

    // 送信処理
    fetch(form.action, {
      method: 'POST',
    }).then(response => {
      if (response.ok) {
        submitted = true;  // 送信成功時に submitted を true にする
        modal.style.display = "block";  // モーダルを表示
        modal.classList.add("show");
        form.reset();  // フォームをリセット
        document.querySelectorAll('.input-text').forEach(input => {
          input.classList.remove('not-empty');
        });
      } else {
        alert('送信に問題が発生しました。サーバーからエラーが返されました。');
        console.error('送信エラー:', response);
      }
    }).catch(error => {
      alert('送信に問題が発生しました。ネットワークエラーの可能性があります。');
      console.error('ネットワークエラー:', error);  // エラーをコンソールに出力
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
