import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch1, fetch3 } from "../app/helpers/fetch";
import { BASE_URL } from "../constants/api";

const initialState = {
  token: "",
  error: "",
  loading: false,
  teachers: [],
};

export const signinAdmin = createAsyncThunk("adminsign", async (body) => {
  const result = await fetch1(`/adminsignin`, body);
  return result;
});

export const signupAdmin = createAsyncThunk("signupAdmin", async (body) => {
  const result = await fetch1(`/adminsignup`, body);
  return result;
});

export const fetchTeachers = createAsyncThunk("teachers", async (body) => {
  const result = await fetch3(`/teachers`, "get");
  return result;
});

export const deleteTeacher = createAsyncThunk("deleteTeacher", async (body) => {
  const result = await fetch3(`/teacher/${body}`, "delete");
  return result;
});

const authReducer = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = localStorage.getItem("token");
    },
    logout: (state, action) => {
      state.token = "";
      localStorage.removeItem("token");
    },
  },
  extraReducers: {
    [fetchTeachers.fulfilled]: (state, action) => {
      const data = action.payload.message;
      state.teachers = data;
      return state;
    },
    [signinAdmin.fulfilled]: (state, action) => {
      if (action.payload.error) {
        state.error = action.payload.error;
        state.loading = false;
      } else {
        state.token = action.payload.token;
        state.loading = false;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("Teacher", action.payload.adminSubject);
      }
    },
    [signinAdmin.pending]: (state, action) => {
      state.loading = true;
    },
    [signupAdmin.pending]: (state, action) => {
      state.loading = true;
    },
    [signupAdmin.fulfilled]: (state, action) => {
      if (action.payload.error) {
        state.error = action.payload.error;
        state.loading = false;
      }
      state.loading = false;
    },
  },
  [deleteTeacher.pending]: (state, action) => {},
});

export const { addToken, logout } = authReducer.actions;

export default authReducer.reducer;
