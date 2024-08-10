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
  });
  