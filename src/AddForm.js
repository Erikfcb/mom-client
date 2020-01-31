import React, { useState, useCallback, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Jumbotron } from "reactstrap";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import axios from "axios";

import config from "./config";

const AddForm = () => {
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [dayOff, setDayOff] = useState(false);
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());

  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("token");
    !token && history.push("/");
  }, [history]);
  const handleAdd = useCallback(() => {
    const data = {
      firstName,
      lastName,
      id,
      phone,
      description,
      dayOff,
      dates: {
        from,
        to
      }
    };

    const token = localStorage.getItem("token");

    axios({
      method: "POST",
      url: config.serverUrl + "/add",
      headers: {
        authorization: token
      },
      data
    }).then(res => {
      history.push("/home");
    });
  }, [to, from, dayOff, description, phone, id, lastName, firstName, history]);

  return (
    <Jumbotron>
      <CustomForm>
        <HebrewFormGroup>
          <Label for="firstName">שם פרטי</Label>
          <HebrewInput
            direction="RTL"
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={e => setFirst(e.target.value)}
          />
        </HebrewFormGroup>
        <HebrewFormGroup>
          <Label for="lastName">שם משפחה</Label>
          <HebrewInput
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={e => setLast(e.target.value)}
          />
        </HebrewFormGroup>
        <HebrewFormGroup>
          <Label for="phone">טלפון</Label>
          <HebrewInput
            type="text"
            name="phone"
            id="phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </HebrewFormGroup>
        <HebrewFormGroup>
          <Label for="id">ת.ז.</Label>
          <HebrewInput
            type="text"
            name="id"
            id="id"
            onChange={e => setId(e.target.value)}
            value={id}
          />
        </HebrewFormGroup>
        <HebrewFormGroup>
          <Label for="description">הוסף תיאור</Label>
          <HebrewInput
            type="textarea"
            name="description"
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </HebrewFormGroup>
        <HebrewFormGroup>
          :מ
          <DatePicker
            dateFormat="d MMMM, yyyy h:mm aa"
            showTimeSelect
            selected={from}
            customInput={<DateInput />}
            onChange={date => setFrom(date)}
          />
        </HebrewFormGroup>
        <HebrewFormGroup>
          :עד
          <DatePicker
            style={{ width: "100%" }}
            dateFormat="d MMMM, yyyy h:mm aa"
            showTimeSelect
            selected={to}
            customInput={<DateInput />}
            onChange={date => setTo(date)}
          />
        </HebrewFormGroup>

        <HebrewFormGroup check>
          <Label check>
            <Input
              type="checkbox"
              value={dayOff}
              onChange={() => setDayOff(!dayOff)}
            />
            סמן כחופש
          </Label>
        </HebrewFormGroup>

        <HebrewButton
          color="primary"
          className="float-right"
          onClick={handleAdd}
        >
          הוסף
        </HebrewButton>
      </CustomForm>
    </Jumbotron>
  );
};

export default AddForm;

const HebrewInput = styled(Input)`
  direction: rtl;
`;
const DateInput = styled(Input)`
  width: 300px;
`;
const HebrewButton = styled(Button)`
  margin-top: 20px;
  float: right;
`;
const HebrewFormGroup = styled(FormGroup)`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
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
