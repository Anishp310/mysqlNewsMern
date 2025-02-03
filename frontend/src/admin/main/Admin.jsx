import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Admin = () => {

  return (
    <div className='bg-slate-200 flex justify-center p-2  '>
    <div className="flex gap-4 p-2 w-full mx-auto">
      <div className='w-[220px]'>   
          <Sidebar/>
      </div>
      <div className='flex-1 h-[95vh] bg-white shadow-lg rounded-lg p-2' >  

          <Outlet  />
      </div>
    </div>
         
    </div>
  )
}

export default Admin