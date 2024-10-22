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

// //              FACTORY FUNCTION
// //producen objetos

// function createCircle(radius) {
//     return {
//         radius, //no hace falta poner radius: radius porque se llaman igual
//         draw() {
//             console.log('draw');
//         }
//     };
// }
// //en vez de esto
// // draw: function() {
// //     console.log('draw');
// // }

// const circle1 = createCircle(1);
// circle1.draw() //draw

// //              CONSTRUCTOR FUNCTION
// function Circle(radius) {
//     //this referencia un objeto vacio
//     this.radius = radius;
//     this.draw = function() {
//         console.log('draw');
//     }
// }

// const circle = new Circle(1);

// //la funcion tambien es un objeto
// Circle.name; //'Circle' 
// Circle.length; //1 --> numero de argumentos, parametros
// Circle.constructor //devuelve el built in Function() constructor

// //otros metodos
// Circle.call({}, 1); //podemos llamar una funcion
// //en el 1er parametro pasamos un objeto vacio y el this hara referencia
// //a este objeto vacio
// //despues se pasan los argumentos (parametros)

// Circle.apply({}, [1]);
// //es como el metodo call pero los parametros se pasan en un array

// //              DYNAMIC NATURE OF OBJECTS
// const circle = {
//     radius: 1
// };

// //se pueden agregar propiedades y metodos
// circle.color = 'yellow';
// circle.draw = function() {}

// //como borrarlos
// delete circle.color;
// delete circle.draw;

// //                  STRING
// // string primitive
// const message = 'This is my first message';
// typeof message; //'string'
// //cuando ponemos message. (o sea usamos la dot notation en message)
// // podemos acceder a las propiedades
// //y metodos porque js internamente envuelve al string en un objeto String

// // string object
// const another = new String('hi');
// typeof another; //'object'

// //metodos
// message.length; //24, devuelve la cant de caracteres dentro del string
// message[0]; //'T
// message.includes('my'); //true
// message.startsWith('This'); //true
// message.endsWith('d'); //false
// message.indexOf('my'); //8 ->empieza en el index 8 
// message.repeat('first', 'second'); //devuelve un nuevo string
// //reemplazando lo que pediste pero no modifica al original
// message.toUpperCase(); //lo mismo que replace
// message.trim(); //saca todo el espacio en blanco que esta antes y
// //despues del mensaje
// // message.trimLeft esta deprecado 
// message.trimStart();
// message.split(' '); //separa el string cuando hay un espacio
// //devuelve un array con todas las palabras en este caso


// //                      DATE
// const now = new Date(); //devuelve la fecha exacta
// const date1 = new Date('May 11 2018 09:00'); //hay varios posibles
// //formatos para pasar
// const date2 = new Date(2018, 4, 11, 9);
// //los meses van del 0 al 11
// //anio, mes, dia, hora, min, etc

// now.setFullYear(2017); //cambia el anio
// //tiene metodos get tambien
// now.toDateString(); //lo convierte en string
// now.toTimeString(); //la hora
// now.toISOString(); //junta la fecha y la hora
// //utilizado para mandar estos datos al backend