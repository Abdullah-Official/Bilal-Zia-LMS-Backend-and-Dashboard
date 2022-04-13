import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch3, fetch2 } from "../app/helpers/fetch";
import { BASE_URL } from "../constants/api";

const initialState = [];

export const createQuiz = createAsyncThunk("createquiz", async (body) => {
  const result = await fetch2(`/createquestion/${body.topicId}`, body);
  return result;
});

export const fetchQuestions = createAsyncThunk("fetchquestions", async () => {
  const result = await fetch3(`/getallquestions`, "get");
  return result;
});


export const deleteQuestion = createAsyncThunk("deletequestion", async (body) => {
  const result = await fetch3(`/deletequestion/${body}`, "delete");
  return result;
});

const quizReducer = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
  extraReducers: {
    [createQuiz.fulfilled]: (state, { payload: { message } }) => {
      if (message) {
        state.push(message);
      }
    },
    [fetchQuestions.fulfilled]: (state, action) => {
      return action.payload.message;
    },
    [deleteQuestion.fulfilled]: (state, action) => {
      const removeQuestion = state.filter(
        (item) => item._id != action.payload.message._id
      );
      return removeQuestion;
    },
  },
});

export default quizReducer.reducer;
