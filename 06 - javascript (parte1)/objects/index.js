// // Object-oriented Programming (OOP)

// let radius = 1;
// let x = 1;
// let y = 1;

// const circle = {
//     radius: 1,
//     location: {
//         x: 1,
//         y: 1
//     },
//     isVisible: true,
//     draw: function() {
//         console.log('draw');
//     }
// };

// circle.draw() //Method

//              FACTORY FUNCTION
//producen objetos

function createCircle(radius) {
    return {
        radius, //no hace falta poner radius: radius porque se llaman igual
        draw() {
            console.log('draw');
        }
    };
}
//en vez de esto
// draw: function() {
//     console.log('draw');
// }

const circle1 = createCircle(1);
circle1.draw() //draw