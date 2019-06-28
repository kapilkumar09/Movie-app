import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./MoviesTable";
import Pagination from "../common/Pagination";
import Filter from "../common/Filter";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: {
      column: "title",
      order: "asc"
    }
  };

  componentDidMount() {
    const genres = [{ name: "All Genre" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  renderMoviesStatusText(filteredMovies) {
    const count = filteredMovies.length;

    if (count === 0) {
      return <p>There are no movies in the database</p>;
    } else {
      return <p>{`Showing ${count} movies in the database`}</p>;
    }
  }

  handleGenreSelection = genre => {
    this.setState({ currentGenre: genre, currentPage: 1 });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };

  handleDelete = id => {
    const movies = this.state.movies.filter(movie => movie._id !== id);
    this.setState({ movies });
  };

  handlePageChange(page) {
    this.setState({ currentPage: page });
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      genres,
      currentGenre,
      sortColumn
    } = this.state;

    const filteredMovies =
      currentGenre && currentGenre._id
        ? allMovies.filter(movie => currentGenre._id === movie.genre._id)
        : allMovies;

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.column],
      [sortColumn.order]
    );
    const movies = paginate(sortedMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <Filter
            items={genres}
            currentItem={currentGenre}
            onItemSelection={this.handleGenreSelection}
          />
        </div>
        <div className="col">
          {this.renderMoviesStatusText(filteredMovies)}
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            totalItems={filteredMovies.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={page => this.handlePageChange(page)}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
