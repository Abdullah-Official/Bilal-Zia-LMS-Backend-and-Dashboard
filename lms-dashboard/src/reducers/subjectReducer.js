import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch3, fetch2 } from "../app/helpers/fetch";
import { BASE_URL } from "../constants/api";

const initialState = [];

export const createSubject = createAsyncThunk("createSubject", async (body) => {
  const result = await fetch2(`/createsubject/${body.classId}`, body);
  return result;
});
export const deleteSubject = createAsyncThunk("deleteSubject", async (body) => {
  const result = await fetch3(`/deletesubject/${body}`, "delete");
  return result;
});
export const fetchSubjects = createAsyncThunk("fetchSubjects", async () => {
  const result = await fetch3(`/getsubjects`, "get");
  return result;
});

const subjectReducer = createSlice({
  name: "subjects",
  initialState,
  reducers: {},
  extraReducers: {
    [createSubject.fulfilled]: (state, { payload: { message } }) => {
      if (message) {
        state.push(message);
        console.log(message)
        alert("New subject has been created");
      }
    },
    [deleteSubject.fulfilled]: (state, action) => {
      const removeSubject = state.filter(
        (item) => item._id != action.payload.message._id
      );
      return removeSubject;
    },
    [fetchSubjects.fulfilled]: (state, action) => {
      return action.payload.message;
    },
  },
});

export default subjectReducer.reducer;
