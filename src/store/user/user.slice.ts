import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IUser, IUserStore } from '../../models/User/IUser'
import { UserService } from '../../services/UserService'

const initialState: IUserStore = {
  user: UserService.getUser()
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      UserService.setUser(action.payload)
      state.user = action.payload
    }
  }
})

export const { actions: userActions, reducer: userReducer } = userSlice
export const selectUser = (state: RootState) => state.userStore