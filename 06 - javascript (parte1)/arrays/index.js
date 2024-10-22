const numbers = [3, 4, 3]

//agregar datos
//end
numbers.push(5, 6);

//beginning
numbers.unshift(1, 2); 

//middle
numbers.splice(2, 0, 'a', 'b')
//(el index en donde queres que empiece, los elementos a eliminar,
//los elementos a agregar)

//                  FINDING ELEMENTS
//              PRIMITIVES

//---------------------------------------------------------------
//para buscar el index de un elemento si existe
//si no existe devuelve -1
numbers.indexOf(1) //0
numbers.indexOf('x') //-1

//si el elemento esta repetido muestra el ultimo index
//en donde se encuentra
numbers.lastIndexOf(3) //2

//para ver si existe el elemento, devuelve booleano
numbers.includes(4); //true

//todos estos tienen como segundo parametro un starting point
//le especificas desde que index queres que empiece la busqueda
//-----------------------------------------------------------------

//              REFERENCE TYPES
const courses = [
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
];

//si no encuentra nada devuelve undefined
const course = courses.find(function(course) {
    return course.name === 'a'
});

//para buscar el index del objeto que cumpla
const course1 = courses.findIndex(function(course) {
    return course.name === 'a'
});

//utilizando arrow function
const course2 = courses.findIndex(course => course.name === 'a');
//esto se puede hacer si la funcion tiene un return 
//y es solo una funcion de una linea

//eliminar datos
//end
numbers.pop() //remueve el ultimo elemento y lo retorna

//beginnig
numbers.shift() //retorna el elemento eliminado

//middle
numbers.splice(2, 1);


//                      EMPTYING AN ARRAY

//solution 1
//si esta en una variable let podes reasignarle un array vacio
//si se tienen multiples referencias al array que queremos vaciar
//esto no va funcionar

let numeros = [1,2,3,4];
let another = numeros;

numeros = [];

console.log(another); //[1,2,3,4]

//solution 2
//truncando al array remueve todos los elementos

numeros.length = 0; //a mosh le gusta mas esta solucion
console.log(another); //[]

//solution 3
//usando splice

numeros.splice(0, numeros.length);
console.log(another); //[]

//solution 4
//usando pop
//no es recomendable porque el array puede tener muchos elementos

while(numeros.length > 0)
    numeros.pop();


//                      COMBINING AND SLICING
const first = [1, 2, 3];
const second = [4, 5];

const combined = first.concat(second);
console.log(combined);

//empieza antes del index 2 y termina antes del index 4
combined.slice(2, 4); //[3, 4]
combined.slice(2) //[3, 4, 5, 6]
combined.slice() //te da una copia del array
//al ser datos primitivos los valores son copiados
//si fuesen reference types se copia la referencia 


//                      SPREAD OPERATOR FOR COMBINING
//esta forma es mas flexible

//agrega los elementos individuales del array
const combined1 = [...first, ...second];
//flexible porque:
const combined2 = [...first, 'a', ...second, 'b'];
//tambien se puede copiar el array con el spread
const copy = [...combined2];


//                      ITERATING AN ARRAY
//no tiene mucha diferencia con el for
numbers.forEach((number, index) => console.log(index, number));


//                      JOINING ARRAYS
numbers.join(',');
//(separador) y retorta un string


//                      SORTING ARRAYS
const numbers1 = [2, 3, 1];
numbers1.sort(); //convierte cada elemento del array en un string
//y luego ordena los elementos en el array

numbers1.reverse(); //orden invertido [3, 2, 1]

const courses1 = [
    { id: 1, name: 'Node.js' },
    { id: 2, name: 'JavaScript' }
]

courses1.sort(function(a, b) {
    //a < b => -1
    //a > b => 1
    //a === b => 0

    //esto es por el tema de que cada letra esta representada por un num
    //ascii. las mayusculas tienen menos numeros que las minusculas
    //y puede afectar al calculo
    const nameA = a.name.toLocaleUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
})


//                      TESTING ARRAYS
//every agarra la funcion callback y la ejecuta en todos los elementos
//en el momento que UNO no lo cumpla, devuelve false
//y deja de buscar
numbers.every(function(value) {
    return value >= 0; //para ver que todos los elementos sean +
});

//some hace lo mismo que every solo que busca que un solo elemento
//cumpla con lo que se pide
numbers.some(function(value) {
    return value >= 0; //para ver que todos los elementos sean +
});


//                      FILTERING AN ARRAY
const positiveNumbers = numbers.filter(n => n >= 0); 
//pone todos los num + en un nuevo array


//                      REDUCING AN ARRAY
//si queremos sumar todos los valores de un array

const values = [1, -1, 2, 3];

values.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
}, 0); //el segundo parametro es el valor incial del acumulador
//si le sacas el parametro el valor inicial es del primer elemento
//para este caso nos conviene pero dejo el 0 para que entiendas
//que se usa el otro parametro
//tambien se puede reducir la arrow function