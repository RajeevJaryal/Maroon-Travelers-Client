import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../api/authApi";

const LS_KEY = "userAuth";

export const signupUser = createAsyncThunk(
  "userAuth/signup",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await authApi.post("/accounts:signUp", {
        email,
        password,
        returnSecureToken: true,
      });

      const payload = {
        email: res.data.email,
        idToken: res.data.idToken,
        refreshToken: res.data.refreshToken,
        localId: res.data.localId,
      };

      localStorage.setItem(LS_KEY, JSON.stringify(payload));
      return payload;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error?.message || "Signup failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "userAuth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await authApi.post("/accounts:signInWithPassword", {
        email,
        password,
        returnSecureToken: true,
      });

      const payload = {
        email: res.data.email,
        idToken: res.data.idToken,
        refreshToken: res.data.refreshToken,
        localId: res.data.localId,
      };

      localStorage.setItem(LS_KEY, JSON.stringify(payload));
      return payload;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error?.message || "Login failed");
    }
  }
);

const initialState = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem(LS_KEY));
    if (saved?.idToken) {
      return { ...saved, loading: false, error: null };
    }
  } catch {}
  return { email: null, idToken: null, refreshToken: null, localId: null, loading: false, error: null };
})();

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.email = null;
      state.idToken = null;
      state.refreshToken = null;
      state.localId = null;
      state.error = null;
      localStorage.removeItem(LS_KEY);
    },
    clearUserAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser, clearUserAuthError } = userAuthSlice.actions;
export default userAuthSlice.reducer;
