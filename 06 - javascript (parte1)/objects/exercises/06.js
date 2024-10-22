//                      EXERCISE -- PRICE RANGE OBJECT
let priceRanges = [
    { label: '$', tooltip: 'Inexpensive', minPerPerson: 0, maxPerPerson: 10 },
    { label: '$$', tooltip: 'Moderate', minPerPerson: 11, maxPerPerson: 20 },
    { label: '$$$', tooltip: 'Expensive', minPerPerson: 21, maxPerPerson: 50 }
];

let restaurant = [
    { averagePerPerson: 5 }
]
//esto sirve cuando queremos filtrar por los restaurantes
//mas baratos. usamos el average con el min y max

//tooltip es cuando pasas el mouse por la etiqueta, te aparece eso