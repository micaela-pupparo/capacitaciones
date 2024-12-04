import React from "react";
import IMovie from "../models/Movie";
import SortColumn from "../types/sortColumnType";
import Like from "./common/Like";
import TableHeader from "./common/TableHeader";
import TableBody from "./common/TableBody";

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
    {
      key: "like",
      content: (movie: IMovie) => (
        <Like
          liked={movie.liked}
          onClick={() => this.props.onLike(movie)}
        ></Like>
      ),
    },
    {
      key: "delete",
      content: (movie: IMovie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          type="button"
          className="btn btn-danger btn-sm"
          key={movie._id}
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, sortColumn, onSort } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        ></TableHeader>
        <TableBody data={movies} columns={this.columns}></TableBody>
      </table>
    );
  }
}

export default MoviesTable;
