document.addEventListener("DOMContentLoaded", () => {
   const container = document.querySelector(".steps");

   let speed = 1.5;
   let after = 1.5;
   let fixedScrollAmount = 20;

   function isAtHorizontalEdge(scrollLeft, maxScrollLeft, delta) {
      const threshold = 15; // 誤差許容値
      return (scrollLeft <= threshold && delta < 0) || (scrollLeft >= maxScrollLeft - threshold && delta > 0);
   }

   // ホイールスクロール（PC）
   container.addEventListener("wheel", (e) => {
      let maxScrollLeft = container.scrollWidth - container.clientWidth;
      let currentScrollLeft = container.scrollLeft;

      if (!isAtHorizontalEdge(currentScrollLeft, maxScrollLeft, e.deltaY)) {
         e.preventDefault();
      }

      let moveDistance = e.deltaY > 0 ? fixedScrollAmount : -fixedScrollAmount;
      let targetScrollLeft = currentScrollLeft + moveDistance * speed;
      let afterScrollLeft = targetScrollLeft + (e.deltaY > 0 ? after : -after);

      container.scrollTo({
         left: Math.min(Math.max(afterScrollLeft, 0), maxScrollLeft),
         behavior: "smooth"
      });
   }, { capture: true, passive: false });

   // スマホのスワイプ処理
   let touchStartX = 0;
   let touchStartY = 0;
   let touchMoveX = 0;
   let lastTouchTime = 0;
   let lastDeltaX = 0;
   let isHorizontalScroll = false;

   container.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchMoveX = touchStartX;
      lastTouchTime = Date.now();
      isHorizontalScroll = false;
   });

   container.addEventListener("touchmove", (e) => {
      let deltaX = touchMoveX - e.touches[0].clientX;
      let deltaY = touchStartY - e.touches[0].clientY;
      let maxScrollLeft = container.scrollWidth - container.clientWidth;
      let currentScrollLeft = container.scrollLeft;

      // 横スクロールと判定
      if (!isHorizontalScroll && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
         isHorizontalScroll = true;
      }

      if (isHorizontalScroll) {
         e.preventDefault();
         container.scrollLeft = Math.min(Math.max(currentScrollLeft + deltaX, 0), maxScrollLeft);
         touchMoveX = e.touches[0].clientX;

         // スワイプ速度計算
         let now = Date.now();
         lastDeltaX = deltaX / (now - lastTouchTime);
         lastTouchTime = now;
      }
   }, { capture: true, passive: false });

   container.addEventListener("touchend", () => {
      let maxScrollLeft = container.scrollWidth - container.clientWidth;
      let currentScrollLeft = container.scrollLeft;

      // スワイプの勢いを反映（慣性スクロール）
      let inertia = lastDeltaX * 250; // スワイプ速度に応じて加速
      let targetScrollLeft = currentScrollLeft - inertia;

      container.scrollTo({
         left: Math.min(Math.max(targetScrollLeft, 0), maxScrollLeft),
         behavior: "smooth"
      });
   });

   window.addEventListener("resize", () => {
      let maxScrollLeft = container.scrollWidth - container.clientWidth;
      container.scrollLeft = Math.min(container.scrollLeft, maxScrollLeft);
   });
});
