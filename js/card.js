document.addEventListener("DOMContentLoaded", () => {
   const container = document.querySelector(".steps");

   let speed = 1; // スクロール速度
   let after = 1; // 余韻の距離
   let fixedScrollAmount = 50; // 固定スクロール量 (マウスの設定を無視)

   let lastScrollLeft = 0; // 前回のスクロール位置

   container.addEventListener("wheel", (e) => {
      e.preventDefault(); // OSのスクロール設定を無視

      let maxScrollLeft = container.scrollWidth - container.clientWidth;

      let moveDistance = (e.deltaY > 0 ? fixedScrollAmount : -fixedScrollAmount); // 一定のスクロール量
      let targetScrollLeft = container.scrollLeft + moveDistance * speed;
      let afterScrollLeft = targetScrollLeft + (e.deltaY > 0 ? after : -after);

      if (
         (container.scrollLeft <= 0 && e.deltaY < 0) || // 左端で上スクロール
         (container.scrollLeft >= maxScrollLeft && e.deltaY > 0) // 右端で下スクロール
      ) {
         return true; // 縦スクロール許可
      }

      container.scrollTo({
         left: afterScrollLeft,
         behavior: "smooth"
      });

      lastScrollLeft = afterScrollLeft;
      return false; // 縦スクロール禁止
   }, { passive: false });

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

      let maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (
         (container.scrollLeft <= 0 && deltaX < 0) || // 左端で左スワイプ
         (container.scrollLeft >= maxScrollLeft && deltaX > 0) // 右端で右スワイプ
      ) {
         return true; // 縦スクロール許可
      }

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
         e.preventDefault();
         container.scrollLeft += fixedScrollAmount * (deltaX > 0 ? 1 : -1);
      }

      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
   }, { passive: false });
});



//縦Scrollできない