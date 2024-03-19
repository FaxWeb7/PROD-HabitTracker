import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { DateService } from '../../services/DateService'
import { ICurrentDateStore } from '../../models/CurrentDate/ICurrentDate'

const initialState: ICurrentDateStore = {
  currentDate: DateService.getCurrentDate()
}

export const currentDateSlice = createSlice({
  name: 'currentDate',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<Date>) => {
      DateService.setCurrentDate(action.payload)
      state.currentDate = action.payload.toLocaleString()
    }
  }
})

export const { actions: currentDateActions, reducer: currentDateReducer } = currentDateSlice
export const selectCurrentDate = (state: RootState) => state.currentDateStore