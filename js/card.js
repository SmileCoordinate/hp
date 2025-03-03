const container = document.body.querySelector(".steps");
let flag = false;

container.addEventListener("mousedown", () => (flag = true));
container.addEventListener("mouseup", () => (flag = false));
container.addEventListener("mouseleave", () => (flag = false));
container.addEventListener("mousemove", (event) => {
   flag && (container.scrollLeft -= event.movementX * 10);
});
container.addEventListener("wheel", (event) => {
   event.preventDefault();
   container.scrollLeft += (event.deltaX + event.deltaY) * 5;
});
