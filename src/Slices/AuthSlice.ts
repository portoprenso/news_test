import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { INews, IUsersINIT_STATE } from "../Types/NewsTypes";
import { API } from '../Helpers/constants';

const initialState: IUsersINIT_STATE = {
  currentUser: null,
  newsAuthor: null,
  loading: false,
  error: null,
  modal: false,
}

export const getAuthor = createAsyncThunk('getAuthor', async (id: string, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API}/users/${id}`);
    if (response.status >= 400) {
      throw Error(`Error ${response.status} occured; ${response.statusText}`)
    } else return response.data;
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getCurrentUser = createAsyncThunk('getCurrentUser', async (id: string, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API}/users/${id}`);
    if (response.status >= 400) {
      throw Error(`Error ${response.status} occured; ${response.statusText}`)
    } else return response.data;
  } catch (error) {
    return rejectWithValue(error)
  }
})



// export const getCurrentNews = createAsyncThunk('getCurrentNews', async (id: string, { rejectWithValue }) => {
//   try {
//     const response = await axios.get(`${API}/news/${id}`);
//     if (response.status >= 400) {
//       throw Error(`Error ${response.status} occured; ${response.statusText}`)
//     } else return response.data;
//   } catch (error) {
//     return rejectWithValue(error)
//   }
// })

export const getTags = createAsyncThunk('getTags', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API}/tags`);
    if (response.status >= 400) {
      throw Error(`Error ${response.status} occured; ${response.statusText}`)
    } else return response.data;
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const openNewsModal = createAsyncThunk('openNewsModal', async function (id, { rejectWithValue }) {
  try {
    const responseContact = await axios.get(`${API}/contacts/${id}`);
    const responseGroups = await axios.get(`${API}/groups`);
    if (responseContact.status >= 400 || responseGroups.status >= 400) throw Error();
    else return { contact: responseContact.data, tags: responseGroups.data };
  } catch (error) {
    return rejectWithValue(error)
  }
})

// export const saveUpdatedContact = createAsyncThunk('saveUpdatedContact', async (news: INews, { dispatch, rejectWithValue }) => {
//   try {
//     const response = await axios.patch(`${API}/news/${news.id}`, news);
//     if (response.status > 400) {
//       throw Error()
//     } else {
//       dispatch(openSnackbar({ text: `${news.title} updated`, severity: 'success' }))
//       return news;
//     }
//   } catch (error) {
//     dispatch(openSnackbar({ text: `${news.title} wasn't update`, severity: 'error' }))
//     return rejectWithValue(error);
//   }
// })

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuthor.pending, (state) => { state.loading = true; })
    builder.addCase(getAuthor.rejected, (state, action: any) => {state.newsAuthor = null;state.loading = false;state.error = action.payload;})
    builder.addCase(getAuthor.fulfilled, (state, action) => {
      console.log(action.payload)
      state.loading = false;
      state.newsAuthor = action.payload;
    })
    builder.addCase(getCurrentUser.pending, (state) => { state.loading = true; })
    builder.addCase(getCurrentUser.rejected, (state, action: any) => {state.currentUser = null;state.loading = false;state.error = action.payload;})
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    })
  }
});

export const store = configureStore({
  reducer: userSlice.reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

// export const { handleDrawer, openSnackbar, closeSnackbar } = userSlice.actions;