/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from "react";
import IMovie from "../models/Movie";
import IGenre from "../models/Genre.js";
import { getMovies } from "../services/fakeMovieService.js";
import { getGenres } from "../services/fakeGenreService.js";
import Like from "./common/Like.js";
import Pagination from "./common/Pagination.js";
import { paginate } from "../utils/paginate.js";
import ListGroup from "./common/listGroup.jsx";

interface MoviesState {
  movies: IMovie[];
  genres: IGenre[];
  selectedGenre: IGenre | undefined;
  pageSize: number;
  currentPage: number;
}

// debemos aclararle con un objeto que no vamos a recibir props
class TableOfMovies extends React.Component<{}, MoviesState> {
  // la razon por la que se inicializa movies y genres con un array vacio es porque va a tomar tiempo el traer la informacion de una base de datos o una api. durante ese tiempo queremos asegurarnos que no sean undefined.
  state: MoviesState = {
    movies: [],
    genres: [],
    selectedGenre: undefined,
    pageSize: 4,
    currentPage: 1,
  };

  componentDidMount(): void {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  // mi implementacion esta mal, no se debe modificar directamente de la base de datos
  // handleDelete = (id: string) => {
  //   deleteMovie(id);
  //   return this.setState({ movies: this.state.movies });
  // };

  //   implementacion de mosh:
  handleDelete = (movie: IMovie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie: IMovie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre: IGenre) => {
    this.setState({ selectedGenre: genre });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
    } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const filtered = selectedGenre
      ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
      : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          ></ListGroup>
        </div>
        <div className="col">
          <p>Showing {filtered.length} movies in the database.</p>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Stock</th>
                <th scope="col">Rate</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => {
                return (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like
                        liked={movie.liked}
                        onClick={() => this.handleLike(movie)}
                      ></Like>
                    </td>
                    <td>
                      <button
                        onClick={() => this.handleDelete(movie)}
                        type="button"
                        className="btn btn-danger btn-sm"
                        key={movie._id}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          ></Pagination>
        </div>
      </div>
    );
  }
}

export default TableOfMovies;
