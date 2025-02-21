import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'

import { TodoContextProvider } from './context/TodoContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <TodoContextProvider>
    <App />
  </TodoContextProvider>
)
