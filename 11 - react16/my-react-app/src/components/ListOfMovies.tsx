/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from "react";
import IMovie from "../models/Movie.js";
import IGenre from "../models/Genre.js";
import SortColumn from "../types/sortColumnType.js";
import { getMovies } from "../services/fakeMovieService.js";
import { getGenres } from "../services/fakeGenreService.js";
import Pagination from "./common/Pagination.js";
import { paginate } from "../utils/paginate.js";
import ListGroup from "./common/listGroup.jsx";
import MoviesTable from "./MoviesTable.js";
import _ from "lodash";

interface MoviesState {
  movies: IMovie[];
  genres: IGenre[];
  selectedGenre: IGenre | undefined;
  pageSize: number;
  currentPage: number;
  sortColumn: SortColumn;
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
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount(): void {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
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
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn: SortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
    } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

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
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          ></MoviesTable>
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
