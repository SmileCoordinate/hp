
document.addEventListener('DOMContentLoaded', function () {

   // モーダルを開く関数
   function openModal(modalId) {
      const modal = document.getElementById(modalId);
      const overlay = modal?.previousElementSibling;

      if (modal && overlay?.classList.contains('modal-overlay')) {
         modal.classList.add('show');
         overlay.classList.add('show');
      }
   }

   // モーダルを閉じる関数（単一対象）
   function closeModal(modalElement) {
      modalElement.classList.remove('show');
      const overlay = modalElement.previousElementSibling;
      if (overlay && overlay.classList.contains('modal-overlay')) {
         overlay.classList.remove('show');
      }
   }

   // 開くボタン処理
   document.querySelectorAll('.button[data-modal]').forEach(function (button) {
      button.addEventListener('click', function (e) {
         e.preventDefault();
         const modalId = button.getAttribute('data-modal');
         openModal(modalId);
      });
   });

   // 各モーダルに閉じるイベントを追加（オーバーレイと close）
   document.querySelectorAll('.modal').forEach(function (modal) {
      const overlay = modal.previousElementSibling;
      const closeBtn = modal.querySelector('.close');

      if (overlay && overlay.classList.contains('modal-overlay')) {
         overlay.addEventListener('click', function () {
            closeModal(modal);
         });
      }

      if (closeBtn) {
         closeBtn.addEventListener('click', function () {
            closeModal(modal);
         });
      }
   });

});
