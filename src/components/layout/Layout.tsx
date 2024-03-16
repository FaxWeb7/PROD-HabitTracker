import { FC, ReactNode } from 'react';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import styles from './layout.module.scss';

interface ILayoutProps {
  children: ReactNode
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div className='wrapper'>
      <Header />
      <div className="main">
        { children }
      </div>
      <Footer />
    </div>
  )
}