/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from "react";
import IMovie from "../models/Movie";
import { getMovies, deleteMovie } from "../services/fakeMovieService.js";
import Like from "./common/Like.js";

interface MoviesState {
  movies: IMovie[];
}

// debemos aclararle con un objeto que no vamos a recibir props
class TableOfMovies extends React.Component<{}, MoviesState> {
  state: MoviesState = {
    movies: getMovies(),
  };

  handleDelete = (id: string) => {
    deleteMovie(id);
    return this.setState({ movies: this.state.movies });
  };

  //   implementacion de mosh:
  // handleDelete = (movie) => {
  //      const movies = this.state.movies.filter(m => m._id !== movie._id);
  //      this.setState({movies})
  // }

  handleLike = (movie: IMovie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  render() {
    const { length: count } = this.state.movies;

    if (count === 0) return <p>There are no movies in the database.</p>;
    return (
      <div>
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
            {this.state.movies.map((movie) => {
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
                      onClick={() => this.handleDelete(movie._id)}
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
      </div>
    );
  }
}

export default TableOfMovies;
