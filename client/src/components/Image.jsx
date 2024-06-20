import React from "react";
import Wrapper from "../assets/wrappers/Image";

const Image = ({ src, bg }) => {
  return (
    <Wrapper>
      <div className={`image ${bg ? "background" : ""}`}>
        <img src={src} />
      </div>
    </Wrapper>
  );
};

export default Image;
