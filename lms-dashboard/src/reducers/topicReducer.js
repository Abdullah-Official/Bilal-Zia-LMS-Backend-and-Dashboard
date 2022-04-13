import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch3, fetch2 } from "../app/helpers/fetch";
import { BASE_URL } from "../constants/api";

const initialState = [];

export const createTopic = createAsyncThunk("createtopic", async (body) => {
  const result = await fetch2(`/createtopic/${body.chapterId}`, body);
  return result;
});
export const deleteTopic = createAsyncThunk("deletetopic", async (body) => {
  const result = await fetch3(`/deletetopic/${body}`, "delete");
  return result;
});
export const fetchTopics = createAsyncThunk("fetchTopics", async () => {
  const result = await fetch3(`/getalltopics`, "get");
  return result;
});

const topicReducer = createSlice({
  name: "topics",
  initialState,
  reducers: {},
  extraReducers: {
    [createTopic.fulfilled]: (state, { payload: { message } }) => {
      if (message) {
        state.push(message);
      }
    },
    [deleteTopic.fulfilled]: (state, action) => {
      const removeTopic = state.filter(
        (item) => item._id != action.payload.message._id
      );
      return removeTopic;
    },
    [fetchTopics.fulfilled]: (state, action) => {
      return action.payload.message;
    },
  },
});

export default topicReducer.reducer;
