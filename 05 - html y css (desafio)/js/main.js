const collapsibles = document.querySelectorAll(".collapsible");
const icons = document.querySelectorAll(".nav-bar__toggler");

console.log(collapsibles)

// collapsibles.forEach((item) =>
//   item.addEventListener("click", function () {
//     console.log(item)
//     this.classList.toggle("collapsible--expanded")
//     icons.forEach((icon) => 
//     icon.classList.toggle("icon--invisible")
//     )
//   })
// );

icons.forEach((icon) => 
  icon.addEventListener("click", function () {
    collapsibles.forEach((item) => 
      item.classList.toggle("collapsible--expanded")
    )
    icons.forEach((icon) => 
      icon.classList.toggle("icon--invisible")
      )
  })
);

