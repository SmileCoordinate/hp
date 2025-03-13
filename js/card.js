document.addEventListener("DOMContentLoaded", () => {
   const container = document.querySelector(".steps");

   let lastTouchX = 0;
   let lastScrollLeft = 0;
   let inertiaVelocity = 0;
   let isDragging = false;
   let isHorizontalScroll = false;
   let animationFrameId;

   // PC用のホイールスクロール
   container.addEventListener("wheel", (e) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY * 1.5;
   }, { passive: false });

   // スマホ用スワイプ
   container.addEventListener("touchstart", (e) => {
      lastTouchX = e.touches[0].clientX;
      lastScrollLeft = container.scrollLeft;
      isDragging = true;
      isHorizontalScroll = false;
      inertiaVelocity = 0;
      cancelAnimationFrame(animationFrameId);
   });

   container.addEventListener("touchmove", (e) => {
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const deltaX = lastTouchX - touchX;
      const deltaY = Math.abs(e.touches[0].clientY - touchY); // 縦スクロール量

      if (!isHorizontalScroll && Math.abs(deltaX) > deltaY) {
         isHorizontalScroll = true;
      }

      if (isHorizontalScroll) {
         e.preventDefault();
         container.scrollLeft += deltaX;
         inertiaVelocity = deltaX * 0.8; // 慣性計算
      }

      lastTouchX = touchX;
   }, { passive: false });

   container.addEventListener("touchend", () => {
      isDragging = false;
      applyInertia();
   });

   // 慣性スクロールの適用
   function applyInertia() {
      if (Math.abs(inertiaVelocity) > 1) {
         container.scrollLeft += inertiaVelocity;
         inertiaVelocity *= 0.95; // 徐々に減速
         animationFrameId = requestAnimationFrame(applyInertia);
      }
   }
});
