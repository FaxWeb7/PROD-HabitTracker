import { FC, ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentDateActions, selectCurrentDate } from './store/currentDate/currentDate.slice'
import { selectUploadData, uploadDataActions } from './store/uploadData/uploadData.slice'
import { selectUser } from './store/user/user.slice'
import { IUploadData } from './models/UploadData/IUploadData'
import { IHabit } from './models/UploadData/IHabit'
import { IHabitAction } from './models/UploadData/IHabitAction'
import { Header } from './components/layout/Header/Header'
import { Loading } from './components/shared/Loading/Loading'
import { AuthModal } from './components/shared/AuthModal/AuthModal'
import { storeFormatDate } from './helpers/ChangeDateFormat'

interface IAppProps {
  children: ReactNode
}

export const App: FC<IAppProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const { currentDate } = useSelector(selectCurrentDate)
  const { uploadData } = useSelector(selectUploadData)
  const { user } = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    if (currentDate == ''){
      dispatch(currentDateActions.setValue(storeFormatDate(new Date())))
    }
    if (!Object.keys(uploadData).length){
      const initialUploadDataVal: IUploadData = { habits: [] as IHabit[], actions: [] as IHabitAction[] }
      dispatch(uploadDataActions.setUploadData(initialUploadDataVal))
    }
    if (Object.keys(user).length !== 0){
      setIsAuth(true)
    }
    setIsLoading(false)
  }, [])

  if (isLoading){
    return <Loading />
  }
  if (!isAuth){
    return <AuthModal setIsAuth={setIsAuth} />
  }

  return (
    <div className='wrapper'>
      <Header />
      <main className='main'>
        { children }
      </main>
    </div>
  )
}
