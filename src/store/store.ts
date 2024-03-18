import { configureStore } from '@reduxjs/toolkit'
import { currentDateReducer } from './currentDate/currentDate.slice'
import { userReducer } from './user/user.slice'
import { uploadDataReducer } from './uploadData/uploadData.slice'

export const store = configureStore({
  reducer: {
    currentDate: currentDateReducer,
    user: userReducer,
    uploadData: uploadDataReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    })
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch