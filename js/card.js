document.addEventListener("DOMContentLoaded", () => {
   const container = document.querySelector(".steps");

   let speed = 1.5;
   let lastTouchX = 0;
   let lastDeltaX = 0;
   let lastTime = 0;
   let isDragging = false;
   let inertiaVelocity = 0;
   let isHorizontalScroll = false;

   // PC用のホイールスクロール
   container.addEventListener("wheel", (e) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY * speed;
   }, { passive: false });

   // スマホ用スワイプ
   container.addEventListener("touchstart", (e) => {
      lastTouchX = e.touches[0].clientX;
      lastTime = Date.now();
      isDragging = true;
      isHorizontalScroll = false;
      inertiaVelocity = 0;
   });

   container.addEventListener("touchmove", (e) => {
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const deltaX = lastTouchX - touchX;
      const deltaY = Math.abs(touchY - e.touches[0].clientY); // 縦方向の移動量

      // 横方向スクロールかどうかを判定
      if (!isHorizontalScroll && Math.abs(deltaX) > Math.abs(deltaY)) {
         isHorizontalScroll = true;
      }

      if (isHorizontalScroll) {
         e.preventDefault();
         container.scrollLeft += deltaX * speed;
         let now = Date.now();
         inertiaVelocity = (deltaX / (now - lastTime)) * 500; // 慣性の速度計算
         lastTime = now;
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

         requestAnimationFrame(applyInertia);
      }
   }

   window.addEventListener("resize", () => {
      let maxScrollLeft = container.scrollWidth - container.clientWidth;
      container.scrollLeft = Math.min(container.scrollLeft, maxScrollLeft);
   });
});
