import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch3, fetch2 } from "../app/helpers/fetch";
import { BASE_URL } from "../constants/api";

const initialState = [];

export const createNotification = createAsyncThunk("createnotification", async (body) => {
  const result = await fetch2(`/createnotification`, body);
  return result;
});

export const fetchNotifications = createAsyncThunk("fetchnotifications", async () => {
  const result = await fetch3(`/getnotifications`, "get");
  return result;
});

export const deleteNotification = createAsyncThunk("deleteNotification", async (body) => {
  const result = await fetch3(
    `/deletenotification/${body}`,
    "delete"
  );
  return result;
});

const classRequestReducer = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: {
    [createNotification.fulfilled]: (state, { payload: { message } }) => {
      if (message) {
        state.push(message);
      }
    },
    [fetchNotifications.fulfilled]: (state, action) => {
      return action.payload.message;
    },
    [deleteNotification.fulfilled]: (state, action) => {
      const removeNotification = state.filter(
        (item) => item._id != action.payload.message._id
      );
      return removeNotification;
    },
  },
});

export default classRequestReducer.reducer;
