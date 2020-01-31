import React, { useEffect, useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Button, Jumbotron } from "reactstrap";
import DataTable from "./DataTable";
import config from "./config";

const Home = () => {
  const [data, setData] = useState([]);
  const history = useHistory();

  const handleDelete = useCallback(_id => {
    const token = localStorage.getItem("token");

    axios({
      method: "POST",
      url: config.serverUrl + "/delete",
      headers: {
        authorization: token
      },
      data: {
        _id
      }
    }).then(res => {
      setData(res.data);
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    !token && history.push("/");
    axios({
      method: "GET",
      url: config.serverUrl + "/entries",
      headers: {
        authorization: token
      }
    }).then(res => {
      setData(res.data);
    });
  }, [history]);

  return (
    <Jumbotron>
      <Link to="/add">
        <HebrewButton color="primary">הוסף</HebrewButton>
      </Link>
      <DataTable data={data} handleDelete={handleDelete} />
    </Jumbotron>
  );
};

export default Home;

const HebrewButton = styled(Button)`
  margin-top: 20px;
  margin-bottom: 50px;
  float: right;
`;
