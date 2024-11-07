const icon = document.querySelector(".icon");
const collapsible = document.querySelector(".collapsible");

icon.addEventListener("click", (event) => {
    event.preventDefault()
    collapsible.classList.toggle("collapsible--expanded")
})