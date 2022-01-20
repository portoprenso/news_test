import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { INews, IComment, ISnackbarStatus, INewsINIT_STATE, SnackBarSeverity } from "../Types/NewsTypes";
import { API } from '../Helpers/constants';
import axios from 'axios';

const initialState: INewsINIT_STATE = {
  news: [],
  readAlsoNews: [],
  currentNews: null,
  newsToEdit: null,
  comments: null,
  loading: false,
  error: null,
  modal: false,
  snackbar: false,
  snackbarStatus: {text: "", severity: "success"},
  tags: [],
  drawerOpen: false
}

export const getNews = createAsyncThunk('getNews', async (_, {rejectWithValue}) => {
  try {
    const response = await axios.get(`${API}/news`);
    if(response.status >= 400){
      throw Error(`Error ${response.status} occured; ${response.statusText}`)
    } else return response.data;
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getComments = createAsyncThunk('getComments', async (id: string | null, {rejectWithValue}) => {
  if(id === null) return [];
  try {
    const response = await axios.get(`${API}/commentaries?postId=${id}`);
    console.log(response)
    if(response.status >= 399){
      throw Error(`Error ${response.status} occured; ${response.statusText}`)
    } else return response.data;
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const postComment = createAsyncThunk('postComment', async (comment: IComment, {dispatch,rejectWithValue}) => {
  try {
    // console.log(comment)
    const response = await axios.post(`${API}/commentaries`, comment);
    if(response.status > 399){
      throw new Error()
    }
    dispatch(getComments(comment.postId))
    dispatch(openSnackbar({text: `Комментарий был успешно добавлен`, severity: SnackBarSeverity.success}))
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const deleteComment = createAsyncThunk('deleteComment', async (arg: {commentToDelete: IComment, rootCommentId: string, comments: IComment[]}, {dispatch, rejectWithValue}) => {
  const { commentToDelete, rootCommentId, comments } = arg;
  console.log(arg)
  if(commentToDelete.rootCommentId){
    const root = comments.find(i => i.id === rootCommentId);
    const copy = JSON.parse(JSON.stringify(root));
    const patchComment = (root: IComment) => {
      const idx = root.children.findIndex(e => e.id === commentToDelete.id);
      if(idx !== -1){
        if(root.children[idx].children.length){
          root.children = root.children.map(e => {
            if(e.id === commentToDelete.id) {
              e.text = 'Этот комментарий был удалён'
              return e
            };
            return e
          });
        } else {
          root.children = root.children.filter(e => e.id !== commentToDelete.id);
        }
        return
      }
      for (let i = 0; i < root.children.length; i++) {
        patchComment(root.children[i])
      }
      return
    };
    if(copy){
      patchComment(copy);
    } else {
      return rejectWithValue('Добавление ответа на комментарий было неуспешным')
    }
    try {
      const response = await axios.patch(`${API}/commentaries/${rootCommentId}`, copy);
      if(response.status > 399){
        throw new Error()
      }
      dispatch(openSnackbar({text: `Комментарий был удален`, severity: SnackBarSeverity.success}))
      dispatch(getComments(commentToDelete.postId))
    } catch (error) {
      return rejectWithValue(error)
    }
  } else {
    try {
      const response = await axios.delete(`${API}/commentaries/${commentToDelete.id}`);
      if(response.status > 399){
        throw new Error()
      }
      dispatch(openSnackbar({text: `Комментарий был удален`, severity: SnackBarSeverity.success}))
      dispatch(getComments(commentToDelete.postId))
    } catch (error) {
      return rejectWithValue(error)
    }
  }
})

export const postReply = createAsyncThunk('postReply', async (arg: {comment: IComment, rootCommentId: string, comments: IComment[]}, {dispatch,rejectWithValue}) => {
  const { comment, rootCommentId, comments } = arg;
  const root = comments.find(i => i.id === rootCommentId);
  const copy = JSON.parse(JSON.stringify(root));
  const patchComment = (root: any, child: IComment) => {
    // console.log(root.id, comment.parentId)
    if(root.id === comment.parentId) {
      try {
        root.children.push(child);
      } catch (error) {
        console.error(error)
      }
      return;
    }
    for (let i = 0; i < root.children.length; i++) {
      if (root.children[i].id === child.parentId) {
          root.children[i].children.push(child);
          break;
      } else if (root.children[i].children.length > 0) {
        patchComment(root.children[i], child);
      }
    }
  };
  if(copy){
    patchComment(copy, comment);
  } else {
    return rejectWithValue('Добавление ответа на комментарий было неуспешным')
  }
  try {
    const response = await axios.patch(`${API}/commentaries/${rootCommentId}`, copy);
    if(response.status > 399){
      throw new Error()
    }
    dispatch(getComments(comment.postId))
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getCurrentNews = createAsyncThunk('getCurrentNews', async (id: string, {rejectWithValue}) => {
  try {
    const response = await axios.get(`${API}/news/${id}`);
    if(response.status >= 400){
      throw Error(`Error ${response.status} occured; ${response.statusText}`)
    } else return response.data;
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getReadAlsoNews = createAsyncThunk('getReadAlsoNews', async (_, { rejectWithValue }) => {
  try {
    const {headers: {"x-total-count" : xTotalCount}} = await axios.get(`${API}/news?_page=1&_limit=1`);
    const page = Math.floor((Math.random() * (Number(xTotalCount) / 3))) || 1;
    const response = await axios.get(`${API}/news?_page=${page}&_limit=3&_sort=id&_order=asc`)
    if(response.status > 399) throw new Error();
    return response.data;
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getTags = createAsyncThunk('getTags', async (_, {rejectWithValue}) => {
  try {
    const response = await axios.get(`${API}/tags`);
    if(response.status >= 400){
      throw Error(`Error ${response.status} occured; ${response.statusText}`)
    } else return response.data;
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const openNewsModal = createAsyncThunk('openNewsModal', async function(id, {rejectWithValue}) {
  try {
    const responseContact = await axios.get(`${API}/contacts/${id}`);
    const responseGroups = await axios.get(`${API}/groups`);
    if(responseContact.status >= 400 || responseGroups.status >= 400) throw Error();
    else return {contact: responseContact.data, tags: responseGroups.data};
  } catch (error) {
    return rejectWithValue(error)
  }
})



export const saveUpdatedContact = createAsyncThunk('saveUpdatedContact', async (news: INews, {dispatch, rejectWithValue}) => {
  try {
    const response = await axios.patch(`${API}/news/${news.id}`, news);
    if(response.status > 400) {
      throw Error()
    } else {
      dispatch(openSnackbar({text: `${news.title} updated`, severity: 'success'}))
      return news;
    }
  } catch (error) {
    dispatch(openSnackbar({text: `${news.title} wasn't update`, severity: 'error'}))
    return rejectWithValue(error);
  }
})

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    handleDrawer(state, action){
      state.drawerOpen = action.payload;
    },
    openSnackbar(state, action){
      state.snackbar = true;
      state.snackbarStatus = {text: action.payload.text, severity: action.payload.severity};
    },
    closeSnackbar(state){
      state.snackbar = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getComments.rejected, (state, action) => {state.comments = null; state.error = action.payload})
    builder.addCase(getComments.fulfilled, (state, action) => {state.loading = false; state.comments = action.payload;})
    builder.addCase(getReadAlsoNews.rejected, (state, action) => {state.loading = false; state.readAlsoNews = []; state.error = action.payload})
    builder.addCase(getReadAlsoNews.fulfilled, (state, action) => {state.loading = false; state.readAlsoNews = action.payload;})
    builder.addCase(getNews.pending, (state) => {state.loading = true;})
    builder.addCase(getNews.rejected, (state, action) => {state.loading = false; state.news = []; state.error = action.payload})
    builder.addCase(getNews.fulfilled, (state, action) => {state.loading = false; state.news = action.payload;})
    builder.addCase(getCurrentNews.pending, (state) => {state.loading = true;})
    builder.addCase(getCurrentNews.rejected, (state, action) => {state.loading = false; state.currentNews = null; state.error = action.payload})
    builder.addCase(getCurrentNews.fulfilled, (state, action) => {state.loading = false; state.currentNews = action.payload;})
    builder.addCase(getTags.pending, (state) => {state.loading = true;})
    builder.addCase(getTags.rejected, (state, action) => {state.loading = false; state.tags = []; state.error = action.payload})
    builder.addCase(getTags.fulfilled, (state, action) => {state.loading = false; state.tags = action.payload;})
    builder.addCase(openNewsModal.pending, (state, action) => {state.loading = true;})
    builder.addCase(openNewsModal.rejected, (state, action) => {state.loading = false; state.error = action.payload})
    builder.addCase(openNewsModal.fulfilled, (state, action) => {
      state.loading = false; state.tags = action.payload.tags; state.currentNews = action.payload.contact; state.modal = true;
    })
    builder.addCase(saveUpdatedContact.pending, (state) => {state.loading = true;})
    builder.addCase(saveUpdatedContact.rejected, (state, action) => {state.loading = false; state.error = action.payload})
    builder.addCase(saveUpdatedContact.fulfilled, (state, action) => {state.news = state.news.map(person => {if(person.id === action.payload.id) {return action.payload} else return person}); state.currentNews = action.payload})
  }
});

export const store = configureStore({
  reducer: newsSlice.reducer,
  middleware: (getDefaultMiddleware) =>  getDefaultMiddleware()
})

export const { handleDrawer, openSnackbar, closeSnackbar } = newsSlice.actions;