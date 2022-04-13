import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch3, fetch2 } from "../app/helpers/fetch";
import {BASE_URL} from '../constants/api';

const initialState = [];

export const createClass = createAsyncThunk('createclass',
    async (body) => {
        const result = await fetch2(`/createclass`, body)
        return result
    }
)

export const fetchClasses = createAsyncThunk("fetchclasses", async () => {
  const result = await fetch3(`/getclasses`, "get");
  return result;
});

export const deleteClass = createAsyncThunk("/deleteClass", async (body) => {
  const result = await fetch3(
    `/deleteclass/${body}`,
    "delete"
  );
  return result;
});

const classesReducer = createSlice({
  name: "classes",
  initialState,
  reducers: {},
  extraReducers: {
     [createClass.fulfilled] : (state,{payload:{message}}) => {
        if(message){
            state.push(message)
        }
     },
    [fetchClasses.fulfilled]: (state, action) => {
      return action.payload.message;
    },
    [deleteClass.fulfilled]: (state, action) => {
      const removeClass = state.filter(
        (item) => item._id != action.payload.message._id
      );
      return removeClass;
    },
  },
});

export default classesReducer.reducer;
