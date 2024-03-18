import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { DateService } from '../../services/DateService'

const initialState: ICurrentDateStore = {
  value: DateService.getCurrentDate()
}

export const currentDateSlice = createSlice({
  name: 'currentDate',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<Date>) => {
      DateService.setCurrentDate(action.payload)
      state.value = action.payload.toLocaleString()
    }
  }
})

export const { actions: currentDateActions, reducer: currentDateReducer } = currentDateSlice
export const selectCurrentDate = (state: RootState) => state.currentDate