import React, { useEffect, useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Form, FormGroup, Label, Input, Jumbotron, Button } from "reactstrap";
import config from "./config";
import DataTable from "./DataTable";

const Home = () => {
  const [data, setData] = useState([]);

  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [dayOff, setDayOff] = useState(false);

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
      setFiltered(res.data);
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
      setFiltered(res.data);
    });
  }, [history]);

  return (
    <Jumbotron>
      <Link to="/add">
        <HebrewButton color="primary">הוסף</HebrewButton>
      </Link>
      <CustomForm>
        <HebrewFormGroup>
          <Label for="search">:חיפוש</Label>
          <HebrewInput
            type="text"
            name="search"
            id="search"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setFiltered(
                data.filter(({ firstName, lastName }) => {
                  return (
                    firstName.includes(e.target.value) ||
                    lastName.includes(e.target.value)
                  );
                })
              );
            }}
          />
        </HebrewFormGroup>
        <HebrewFormGroup>
          <Label for="dayOff">
            <Input
              type="checkbox"
              name="dayOff"
              id="dayOff"
              value={dayOff}
              onChange={e => {
                setDayOff(!dayOff);

                setFiltered(
                  data.filter(item =>
                    !dayOff ? item.dayOff === !dayOff : true
                  )
                );
              }}
            />
            :רק חופש
          </Label>
        </HebrewFormGroup>
      </CustomForm>
      <DataTable data={filtered} handleDelete={handleDelete} />
    </Jumbotron>
  );
};

export default Home;

const HebrewButton = styled(Button)`
  margin-top: 20px;
  margin-bottom: 50px;
  float: right;
`;
const HebrewInput = styled(Input)`
  direction: rtl;
`;
const HebrewFormGroup = styled(FormGroup)`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  margin-top: 20px;
`;
const CustomForm = styled(Form)`
  width: 350px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #4f4f4f;
  padding: 20px;
  border-radius: 10px;
`;
