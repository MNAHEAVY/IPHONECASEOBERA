import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { checkUserAdmin, getAllUsers, getUser, updateUser } from "../reducers/userSlice";

const API_BASE_URL = "https://iphonecaseoberab-production.up.railway.app";
// const API_BASE_URL = "http://localhost:3001";

//User Actions

export const checkUserExistsAction = (userData) => {
  return async function () {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, userData);
      // Handle the response here if needed
      console.log("Response:", response.data);
    } catch (error) {
      // Handle the error here
      console.error("Error:", error.message);
    }
  };
};

export const checkUserAdminAction = (mail) => {
  return async function (dispatch) {
    const getUser = await axios.get(`${API_BASE_URL}/users?email=${mail}`);
    console.log(getUser);
    dispatch(checkUserAdmin(getUser.data));
  };
};

export const updateUserAction = (updatedUserData) => {
  return async function (dispatch) {
    const updatedUserResponse = await axios.put(
      `${API_BASE_URL}/useredit/${updatedUserData.id}`,
      updatedUserData
    );
    if (updatedUserResponse.status === 200) {
      const updatedUser = updatedUserResponse.data;

      dispatch(updateUser(updatedUser));

      toast.success("User updated successfully");
    } else {
      toast.error("Failed to update user");
    }
  };
};

export const getAllUsersAction = () => {
  return async function (dispatch) {
    const users = await axios(`${API_BASE_URL}/allusers`);
    return dispatch(getAllUsers(users.data));
  };
};

export const getUserAction = (email) => {
  return async function (dispatch) {
    const user = await axios.get(`${API_BASE_URL}/users?email=${email}`);
    console.log(user);
    dispatch(getUser(user.data));
  };
};
