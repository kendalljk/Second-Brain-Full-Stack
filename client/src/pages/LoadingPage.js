import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cogwheel from "../icons/cogwheel.png";
import skull from "../icons/skull.png";

const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container
      className="bg-dark d-flex justify-content-center align-items-top"
      fluid="true"
      style={{
        width: "100%",
        height: "100%",
        padding: "0",
      }}
    >
      <div style={{}}>
        <img
          src={cogwheel}
          alt="spinning cogwheel"
          className="spin-animation"
          style={{
            width: "100%",
            height: "14%",
            marginTop: "320%",
          }}
        />
        <img
          src={skull}
          alt="skull"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "25%",
          }}
        />
      </div>
    </Container>
  );
};

export default LoadingPage;
