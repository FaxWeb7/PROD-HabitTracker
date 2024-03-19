import { ChangeEvent, FC, useState } from 'react';
import styles from './habitsupload.module.scss'
import { PrimaryButton } from '../../../shared/PrimaryButton/PrimaryButton';
import { IUploadData } from '../../../../models/UploadData/IUploadData';
import { useDispatch } from 'react-redux';
import { uploadDataActions } from '../../../../store/uploadData/uploadData.slice';

export const HabitsUpload: FC = () => {
  const [fileData, setFileData] = useState<IUploadData>({} as IUploadData)
  const dispatch = useDispatch()

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files?.length && files[0].type !== 'application/json') return;
    if (files && files.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e?.target?.result as string
        const jsonData = JSON.parse(content)
        setFileData(jsonData)
      };
      reader.readAsText(file);
    }
  }

  const handleFileSubmit = () => {
    if (Object.keys(fileData).length){
      dispatch(uploadDataActions.setUploadData(fileData))
    }
  }

  return (
    <div className={styles['habits-upload']}>
      <h2 className={styles['habits-upload__text']}>Загрузка json данных</h2>
      <input id='file-upload' type='file' autoComplete='json' onChange={handleFileChange} className={styles['habits-upload__input']} />
      <label htmlFor="file-upload" className={styles['habits-upload__custom']}>Выбрать файл</label>
      <PrimaryButton text='Загрузить' onClick={handleFileSubmit} className={styles['habits-upload__button']} />
    </div>
  )
}