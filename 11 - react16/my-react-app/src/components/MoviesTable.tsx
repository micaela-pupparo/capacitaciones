import React from "react";
import IMovie from "../models/Movie";
import SortColumn from "../types/sortColumnType";
import Like from "./common/Like";

interface MoviesTableProps {
  movies: IMovie[];
  sortColumn: { path: string; order: "asc" | "desc" };
  onDelete: (movie: IMovie) => void;
  onLike: (movie: IMovie) => void;
  onSort: (sortColumn: SortColumn) => void;
}

class MoviesTable extends React.Component<MoviesTableProps, object> {
  raiseSort = (path: string) => {
    const sortColumn = { ...this.props.sortColumn };
    console.log(sortColumn);
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { movies, onDelete, onLike } = this.props;

    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col" onClick={() => this.raiseSort("title")}>
              Title
            </th>
            <th scope="col" onClick={() => this.raiseSort("genre.name")}>
              Genre
            </th>
            <th scope="col" onClick={() => this.raiseSort("numberInStock")}>
              Stock
            </th>
            <th scope="col" onClick={() => this.raiseSort("dailyRentalRate")}>
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
                  <Like
                    liked={movie.liked}
                    onClick={() => onLike(movie)}
                  ></Like>
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
  }
}

export default MoviesTable;
