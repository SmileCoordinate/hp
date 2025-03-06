document.addEventListener("DOMContentLoaded", () => {
   const container = document.querySelector(".steps");

   let speed = 1.5;
   let after = 1.5;
   let fixedScrollAmount = 20;

   function isAtHorizontalEdge(scrollLeft, maxScrollLeft, deltaY) {
      const threshold = 15; // 誤差許容値
      const atLeftEdge = scrollLeft <= threshold && deltaY < 0;
      const atRightEdge = scrollLeft >= maxScrollLeft - threshold && deltaY > 0;
      return atLeftEdge || atRightEdge;
   }

   container.addEventListener("wheel", (e) => {
      let maxScrollLeft = Math.round(container.scrollWidth - container.clientWidth);
      let currentScrollLeft = Math.round(container.scrollLeft);

      // 横スクロールの終端では `preventDefault()` を適用しない（縦スクロールを許可）
      if (!isAtHorizontalEdge(currentScrollLeft, maxScrollLeft, e.deltaY)) {
         e.preventDefault();
      }

      let moveDistance = (e.deltaY > 0 ? fixedScrollAmount : -fixedScrollAmount);
      let targetScrollLeft = currentScrollLeft + moveDistance * speed;
      let afterScrollLeft = targetScrollLeft + (e.deltaY > 0 ? after : -after);

      container.scrollTo({
         left: Math.min(Math.max(afterScrollLeft, 0), maxScrollLeft),
         behavior: "smooth"
      });
   }, { capture: true, passive: false });

   // スマホのスワイプで横スクロール
   let touchStartX = 0;
   let touchStartY = 0;

   container.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
   });

   container.addEventListener("touchmove", (e) => {
      let deltaX = touchStartX - e.touches[0].clientX;
      let deltaY = touchStartY - e.touches[0].clientY;
      let maxScrollLeft = Math.round(container.scrollWidth - container.clientWidth);
      let currentScrollLeft = Math.round(container.scrollLeft);

      if (isAtHorizontalEdge(currentScrollLeft, maxScrollLeft, deltaX)) {
         return;
      }

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
         e.preventDefault();
         container.scrollLeft = Math.min(Math.max(currentScrollLeft + (deltaX > 0 ? fixedScrollAmount : -fixedScrollAmount), 0), maxScrollLeft);
      }
   }, { capture: true, passive: false });

   window.addEventListener("resize", () => {
      let maxScrollLeft = Math.round(container.scrollWidth - container.clientWidth);
      container.scrollLeft = Math.min(container.scrollLeft, maxScrollLeft);
   });
});
