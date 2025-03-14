document.addEventListener("DOMContentLoaded", () => {
   const container = document.querySelector(".steps");

   container.addEventListener("wheel", (e) => {
      const atLeftEdge = container.scrollLeft === 0;
      const atRightEdge = container.scrollLeft + container.clientWidth >= container.scrollWidth;

      // 横スクロール可能なときは横スクロールを優先
      if (!atLeftEdge || !atRightEdge) {
         e.preventDefault();
         container.scrollLeft += (Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX) * 1.5;
      }
   }, { passive: false });
});
