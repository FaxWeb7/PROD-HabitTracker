import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUploadData, IUploadDataStore } from '../../models/UploadData/IUploadData'
import { IHabitAction } from '../../models/UploadData/IHabitAction'
import { UploadDataService } from '../../services/UploadDataService'
import { RootState } from '../store'

const initialState: IUploadDataStore = {
  uploadData: UploadDataService.getUploadData()
}

export const uploadDataSlice = createSlice({
  name: 'uploadData',
  initialState,
  reducers: {
    setUploadData: (state, action: PayloadAction<IUploadData>) => {
      UploadDataService.setUploadData(action.payload)
      state.uploadData = action.payload
    },
    addAction: (state, action: PayloadAction<IHabitAction>) => {
      state.uploadData.actions.push(action.payload)
      UploadDataService.setUploadData(state.uploadData)
    }
  }
})

export const { actions: uploadDataActions, reducer: uploadDataReducer } = uploadDataSlice
export const selectUploadData = (state: RootState) => state.uploadDataStore