window.onload = function () {
   console.log("JavaScript is running...");
   const listItems = document.querySelectorAll(".navigation ul li");

   console.log("Found list items:", listItems.length);

   if (listItems.length === 0) {
      console.error("No list items found! Check your HTML structure.");
      return;
   }

   function activeLink(event) {
      let target = event.target;

      // クリックした要素が `<li>` でなければ親要素を探す
      while (target.tagName !== "LI" && target !== document.body) {
         target = target.parentElement;
      }

      if (target.tagName === "LI") {
         // 現在の active を削除 → すぐに新しい active を追加
         listItems.forEach((item) => item.classList.remove("active"));
         target.classList.add("active");
         console.log("Active class added to:", target);
      }
   }

   listItems.forEach((item) => {
      item.addEventListener("click", activeLink);
   });

   console.log("Event listeners added to navigation items.");
};
