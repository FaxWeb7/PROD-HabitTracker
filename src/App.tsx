import { FC, ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentDateActions, selectCurrentDate } from './store/currentDate/currentDate.slice'
import { selectUploadData, uploadDataActions } from './store/uploadData/uploadData.slice'
import { selectUser, userActions } from './store/user/user.slice'
import { IHabit } from './models/UploadData/IHabit'
import { IHabitAction } from './models/UploadData/IHabitAction'
import { storeFormatDate } from './helpers/ChangeDateFormat'
import { countUserStats } from './helpers/CountUserStats'
import { Header } from './components/layout/Header/Header'
import { Loading } from './components/shared/Loading/Loading'
import { AuthModal } from './components/shared/AuthModal/AuthModal'
import { Footer } from './components/layout/Footer/Footer'

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
    if (currentDate == '') {
      dispatch(currentDateActions.setValue(storeFormatDate(new Date())))
    }
    if (!Object.keys(uploadData).length) {
      dispatch(
        uploadDataActions.setUploadData({
          habits: [] as IHabit[],
          actions: [] as IHabitAction[]
        })
      )
    }
    if (Object.keys(user).length !== 0) {
      setIsAuth(true)
      const newUser = countUserStats({ user, uploadData, currentDate })
      dispatch(userActions.setUser(newUser))
    }
    setIsLoading(false)

    const notificationInterval = setInterval(() => {
      if (Notification.permission === 'granted') {
        new Notification('Трекер привычек', {
          body: 'Привет, не забывай выполнять привычки чтобы сохранять рекорд и получать больше опыта!'
        })
      }
    }, 14400000)

    return () => {
      clearInterval(notificationInterval)
    }
  }, []) //eslint-disable-line

  if (isLoading) {
    return <Loading />
  }
  if (!isAuth) {
    return <AuthModal setIsAuth={setIsAuth} />
  }

  return (
    <div className="wrapper">
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  )
}
