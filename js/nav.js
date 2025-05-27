window.onload = function () {
   console.log("JavaScript is running...");
   const listItems = document.querySelectorAll(".navigation ul li");
   const sections = document.querySelectorAll("section");

   if (listItems.length === 0 || sections.length === 0) {
      console.error("List items or sections not found.");
      return;
   }

   // クリック時に active を変更
   function activeLink(event) {
      let target = event.target;
      while (target.tagName !== "LI" && target !== document.body) {
         target = target.parentElement;
      }
      if (target.tagName === "LI") {
         listItems.forEach((item) => item.classList.remove("active"));
         target.classList.add("active");
      }
   }

   listItems.forEach((item) => {
      item.addEventListener("click", activeLink);
   });

   // スクロール時に active を更新
   window.addEventListener("scroll", () => {
      let current = "";

      sections.forEach((section) => {
         const sectionTop = section.offsetTop;
         const sectionHeight = section.offsetHeight;
         if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
         }
      });

      listItems.forEach((li) => {
         const a = li.querySelector("a");
         if (a && a.getAttribute("href") === "#" + current) {
            listItems.forEach((item) => item.classList.remove("active"));
            li.classList.add("active");
         }
      });
   });

   console.log("Event listeners added to navigation items.");
};
