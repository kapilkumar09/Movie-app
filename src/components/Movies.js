import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "../common/Like";
import Pagination from "../common/Pagination";
import Filter from "../common/Filter";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,

    currentPage: 1
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
    this.setState({ currentGenre: genre });
  };

  handleLike(movie) {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  }

  handleDelete(id) {
    const movies = this.state.movies.filter(movie => movie._id !== id);
    this.setState({ movies });
  }

  handlePageChange(page) {
    this.setState({ currentPage: page });
  }

  renderTableHeading() {
    return (
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Stock</th>
          <th>Rate</th>
          <th> </th>
          <th> </th>
        </tr>
      </thead>
    );
  }

  renderTableRows(filteredMovies) {
    const { currentPage, pageSize } = this.state;

    const movies = paginate(filteredMovies, currentPage, pageSize);
    return (
      <tbody>
        {movies.map(movie => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like
                liked={movie.like}
                onSelected={() => this.handleLike(movie)}
              />
            </td>
            <td>
              <button
                onClick={() => this.handleDelete(movie._id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
  renderTable(filteredMovies) {
    return (
      <table className="table">
        {this.renderTableHeading()}
        {this.renderTableRows(filteredMovies)}
      </table>
    );
  }
  render() {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      genres,
      currentGenre
    } = this.state;

    const filteredMovies =
      currentGenre && currentGenre._id
        ? allMovies.filter(movie => currentGenre._id === movie.genre._id)
        : allMovies;

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
          {this.renderTable(filteredMovies)}
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
