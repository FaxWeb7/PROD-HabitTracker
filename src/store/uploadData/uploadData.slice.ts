import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IUploadData, IUploadDataStore } from '../../models/UploadData/IUploadData'
import { UploadDataService } from '../../services/UploadDataService'

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
    }
  }
})

export const { actions: uploadDataActions, reducer: uploadDataReducer } = uploadDataSlice
export const selectUploadData = (state: RootState) => state.uploadDataStore