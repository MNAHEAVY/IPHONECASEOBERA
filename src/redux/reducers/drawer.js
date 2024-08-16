import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawer: true,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    setDrawer: (state, action) => {
      state.drawer = action.payload;
    },
  },
});

export const { setDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
