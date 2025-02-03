import React from 'react'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div >
      <Header  />
      <Outlet />
      <Footer/>
    </div>
  )
}

export default App