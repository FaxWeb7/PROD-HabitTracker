import { FC, ReactNode } from 'react'
import { Header } from './components/layout/Header/Header'

interface IAppProps {
  children: ReactNode
}

export const App: FC<IAppProps> = ({ children }) => {
  return (
    <div className='wrapper'>
      <Header />
      <main className='main'>
        { children }
      </main>
    </div>
  )
}
