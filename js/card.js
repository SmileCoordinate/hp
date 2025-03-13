document.addEventListener("DOMContentLoaded", () => {
   const container = document.querySelector(".steps");

   let speed = 1.5;
   let after = 1.5;
   let fixedScrollAmount = 20;

   function isAtHorizontalEdge(scrollLeft, maxScrollLeft, delta) {
      const threshold = 15; // 誤差許容値
      return (scrollLeft <= threshold && delta < 0) || (scrollLeft >= maxScrollLeft - threshold && delta > 0);
   }

   function scrollContainer(delta) {
      let maxScrollLeft = container.scrollWidth - container.clientWidth;
      let currentScrollLeft = container.scrollLeft;

      if (!isAtHorizontalEdge(currentScrollLeft, maxScrollLeft, delta)) {
         let moveDistance = delta > 0 ? fixedScrollAmount : -fixedScrollAmount;
         let targetScrollLeft = currentScrollLeft + moveDistance * speed;
         let afterScrollLeft = targetScrollLeft + (delta > 0 ? after : -after);

         container.scrollTo({
            left: Math.min(Math.max(afterScrollLeft, 0), maxScrollLeft),
            behavior: "smooth"
         });
      }
   }

   // ホイールスクロール（PC）
   container.addEventListener("wheel", (e) => {
      e.preventDefault();
      scrollContainer(e.deltaY);
   }, { capture: true, passive: false });

   // スマホのスワイプ処理
   let touchStartX = 0;
   let touchMoveX = 0;
   let lastTouchTime = 0;
   let lastDeltaX = 0;
   let isHorizontalScroll = false;

   container.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      touchMoveX = touchStartX;
      lastTouchTime = Date.now();
      isHorizontalScroll = false;
   });

   container.addEventListener("touchmove", (e) => {
      let deltaX = touchMoveX - e.touches[0].clientX;
      let maxScrollLeft = container.scrollWidth - container.clientWidth;
      let currentScrollLeft = container.scrollLeft;

      if (!isHorizontalScroll && Math.abs(deltaX) > 100) {
         isHorizontalScroll = true;
      }

      if (isHorizontalScroll) {
         e.preventDefault();
         scrollContainer(deltaX);
         touchMoveX = e.touches[0].clientX;

         // スワイプ速度計算
         let now = Date.now();
         lastDeltaX = deltaX / (now - lastTouchTime);
         lastTouchTime = now;
      }
   }, { capture: true, passive: false });

   container.addEventListener("touchend", () => {
      let inertia = lastDeltaX * 10;
      scrollContainer(-inertia);
   });

   window.addEventListener("resize", () => {
      let maxScrollLeft = container.scrollWidth - container.clientWidth;
      container.scrollLeft = Math.min(container.scrollLeft, maxScrollLeft);
   });
});
