import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Jumbotron, Button } from "reactstrap";
import styled from "styled-components";
import axios from "axios";
import config from "./config";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const login = useCallback(() => {
    axios({
      method: "POST",
      url: config.serverUrl + "/login",
      data: {
        user,
        password
      }
    }).then(res => {
      res.data.token && localStorage.setItem("token", res.data.token);
      history.push("/home");
    });
  }, [user, password, history]);

  return (
    <CustomJumbo>
      <CustomForm>
        <HebrewFormGroup>
          <Label for="lastName">:שם משתמש</Label>
          <HebrewInput
            type="text"
            name="user"
            id="user"
            value={user}
            onChange={e => setUser(e.target.value)}
          />
        </HebrewFormGroup>
        <HebrewFormGroup>
          <Label for="lastName">:סיסמה</Label>
          <HebrewInput
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </HebrewFormGroup>
        <Button color="primary" onClick={login}>
          כניסה
        </Button>
      </CustomForm>
    </CustomJumbo>
  );
};

export default Login;

const HebrewInput = styled(Input)`
  direction: rtl;
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
const CustomJumbo = styled(Jumbotron)`
  height: 100vh;
`;
