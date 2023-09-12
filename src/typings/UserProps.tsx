export interface IUserRegister {
  username: string;
  password: string;
  email: string;
}
export interface IUserLogin {
  username: string;
  password: string;
  email: string;
}
export interface IChangePassword {
  username: string;
  currentPassword: string;
  newPassword: string;
}
export interface IChangeEmail {
  username: string;
  newEmail: string;
}
