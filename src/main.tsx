import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { store } from './store/store.ts'
import { HabitsScreen } from './components/screens/Habits/Habits.tsx'
import { Dashboard } from './components/screens/Dashboard/Dashboard.tsx'
import { Shop } from './components/screens/Shop/Shop.tsx'
import { Error } from './components/screens/Error/Error.tsx'
import { App } from './App.tsx'
import './styles/global.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<HabitsScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </App>
    </BrowserRouter>
  </Provider>
)
