import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch3, fetch2 } from "../app/helpers/fetch";
import { BASE_URL } from "../constants/api";

const initialState = [];

export const createChapter = createAsyncThunk("createclass", async (body) => {
  const result = await fetch2(`/createchapter/${body.classId}`, body);
  return result;
});
export const fetchChapters = createAsyncThunk("fetchchapters", async () => {
  const result = await fetch3(`/getallchapters`, "get");
  return result;
});
export const deleteChapter = createAsyncThunk("deletechapter", async (body) => {
  const result = await fetch3(`/deletechapter/${body}`, "delete");
  return result;
});

const chapterReducer = createSlice({
  name: "chapters",
  initialState,
  reducers: {},
  extraReducers: {
    [createChapter.fulfilled]: (state, { payload: { message } }) => {
      if (message) {
        state.push(message);
      }
    },
    [fetchChapters.fulfilled]: (state, action) => {
      return action.payload.message;
    },
    [deleteChapter.fulfilled]: (state, action) => {
      const removeChapter = state.filter(
        (item) => item._id != action.payload.message._id
      );
      return [...state, removeChapter];
    },
  },
});

export default chapterReducer.reducer;
