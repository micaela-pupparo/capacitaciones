import React from "react";
import IMovie from "../models/Movie";
import SortColumn from "../types/sortColumnType";
import Like from "./common/Like";
import TableHeader from "./common/TableHeader";

interface MoviesTableProps {
  movies: IMovie[];
  sortColumn: { path: string; order: "asc" | "desc" };
  onDelete: (movie: IMovie) => void;
  onLike: (movie: IMovie) => void;
  onSort: (sortColumn: SortColumn) => void;
}

class MoviesTable extends React.Component<MoviesTableProps, object> {
  //   columns puede inicializarse aca y no ser un estado porque nunca van a cambiar
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like" },
    { key: "delete" },
  ];

  render() {
    const { movies, onDelete, onLike, sortColumn, onSort } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        ></TableHeader>
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
