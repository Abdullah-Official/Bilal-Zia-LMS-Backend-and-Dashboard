import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch3, fetch4 } from "../app/helpers/fetch";

const initialState = {
  message: "",
};

export const approveEnrollment = createAsyncThunk(
  "approveEnrollment",
  async (body) => {
    const result = await fetch3(
      `/approveclassrequests/${body.a}/${body.b}`,
      "put"
    );
    return result;
  }
);

const approveEnrollmentReducer = createSlice({
  name: "notifications",
  initialState,
  //   messageState,
  reducers: {},
  extraReducers: {
    [approveEnrollment.fulfilled]: (state, action) => {
      state.message = action.payload.message;
    },
    [approveEnrollment.pending]: (state, action) => {
      state.message = "pending";
    },
    [approveEnrollment.rejected]: (state, action) => {
      state.message = "Something, went wrong .. Maybe class or students is no longer available";
    },
  },
});

export default approveEnrollmentReducer.reducer;
