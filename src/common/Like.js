import React from "react";

const Like = props => {
  let iconStyles = props.liked ? "fa fa-heart" : "fa fa-heart-o";
  return (
    <i
      className={iconStyles}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
      onClick={() => props.onSelected()}
    />
  );
};

export default Like;
