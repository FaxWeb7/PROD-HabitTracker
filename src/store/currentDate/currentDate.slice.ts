import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ICurrentDateStore } from '../../models/CurrentDate/ICurrentDate'
import { DateService } from '../../services/DateService'

const initialState: ICurrentDateStore = {
  currentDate: DateService.getCurrentDate()
}

export const currentDateSlice = createSlice({
  name: 'currentDate',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      DateService.setCurrentDate(action.payload)
      state.currentDate = action.payload
    }
  }
})

export const { actions: currentDateActions, reducer: currentDateReducer } = currentDateSlice
export const selectCurrentDate = (state: RootState) => state.currentDateStore