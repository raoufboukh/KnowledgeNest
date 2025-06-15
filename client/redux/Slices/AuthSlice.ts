import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/check");
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "/auth/register",
  async (
    data: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/auth/register", data);
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/logout");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleSuccess = createAsyncThunk(
  "auth/google/success",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/google/success");
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleFailed = createAsyncThunk(
  "auth/google/failed",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/google/failed");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (
    data: { name: string; email: string; image: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put("/auth/update", data);
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  isUpdating: false,
  isChecking: false,
  isSignInUp: false,
  isLogginIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isChecking = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isChecking = false;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isChecking = false;
      })
      .addCase(login.pending, (state) => {
        state.isLogginIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLogginIn = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLogginIn = false;
      })
      .addCase(register.pending, (state) => {
        state.isSignInUp = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isSignInUp = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.isSignInUp = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLogginIn = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLogginIn = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLogginIn = false;
      })
      .addCase(googleSuccess.pending, (state) => {
        state.isLogginIn = true;
      })
      .addCase(googleSuccess.fulfilled, (state, action) => {
        state.isLogginIn = false;
        state.user = action.payload;
      })
      .addCase(googleSuccess.rejected, (state) => {
        state.isLogginIn = false;
      })
      .addCase(googleFailed.pending, (state) => {
        state.isLogginIn = true;
      })
      .addCase(googleFailed.fulfilled, (state) => {
        state.isLogginIn = false;
      })
      .addCase(googleFailed.rejected, (state) => {
        state.isLogginIn = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.isUpdating = false;
      });
  },
});

export default authSlice.reducer;
