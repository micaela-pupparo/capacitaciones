//                      EXERCISE -- ADDRESS OBJECT
const address = {
    street: 'Arias',
    city: 'Buenos Aires',
    zipCode: 1714
};

function showAddress(address) {
    for (let key in address)
        console.log(key + ': ' + address[key]);
}

showAddress(address)