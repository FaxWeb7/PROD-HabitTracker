import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IUploadData } from '../../models/UploadData/IUploadData'
import { UploadDataService } from '../../services/UploadDataService'

const initialState: IUploadData = UploadDataService.getUploadData()

export const uploadDataSlice = createSlice({
  name: 'uploadData',
  initialState,
  reducers: {
    setUploadData: (state, action: PayloadAction<IUploadData>) => {
      UploadDataService.setUploadData(action.payload)
      state = action.payload
    }
  }
})

export const { actions: uploadDataActions, reducer: uploadDataReducer } = uploadDataSlice
export const selectUploadData = (state: RootState) => state.uploadData