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
  console.log("dayOff: ", dayOff);
  const [sick, setSick] = useState(false);
  console.log("sick: ", sick);

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

  useEffect(() => {
    let newData = [...data];

    if (dayOff) {
      newData = data.filter(item => item.dayOff);
    }

    if (sick) {
      newData = data.filter(item => item.sick);
    }

    if (search) {
      newData = newData.filter(({ firstName, lastName }) => {
        return firstName.includes(search) || lastName.includes(search);
      });
    }

    setFiltered(newData);
  }, [search, dayOff, sick, data]);

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
              }}
              disabled={sick}
            />
            :רק חופש
          </Label>
          <Label for="sick">
            <Input
              type="checkbox"
              name="sick"
              id="sick"
              value={sick}
              onChange={e => {
                setSick(!sick);
              }}
              disabled={dayOff}
            />
            :רק מחלה
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
