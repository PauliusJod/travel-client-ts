import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  InputGroup,
  Card,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  ChangeEmailHandler,
  ChangePasswordHandler,
  GetCurrentUserName,
} from "../../services/authservice";
import { IChangePassword, IChangeEmail } from "../../typings/UserProps";

export default function HandlingProfileSection() {
  const [currentPasswordInput, setCurrentPasswordInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [passwordRepeatInput, setPasswordRepeatInput] = useState<string>("");
  const [newEmailInput, setNewEmailInput] = useState<string>("");
  const [newEmailRepeatInput, setNewEmailRepeatInput] = useState<string>("");
  const [isPasswordChangeEnable, setPasswordChangeEnable] =
    useState<boolean>(false);
  const [isEmailChangeEnable, setEmailChangeEnable] = useState<boolean>(false);
  const [isPasswordChangeError, setPasswordChangeError] =
    useState<boolean>(false);
  const [isEmailChangeError, setEmailChangeError] = useState<boolean>(false);

  const handlePasswordChangeValues = (e: any) => {
    e.preventDefault();
    if (
      passwordInput !== passwordRepeatInput ||
      passwordInput.length < 6 ||
      passwordRepeatInput.length < 6
    ) {
      setPasswordChangeError(true);
      e.stopPropagation();
    } else {
      const userName: string = GetCurrentUserName();
      const props: IChangePassword = {
        username: userName,
        currentPassword: currentPasswordInput,
        newPassword: passwordInput,
      };
      ChangePasswordHandler(props);
      setPasswordChangeError(false);
      //   window.location.reload();
    }
  };
  const handleEmailChangeValues = (e: any) => {
    e.preventDefault();
    if (
      newEmailInput !== newEmailRepeatInput ||
      newEmailInput.length < 5 ||
      newEmailRepeatInput.length < 5
    ) {
      setEmailChangeError(true);
      e.stopPropagation();
    } else {
      const userName: string = GetCurrentUserName();
      const props: IChangeEmail = {
        username: userName,
        newEmail: newEmailInput,
      };
      ChangeEmailHandler(props);
      setEmailChangeError(false);
      //   window.location.reload();
    }
  };
  return (
    <Container>
      {/* Password change */}
      <Row>
        <Col>
          {!isPasswordChangeEnable ? (
            <Button
              variant="dark"
              onClick={() => setPasswordChangeEnable(!isPasswordChangeEnable)}
            >
              Change password
            </Button>
          ) : (
            <></>
          )}
        </Col>
        <Col>
          {!isEmailChangeEnable ? (
            <Button
              variant="dark"
              onClick={() => setEmailChangeEnable(!isEmailChangeEnable)}
            >
              Change email
            </Button>
          ) : (
            <></>
          )}
        </Col>
        {isPasswordChangeEnable ? (
          <Form style={{ marginTop: "20px", marginBottom: "20px" }}>
            <Row>
              <Col sm={10}>
                <Form.Label as="h5">Change your password</Form.Label>
              </Col>
              <Col sm={2} className="d-flex justify-content-end">
                <Button
                  className="mb-1"
                  variant="light"
                  onClick={() =>
                    setPasswordChangeEnable(!isPasswordChangeEnable)
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              </Col>
            </Row>
            <Form.Group
              className="mb-1"
              as={Row}
              controlId="validationCurrentPassword"
            >
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Current Password"
                  aria-describedby="inputGroupPrepend"
                  onChange={(e) => setCurrentPasswordInput(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group
              className="mb-1"
              as={Row}
              controlId="validationNewPassword"
            >
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="New Password"
                  aria-describedby="inputGroupPrepend"
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group
              className="mb-1"
              as={Row}
              controlId="validationNewPasswordRepeat"
            >
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="New Password repeat"
                  aria-describedby="inputGroupPrepend"
                  onChange={(e) => setPasswordRepeatInput(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>
            {isPasswordChangeError ? (
              <p>Password values do not match!</p>
            ) : (
              <></>
            )}
            <Button
              style={{ marginTop: "5px" }}
              type="submit"
              onClick={(e) => handlePasswordChangeValues(e)}
            >
              Submit
            </Button>
          </Form>
        ) : (
          <></>
        )}
      </Row>
      {/* Email change */}
      <Row>
        {isEmailChangeEnable ? (
          <Form style={{ marginTop: "20px", marginBottom: "20px" }}>
            <Row>
              <Col sm={10}>
                <Form.Label as="h5">Change your email</Form.Label>
              </Col>
              <Col sm={2} className="d-flex justify-content-end">
                <Button
                  className="mb-1"
                  variant="light"
                  onClick={() => setEmailChangeEnable(!isEmailChangeEnable)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              </Col>
            </Row>
            <Form.Group
              className="mb-1"
              as={Row}
              controlId="validationNewEmail"
            >
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="New Email"
                  aria-describedby="inputGroupPrepend"
                  onChange={(e) => setNewEmailInput(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group
              className="mb-1"
              as={Row}
              controlId="validationNewEmailRepeat"
            >
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="New Email repeat"
                  aria-describedby="inputGroupPrepend"
                  onChange={(e) => setNewEmailRepeatInput(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>
            {isEmailChangeError ? <p>Email fields do not match!</p> : <></>}
            <Button
              style={{ marginTop: "5px" }}
              type="submit"
              onClick={(e) => handleEmailChangeValues(e)}
            >
              Submit
            </Button>
          </Form>
        ) : (
          <></>
        )}
      </Row>
    </Container>
  );
}
