//                      EXERCISE -- STRING PROPERTIES

function showProperties(object) {
    for (let key in object)
        if (typeof object[key] === 'string')
            console.log(key, object[key]);
}
