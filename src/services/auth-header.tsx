export default function authHeader() {
  const userFromLocalStorage = localStorage.getItem("user") as string;
  const user = JSON.parse(userFromLocalStorage);

  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}
