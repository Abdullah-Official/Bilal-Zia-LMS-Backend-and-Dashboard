import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch3, fetch2 } from "../app/helpers/fetch";
import { BASE_URL } from "../constants/api";

const initialState = [];

// export const createQuiz = createAsyncThunk("createquiz", async (body) => {
//   const result = await fetch2(`${BASE_URL}createquestion/${body.topicId}`, body);
//   return result;
// });

export const fetchUsers = createAsyncThunk("fetchusers", async () => {
  const result = await fetch3(`/getallusers`, "get");
  return result;
});


export const deleteUser = createAsyncThunk("deleteuser", async (body) => {
  const result = await fetch3(`/deleteuser/${body}`, "delete");
  return result;
});

export const updateUserStatus = createAsyncThunk("approveuser", async (body) => {
  const result = await fetch3(`/approveuser/${body}`, "put");
  return result;
});

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // [createQuiz.fulfilled]: (state, { payload: { message } }) => {
    //   if (message) {
    //     state.push(message);
    //   }
    // },
    [fetchUsers.fulfilled]: (state, action) => {
      return action.payload.message;
    },
    [deleteUser.fulfilled]: (state, action) => {
      const removeUser = state.filter(
        (item) => item._id != action.payload.message._id
      );
      return removeUser;
    },
    [updateUserStatus.fulfilled]: (state, action) => {
      const updateUser = state.filter(
        (status) => status._id === action.payload._id ? action.payload: status
      );
      return updateUser;
    },
  },
});

export default userReducer.reducer;
