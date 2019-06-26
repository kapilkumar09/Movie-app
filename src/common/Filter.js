import React from "react";
import PropTypes from "prop-types";

const Filter = props => {
  const {
    items,
    onItemSelection,
    textProperty,
    valueProperty,
    currentItem
  } = props;
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[valueProperty]}
          className={
            currentItem === item ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemSelection(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

Filter.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

Filter.propTypes = {
  items: PropTypes.array.isRequired,
  onItemsSelection: PropTypes.func.isRequired,
  currentItem: PropTypes.object.isRequired
};

export default Filter;
