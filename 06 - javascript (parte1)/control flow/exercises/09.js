//                      EXERCISE -- GRADE
//calcula el promedio
//con el promedio se muestra lo siguiente
//1-59: F
//60-69: D
//70-79: C
//80-89: B
//90-100: A


const marks = [80, 80, 50];

console.log(calculateGrade(marks));

function calculateGrade(marks) {
    const average = calculateAverage(marks);

    if (average < 60) return 'F';
    if (average < 70) return 'D';
    if (average < 80) return 'C';
    if (average < 90) return 'B';
    return 'A';
}

function calculateAverage(array) {
    let sum = 0;

    for (let mark of array)
        sum += array;

    return sum / array.lenght
}