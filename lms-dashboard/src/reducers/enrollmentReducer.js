import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch3, fetch4 } from "../app/helpers/fetch";

const initialState = [];
// const messageState ;

export const fetchEnrollments = createAsyncThunk(
  "fetchenrollments",
  async () => {
    const result = await fetch3(`/getallenrollments`, "get");
    return result;
  }
);

export const deleteEnrollment = createAsyncThunk("deleteenrollment", async (body) => {
  const result = await fetch3(
    `/deleteenrollment/${body}`,
    "delete"
  );
  return result;
});

const classRequestReducer = createSlice({
  name: "enrollmentss",
  initialState,
  //   messageState,
  reducers: {},
  extraReducers: {
    [fetchEnrollments.fulfilled]: (state, action) => {
      return action.payload.message;
    },
    [deleteEnrollment.fulfilled]: (state, action) => {
      const removeEnrollment = state.filter(
        (item) => item._id != action.payload.message._id
      );
      return removeEnrollment;
    },
  },
});

export default classRequestReducer.reducer;
