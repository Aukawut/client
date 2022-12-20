import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import SignIn from './pages/SignIn'
import Travel from './pages/Travel'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <NavBar/>
  <Routes>
    <Route path='/' element={ <App />}></Route>
    <Route path='/signin' element={ <SignIn />}></Route>
    <Route path='/travel' element={ <Travel />}></Route>
  </Routes>
  </BrowserRouter>,
)
