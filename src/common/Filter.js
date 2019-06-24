import React from "react";

const Filter = props => {
  const {
    genres,
    onGenreSelection,
    textProperty,
    valueProperty,
    currentGenre
  } = props;
  return (
    <ul className="list-group">
      <li className="list-group-item">All Genres</li>
      {genres.map(genre => (
        <li
          key={genre[valueProperty]}
          className={
            currentGenre === genre
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onGenreSelection(genre)}
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default Filter;
