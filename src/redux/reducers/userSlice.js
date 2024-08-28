import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  allUsers: [],
  checkUser: {},
  user: {},
  userData: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },

    checkUserAdmin(state, action) {
      state.checkUser = action.payload;
    },
    updateUser(state, action) {
      const updatedUser = action.payload;
      state.checkUser = updatedUser;
    },

    getAllUsers(state, action) {
      state.allUsers = action.payload;
      state.users = action.payload;
    },

    setUserData(state, action) {
      state.userData = action.payload;
    },
  },
});

export const {
  updateUser,
  setUser,
  checkUserExists,
  checkUserAdmin,
  getAllUsers,
  setUserData,
} = userSlice.actions;

export default userSlice.reducer;
