//                      EXERCISE -- DEMERIT POINTS
// Speed Limit = 70
// si alguien maneja a menor velocidad => 'Ok'
// cada 5 km por encima del limite suma un punto. Usa Math.floor para calcular los puntos
// 72 => 'Ok'
// 75 => Points: 1
// + de 12 puntos => 'License suspended'

function checkSpeed(speed) {
    const speedLimit = 70;
    const kmPerPoint = 5;

    if (speed <= speedLimit + kmPerPoint)
        console.log('Ok');
        return; //esto es para no escribir el else y que quede mas prolijo
    
    //se usa const para lo modificar accidentalmente los puntos
    const points = Math.floor((speed - speedLimit) / kmPerPoint);
    if (points >= 12)
        console.log('License suspended');
    else
        console.log('Points ', points);
    
}