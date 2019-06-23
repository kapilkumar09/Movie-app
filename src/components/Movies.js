import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./Like";
import Pagination from "./Pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1
  };

  renderMoviesStatusText() {
    const { length: count } = this.state.movies;

    if (count === 0) {
      return <p>There are no movies in the database</p>;
    } else {
      return <p>{`Showing ${count} movies in the database`}</p>;
    }
  }

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

  renderTableRows() {
    const { movies: allMovies, currentPage, pageSize } = this.state;
    const movies = paginate(allMovies, currentPage, pageSize);
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
  renderTable() {
    return (
      <table className="table">
        {this.renderTableHeading()}
        {this.renderTableRows()}
      </table>
    );
  }
  render() {
    const { movies, pageSize, currentPage } = this.state;

    return (
      <div>
        {this.renderMoviesStatusText()}
        {this.renderTable()}
        <Pagination
          totalItems={movies.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={page => this.handlePageChange(page)}
        />
      </div>
    );
  }
}

export default Movies;
