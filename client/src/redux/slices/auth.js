import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/http.service'

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (payload) => {
    const { data } = await httpService.post('/auth/login', payload)
    return data
  }
)

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (payload) => {
    const { data } = await httpService.post('/auth/register', payload)
    return data
  }
)

export const fetchAuthMe = createAsyncThunk('/auth/fetchAuthMe', async () => {
  const { data } = await httpService.get('/auth/me')
  return data
})

const initialState = {
  entities: null,
  isLoading: true,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedOut: (state) => {
      state.entities = null
      state.isLoading = false
    }
  },
  extraReducers: {
    [fetchLogin.pending.type]: (state) => {
      state.isLoading = true
      state.entities = null
    },
    [fetchLogin.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.entities = action.payload
    },
    [fetchLogin.rejected.type]: (state, action) => {
      state.isLoading = false
      state.entities = null
      state.error = action.payload
    },

    [fetchRegister.pending.type]: (state) => {
      state.isLoading = true
      state.entities = null
    },
    [fetchRegister.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.entities = action.payload
    },
    [fetchRegister.rejected.type]: (state, action) => {
      state.isLoading = false
      state.entities = null
      state.error = action.payload
    },

    [fetchAuthMe.pending.type]: (state) => {
      state.isLoading = true
      state.entities = null
    },
    [fetchAuthMe.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.entities = action.payload
    },
    [fetchAuthMe.rejected.type]: (state, action) => {
      state.isLoading = false
      state.entities = null
      state.error = action.payload
    }
  }
})

const { reducer: authReducer, actions } = authSlice
const { userLoggedOut } = actions

export const logOut = () => (dispatch) => {
  dispatch(userLoggedOut())
}

export const selectedIsAuth = (state) => Boolean(state.auth.entities)

export const getUsersData = () => (state) => state.auth.entities

export const getUserById = (userId) => (state) => {
  if (state.auth.entities) {
    return state.auth.entities.find((u) => u._id === userId)
  }
}

export default authReducer
