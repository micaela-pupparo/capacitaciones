//                      EXERCISES -- MOVIES
// all the movies in 2018 with rating > 4
// sort them by their rating
// descending order
const movies = [
  { title: "a", year: 2018, rating: 4.5 },
  { title: "b", year: 2018, rating: 4.7 },
  { title: "c", year: 2018, rating: 3 },
  { title: "d", year: 2017, rating: 4.5 },
];

const filteredMovies = movies
  .filter((m) => m.year === 2018 && m.rating >= 4)
  .sort(function (a, b) {
    if (a.rating > b.rating) return 1;
    if (a.rating < b.rating) return -1;
    return 0;
  })
  .reverse();

console.log(filteredMovies);

for (let movie of filteredMovies) console.log(movie.title);
//se podia usar map(m => m.title)
