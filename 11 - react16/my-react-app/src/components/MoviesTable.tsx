import React from "react";
import IMovie from "../models/Movie";
import Like from "./common/Like";

interface MoviesTableProps {
  movies: IMovie[];
  onDelete: (movie: IMovie) => void;
  onLike: (movie: IMovie) => void;
  onSort: (path: string) => void;
}

const MoviesTable: React.FC<MoviesTableProps> = ({
  movies,
  onDelete,
  onLike,
  onSort,
}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col" onClick={() => onSort("title")}>
            Title
          </th>
          <th scope="col" onClick={() => onSort("genre.name")}>
            Genre
          </th>
          <th scope="col" onClick={() => onSort("numberInStock")}>
            Stock
          </th>
          <th scope="col" onClick={() => onSort("dailyRentalRate")}>
            Rate
          </th>
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
                <Like liked={movie.liked} onClick={() => onLike(movie)}></Like>
              </td>
              <td>
                <button
                  onClick={() => onDelete(movie)}
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
  );
};

export default MoviesTable;
