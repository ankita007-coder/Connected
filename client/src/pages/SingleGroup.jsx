import React from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../assets/wrappers/SingleGroup";
import { GroupAside, Image, Navigation } from "../components";
import cover from "../assets/images/bg.jpg";
const SingleGroup = () => {
  const { id } = useParams();

  return (
    <>
      <Navigation />
      <Wrapper>
        <div className="outlet">
          <Image src={cover} bg={true} />
        </div>
        <div className="aside">
          <GroupAside id={id} />
        </div>
      </Wrapper>
    </>
  );
};

export default SingleGroup;
