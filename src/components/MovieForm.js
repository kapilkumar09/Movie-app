import React, { Component } from "react";

const MovieForm = ({ match, history }) => {
  return (
    <div>
      <h1>Movie {match.params.id}</h1>
      <button
        className="btn btn-primary m-2"
        onClick={() => history.push("/movies")}
      >
        Save
      </button>
    </div>
  );
};

export default MovieForm;
