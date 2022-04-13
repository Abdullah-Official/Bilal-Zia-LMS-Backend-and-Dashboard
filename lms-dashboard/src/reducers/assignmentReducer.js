import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch3, fetch2 } from "../app/helpers/fetch";
import { BASE_URL } from "../constants/api";

const initialState = [];

export const createAssignment = createAsyncThunk("createAssignment", async (body) => {
  const result = await fetch2(`/createassignment/${body.topicId}`, body);
  return result;
});

export const fetchAssignment = createAsyncThunk("fetchassignment", async () => {
  const result = await fetch3(`/getallassignments`, "get");
  return result;
});


export const deleteAssignment = createAsyncThunk("deleteassignment", async (body) => {
  const result = await fetch3(`/deleteassignment/${body}`, "delete");
  return result;
});

const assignmentReducer = createSlice({
  name: "assignment",
  initialState,
  reducers: {},
  extraReducers: {
    [createAssignment.fulfilled]: (state, { payload: { message } }) => {
      if (message) {
        state.push(message);
      }
    },
    [fetchAssignment.fulfilled]: (state, action) => {
      return action.payload.message;
    },
    [deleteAssignment.fulfilled]: (state, action) => {
      const removeQuestion = state.filter(
        (item) => item._id != action.payload.message._id
      );
      return removeQuestion;
    },
  },
});

export default assignmentReducer.reducer;
