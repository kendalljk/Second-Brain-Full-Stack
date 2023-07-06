import React from "react";
import cogwheel from "../icons/cogwheel.png";
import { Container } from "react-bootstrap";

const Homepage = () => {
  return (
    <Container
      className="homepage-background"
      fluid="true"
    >
      <h2 className="webpage-title text-center">
        Sec
        <img
          src={cogwheel}
          alt="cogwheel"
          className="spin-animation"
          style={{
            height: "3rem",
            marginRight: "2%",
            marginBottom: "2%",
            textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
          }}
        />
        nd Brain
      </h2>
    </Container>
  );
};

export default Homepage;
