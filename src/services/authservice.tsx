import axios from "axios";
import Constants from "../utils/Constants";
import { IChangeEmail, IChangePassword } from "../typings/UserProps";
import jwt_decode from "jwt-decode";

export async function LoginHandler(username: string, password: string) {
  return axios
    .post(Constants.API_URL_LOGIN, {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      // console.log(response.data.accessToken);
      return response;
    })
    .catch((err) => {
      console.log(err);
      return err.request;
    });
}

export function LogoutHandler() {
  localStorage.removeItem("user");
}

export async function RegisterHandler(username: string, email: string, password: string) {
  return axios.post(Constants.API_URL_REGISTER, {
    username,
    email,
    password,
  });
}

export function GetCurrentUserToken() {
  const userFromLocalStorage = localStorage.getItem("user") as string;
  return JSON.parse(userFromLocalStorage);
}
export function GetCurrentUserName() {
  const userFromLocalStorage = localStorage.getItem("user") as string;
  const user = JSON.parse(userFromLocalStorage);
  const userInfo = jwt_decode(user.accessToken) as any;

  const userName = userInfo["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

  return userName as string;
}
export function GetCurrentUserId() {
  const userFromLocalStorage = localStorage.getItem("user") as string;
  const user = JSON.parse(userFromLocalStorage);
  const userInfo = jwt_decode(user.accessToken) as any;
  return userInfo.sub as string;
}
export async function ChangeEmailHandler(props: IChangeEmail) {
  const { username, newEmail } = props;
  // console.log("username: ", username);
  // console.log("newEmail: ", newEmail);
  return axios
    .put(Constants.API_URL_UPDATE_EMAIL, {
      UserName: username,
      NewEmail: newEmail,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    })
    .catch((err) => {
      console.log("err: ", err.response.data);
      console.log("err: ", err.response.status);
    });
}

export async function ChangePasswordHandler(props: IChangePassword) {
  const { username, currentPassword, newPassword } = props;
  // console.log("username: ", username);
  // console.log("currentPassword: ", currentPassword);
  // console.log("newPassword: ", newPassword);
  return await axios
    .put(Constants.API_URL_UPDATE_PASSWORD, {
      UserName: username,
      CurrentPassword: currentPassword,
      NewPassword: newPassword,
    })
    .then((response) => {
      console.log("response.data.status: ", response.status);
      if (response.status === 200) {
        LogoutHandler();
      }
      return response.data;
    })
    .catch(() => {
      return null;
    });
}
