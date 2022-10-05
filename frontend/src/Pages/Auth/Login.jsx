import React from "react";
import { styled } from "@mui/material/styles";
import BackGroundLogin from "../../Assets/Image/background-login.jpg";

const Login = () => {
  return <Container>login</Container>;
};

const Container = styled("div")({
  height: "100vh",
  width: "100%",
  backgroundImage: `url(${BackGroundLogin})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
});

export default Login;
