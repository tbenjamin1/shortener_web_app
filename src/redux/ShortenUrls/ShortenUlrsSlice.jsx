import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
const savedUser = localStorage.getItem("loggedinUser");
// Parse user only if it exists in localStorage
const initialUser = savedUser ? JSON.parse(savedUser) : null;


export const fetchShortenedUrls = createAsyncThunk(
  "urls/fetchShortenedUrls",
  async (_, { rejectWithValue }) => {
   
    const accessToken = initialUser ?initialUser.accessToken : null;
    console.log("accessToken:", accessToken);

    try {
      const response = await axios.get(` ${apiBaseUrl}/share/urls`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,  
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
// Log out function
const handleLogout = async () => {
  const accessToken = initialUser ?initialUser.accessToken : null;
  try {
    // Call the logout API
    const response = await axios.post(
      `${apiBaseUrl}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 200) {
      window.location.replace("/login");
    } else {
      console.error('Logout failed:', response.data);
    }
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

const initialState = {
  isLoading: false,
  savedUser: initialUser,
  shortenUrlList: [], 
};

const shortenUrlSlice = createSlice({
  name: "shortenUrl",
  initialState,
  reducers: {
    addShortenedUrl: (state, action) => {
      state.shortenUrlList.push(action.payload);
    },
    clearShortenedUrls: (state) => {
      state.shortenUrlList = [];
    },

  
    logoutUser: (state) => {
      handleLogout();
      state.user = null;
      localStorage.removeItem("loggedinUser");
    
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShortenedUrls.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchShortenedUrls.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shortenUrlList = action.payload;
      })
      .addCase(fetchShortenedUrls.rejected, (state, action) => {
        state.isLoading = false;
        console.error("Fetching shortened URLs failed:", action.payload);
      });
  },
});

// Selectors
export const getShortenedUrls = (state) => state.shortenUrl.shortenUrlList;
export const getLoadingState = (state) => state.shortenUrl.isLoading;
export const getLoggedInUser = (state) => state.shortenUrl.savedUser;

// Export actions & reducer
export const { addShortenedUrl, clearShortenedUrls } = shortenUrlSlice.actions;
export const { setUser, logoutUser } = shortenUrlSlice.actions;

export default shortenUrlSlice.reducer;

