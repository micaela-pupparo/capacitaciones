//                      EXERCISE -- STARS

function showStars(rows) {
    let stars = '*';

    for (let row = 1; row <= rows; row++) {
        console.log(stars);
        stars+='*'
    }
}

function showStarsMosh(rows) {
    for (let row = 1; row <= rows; row++) {
        let pattern = '';
        for (let i = 0; i < row; i++)
            pattern += '*';
        console.log(pattern);
    }
}

showStars(5);