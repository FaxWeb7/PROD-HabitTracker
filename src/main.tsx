import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { App } from './App.tsx'
import { HabitsScreen } from './components/screens/Habits/Habits.tsx'
import { Dashboard } from './components/screens/Dashboard/Dashboard.tsx'
import { Shop } from './components/screens/Shop/Shop.tsx'
import { Profile } from './components/screens/Profile/Profile.tsx'
import { Error } from './components/screens/Error/Error.tsx'
import { store } from './store/store.ts'
import './styles/global.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App>
          <Routes>
            <Route path="/" element={<HabitsScreen />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/shop" element={<Shop />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="*" element={<Error />}/>
          </Routes>
        </App>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)