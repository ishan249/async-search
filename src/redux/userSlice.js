import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action to fetch users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async (d) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users?username=${d.name}`
  );
  return response.data;
});

// Slice
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
