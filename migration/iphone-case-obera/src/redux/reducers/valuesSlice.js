import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: {},
};

const valuesSlice = createSlice({
  name: "values",
  initialState,

  reducers: {
    getValues(state, action) {
      state.values = action.payload;
    },
  },
});

export const { getValues, putVal } = valuesSlice.actions;

export default valuesSlice.reducer;
