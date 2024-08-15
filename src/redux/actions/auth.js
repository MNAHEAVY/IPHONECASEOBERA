import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  loginUser,
  registerUser,
  googleLogin,
  setLoading,
  setError,
} from "../reducers/authSlice";

const API_BASE_URL = "https://iphonecaseoberab-production.up.railway.app";
// const API_BASE_URL = "http://localhost:3001";

export const loginUserAction = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      const { token, user } = response.data;
      dispatch(loginUser({ token, user }));
      console.log(user);
      localStorage.setItem("token", token);
      toast.success("¡Sesion iniciada!");
    } catch (err) {
      dispatch(setError(err.response.data));
      toast.error("¡Error inicio!");
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const registerUserAction = (userData) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
      const { token, user } = response.data;
      dispatch(registerUser({ token, user }));
      console.log(user);
      localStorage.setItem("token", token);
    } catch (err) {
      dispatch(setError(err.response.data));
      toast.error("¡Error de registro!");
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const googleLoginAction = (token) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/google`, { token });
      const { jwtToken, user } = response.data;
      dispatch(googleLogin({ token: jwtToken, user }));
      localStorage.setItem("token", jwtToken);
    } catch (err) {
      dispatch(setError(err.response.data));
    } finally {
      dispatch(setLoading(false));
    }
  };
};
