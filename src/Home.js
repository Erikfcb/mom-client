import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button, Jumbotron } from "reactstrap";
import Data from "./Data";

const Home = () => (
  <Jumbotron>
    <Link to="/add">
      <HebrewButton color="primary">הוסף</HebrewButton>
    </Link>
    <Data />
  </Jumbotron>
);

export default Home;

const HebrewButton = styled(Button)`
  margin-top: 20px;
  margin-bottom: 50px;
  float: right;
`;
