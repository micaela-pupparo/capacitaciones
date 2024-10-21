//                  LOOPS

//              FOR (la variable loop esta dentro del loop)
// (initialExpression (loop variable), condition, incrementExpression) {
//      statement
//  }
// i = index
// for (let i = 0; i < 5; i++) {
//     if (i % 2 !== 0) console.log(i);
// }

// //              WHILE (se debe declarar la variable del loop externamente)
// let i = 0;
// while (i <= 5) {
//     if (i % 2 !== 0) console.log(i);
//     i++;
// }

// //              DO-WHILE
// let i = 0;
// do {
//     if (i % 2 !== 0) console.log(i);
//     i++;
// } while (i <= 5)

// //              FOR-IN
// const person = {
//     name: 'Mosh',
//     age: 30
// };

// for (let key in person)
//     console.log(key, person[key]); //para estos casos se usa bracket notation

// const colors = ['red', 'green', 'blue']

// //la forma ideal de iterar en arrays es con for...of
// for (let index in colors) //es el indice de cada elemento
//     console.log(index); //0 
//                         //1
//                         //2

// for (let index in colors)
//     console.log(index, colors[index]);

// //              FOR-OF
// for (let color of colors) 
//     console.log(color); //ya no hace falta el index

// //              BREAK
// let i = 0;
// while (i <= 10) {
//     if (i === 5) break; //forzamos la salida del loop si se cumple

//     console.log(i);
//     i++;
// }

// //              CONTINUE
// while (i <= 10) {
//     if (i % 2 === 0) {
//         i++;
//         continue; //forzamos la siguiente iteracion
//     }

//     console.log(i);
//     i++;
// }