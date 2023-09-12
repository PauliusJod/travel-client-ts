import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import {
  LoginHandler,
  LogoutHandler,
  GetCurrentUserToken,
} from "../services/authservice";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Col,
  Form,
  InputGroup,
  Row,
  Container,
  Card,
} from "react-bootstrap";
import axios from "axios";

const alertStyle = { fontSize: "14px", padding: "5px" };

export default function Login() {
  const [validated, setValidated] = useState(false);
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>("");
  const [rulesCheck, setRulesCheck] = useState<boolean>(false);
  const [isErrorMessageEnabled, setIsErrorMessageEnabled] =
    useState<boolean>(false);

  let navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    const response = await LoginHandler(username, password);
    console.log(response.status);
    if (response.status !== 200) {
      setLoginErrorMessage(response.response);
      return;
    }
    navigate("/profile");
    window.location.reload();
    return;
  };

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      handleLogin(usernameInput, passwordInput);
      setValidated(true);
    }
  };
  return (
    <Container>
      <Card style={{ width: "50%" }}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Row} controlId="validationCustomUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  onChange={(e) => setUsernameInput(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please type in your username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Row} controlId="validationUserPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Password"
                  aria-describedby="inputGroupPrepend"
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="validationRules">
            <Form.Check
              id="check-rules"
              style={{ paddingTop: "5px", paddingBottom: "5px" }}
            >
              <Form.Check.Input
                type="checkbox"
                required
                onChange={() => {
                  setRulesCheck(!rulesCheck);
                }}
              />
              <Form.Check.Label
                style={{
                  margin: "auto 0px auto",
                }}
              >
                Agree to terms and conditions
              </Form.Check.Label>
            </Form.Check>
            {rulesCheck && isErrorMessageEnabled ? (
              <></>
            ) : isErrorMessageEnabled ? (
              <Alert style={alertStyle} variant="danger">
                You must agree before submitting.
              </Alert>
            ) : (
              <></>
            )}
            <Form.Control.Feedback type="invalid">
              sasdadssa
            </Form.Control.Feedback>
          </Form.Group>
          {loginErrorMessage.length > 0 ? (
            <Alert style={alertStyle} variant="warning">
              {loginErrorMessage}
            </Alert>
          ) : (
            <></>
          )}
          <Button type="submit" onClick={() => setIsErrorMessageEnabled(true)}>
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
