// グローバル変数 'submitted' を宣言
let submitted = false;

document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".input-text");

  inputs.forEach(input => {
    // 初期チェック
    toggleLabel(input);

    // 入力イベントに応じてクラスを切り替え
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

  // 初期状態でモーダルを非表示
  modal.classList.remove("show");

  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData
    }).then(response => {
      if (response.ok) {
        submitted = true;
        modal.classList.add("show"); // モーダルをフェードイン
        form.reset();
        document.querySelectorAll('.input-text').forEach(input => {
          input.classList.remove('not-empty');
        });

      } else {
        alert('送信に問題が発生しました。');
      }
    }).catch(error => {
      alert('送信に問題が発生しました。');
    });
  });

  // モーダルのクローズボタン
  closeButton.onclick = function () {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
    }, 400);
  };

  // モーダル外をクリックで閉じる
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
      }, 400);
    }
  };

});
