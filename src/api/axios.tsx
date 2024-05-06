// api
import axios from "axios";

interface ParsedLoginInfoType {
  LoginAtom: any;
  LoginState: string;
}
const LoginInfo = localStorage.getItem("recoil-persist");
let { LoginAtom, LoginState } = LoginInfo && JSON.parse(LoginInfo);

let instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `${LoginAtom.accessToken}`,
  },
  withCredentials: true,
});

export default instance;
