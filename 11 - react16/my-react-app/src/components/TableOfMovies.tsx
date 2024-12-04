/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from "react";
import IMovie from "../models/Movie";
import IGenre from "../models/Genre.js";
import { getMovies, deleteMovie } from "../services/fakeMovieService.js";
import { getGenres } from "../services/fakeGenreService.js";
import Like from "./common/Like.js";
import Pagination from "./common/Pagination.js";
import { paginate } from "../utils/paginate.js";
import ListGroup from "./common/ListGroup.js";

interface MoviesState {
  movies: IMovie[];
  genres: IGenre[];
  pageSize: number;
  currentPage: number;
}

// debemos aclararle con un objeto que no vamos a recibir props
class TableOfMovies extends React.Component<{}, MoviesState> {
  // la razon por la que se inicializa movies y genres con un array vacio es porque va a tomar tiempo el traer la informacion de una base de datos o una api. durante ese tiempo queremos asegurarnos que no sean undefined.
  state: MoviesState = {
    movies: [],
    genres: [],
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
    console.log(genre);
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const movies = paginate(allMovies, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup<IGenre>
            items={this.state.genres}
            textProperty="name"
            valueProperty="_id"
            onItemSelect={this.handleGenreSelect}
          ></ListGroup>
        </div>
        <div className="col">
          <p>Showing {count} movies in the database.</p>
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
            itemsCount={count}
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
