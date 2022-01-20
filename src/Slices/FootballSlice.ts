import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { INews, IComment, ISnackbarStatus, INewsINIT_STATE, SnackBarSeverity } from "../Types/NewsTypes";
import { API, SPORTMONKSAPI } from '../Helpers/constants';
import axios from 'axios';
import { getTimeInterval } from "../Helpers/functions";

const token = process.env.REACT_APP_SPORTMONKSTOKEN


const initialState:any = {
  coutries: [],
  loading: false,
  error: ''

}

export const getCountries = createAsyncThunk('getCountries', async (_, {rejectWithValue}) => {
  try {
    console.log(token)
    const response = await axios.get(`${SPORTMONKSAPI}/countries?api_token=${token}`);
    console.log(response)
    if(response.status >= 400){
      throw Error(`Error ${response.status} occured; ${response.statusText}`)
    } else return response.data;
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getFixturesForAWeek = createAsyncThunk('getFixturesForAWeek', async function (_, ...rest) {
  console.log(rest);
  const {today, ago} = getTimeInterval();
  try {
    const response = await axios.get(`${SPORTMONKSAPI}/fixtures/between/${ago}/${today}?api_token=${token}`);
  } catch (error) {
    // return rejectWithValue(error)
  }
})

export const sportMonks = createSlice({
  name: 'sportMonks',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getCountries.pending, (state) => {state.loading = true;})
    builder.addCase(getCountries.rejected, (state, action) => {state.loading = false; state.news = []; state.error = action.payload})
    builder.addCase(getCountries.fulfilled, (state, action) => {state.loading = false; state.news = action.payload;})
  }
});

export const store = configureStore({
  reducer: sportMonks.reducer,
  middleware: (getDefaultMiddleware) =>  getDefaultMiddleware()
})


console.log('qweqweqwe')
// export const {  } = sportMonks.actions;