import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import httpService from '../../services/http.service'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await httpService.get('/posts')
  return data
})

export const fetchRemovePost = createAsyncThunk(
  'posts/fetchRemovePost',
  async (id) => {
    httpService.delete(`/posts/${id}`)
  }
)

const initialState = {
  entities: null,
  isLoading: true,
  error: null
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending.type]: (state) => {
      state.entities = null
      state.isLoading = true
    },
    [fetchPosts.fulfilled.type]: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    [fetchPosts.rejected.type]: (state) => {
      state.entities = null
      state.isLoading = false
    },
    [fetchRemovePost.pending.type]: (state, action) => {
      state.entities = state.entities.filter(
        (obj) => obj._id !== action.meta.arg
      )
    }
  }
})

const { reducer: postsReducer } = postsSlice

export const getPosts = () => (state) => state.posts.entities

export const getPostsLoadingStatus = () => (state) => state.posts.isLoading

export default postsReducer
