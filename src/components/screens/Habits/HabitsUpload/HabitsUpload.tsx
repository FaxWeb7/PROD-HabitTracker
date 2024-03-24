import { ChangeEvent, FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadDataActions } from '@/store/uploadData/uploadData.slice'
import { selectUser, userActions } from '@/store/user/user.slice'
import { selectCurrentDate } from '@/store/currentDate/currentDate.slice'
import { IUploadData } from '@/models/UploadData/IUploadData'
import { countUserStats } from '@/helpers/CountUserStats'
import { PrimaryButton } from '@/components/shared/PrimaryButton/PrimaryButton'
import styles from './habitsupload.module.scss'

export const HabitsUpload: FC = () => {
  const [fileData, setFileData] = useState<IUploadData>({} as IUploadData)
  const { user } = useSelector(selectUser)
  const { currentDate } = useSelector(selectCurrentDate)
  const dispatch = useDispatch()

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files?.length && files[0].type !== 'application/json') return
    if (files && files.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e?.target?.result as string
        const jsonData = JSON.parse(content)
        setFileData(jsonData)
      }
      reader.readAsText(file)
    }
  }

  const handleFileSubmit = () => {
    if (Object.keys(fileData).length) {
      dispatch(uploadDataActions.setUploadData(fileData))
      const newUser = countUserStats({ user, uploadData: fileData, currentDate })
      dispatch(userActions.setUser(newUser))
    }
  }

  return (
    <div className={styles['habits-upload']}>
      <h2 className={styles['habits-upload__text']}>Загрузка json данных</h2>
      <input
        id="file-upload"
        name="file-upload"
        type="file"
        autoComplete="json"
        onChange={handleFileChange}
        className={styles['habits-upload__input']}
      />
      <label htmlFor="file-upload" className={styles['habits-upload__custom']}>
        Выбрать файл
      </label>
      <PrimaryButton text="Загрузить" type="button" onClick={handleFileSubmit} className={styles['habits-upload__button']} />
    </div>
  )
}
