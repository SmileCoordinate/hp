window.onload = function () {
   console.log("JavaScript is running...");

   const listItems = document.querySelectorAll(".navigation ul li");
   const sectionIds = [
      "#tab--one", "#tab--tow", "#tab--three", "#tab--four",
      "#tab--five", "#tab--six", "#tab--seven"
   ];
   const sections = sectionIds.map(id => document.querySelector(id));

   if (listItems.length === 0) {
      console.error("No list items found! Check your HTML structure.");
      return;
   }

   // クリックで active を切り替え
   function activeLink(event) {
      let target = event.target;

      // 親LIまでたどる
      while (target.tagName !== "LI" && target !== document.body) {
         target = target.parentElement;
      }

      if (target.tagName === "LI") {
         listItems.forEach((item) => item.classList.remove("active"));
         target.classList.add("active");
         console.log("Active class added to:", target);
      }
   }

   listItems.forEach((item) => {
      item.addEventListener("click", activeLink);
   });

   // スクロールで active を更新
   window.addEventListener("scroll", () => {
      let scrollY = window.pageYOffset;

      sections.forEach((section, index) => {
         if (!section) return; // null セクションを除外
         const sectionTop = section.offsetTop - 100; // 調整可
         const sectionHeight = section.offsetHeight;

         if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            listItems.forEach(item => item.classList.remove("active"));
            if (listItems[index]) listItems[index].classList.add("active");
         }
      });
   });

   console.log("Event listeners added to navigation items and scroll.");
};
