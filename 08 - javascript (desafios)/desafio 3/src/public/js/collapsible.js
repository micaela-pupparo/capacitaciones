const icon = document.querySelector(".icon");
const collapsible = document.querySelector(".collapsible");

icon.addEventListener("click", () => {
    collapsible.classList.toggle("collapsible--expanded")
})