import { FC, ReactNode, useEffect } from 'react'
import { Header } from './components/layout/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { currentDateActions, selectCurrentDate } from './store/currentDate/currentDate.slice'

interface IAppProps {
  children: ReactNode
}

export const App: FC<IAppProps> = ({ children }) => {
  const currentDateState = useSelector(selectCurrentDate)
  const dispatch = useDispatch()

  useEffect(() => {
    if (currentDateState.value == ''){
      dispatch(currentDateActions.setValue(new Date()))
    }
  }, [])
  
  return (
    <div className='wrapper'>
      <Header />
      <main className='main'>
        { children }
      </main>
    </div>
  )
}
