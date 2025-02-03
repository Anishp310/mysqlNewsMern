import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import UserInfo from './SidebarContent/UserInfo'
import Menulist from './SidebarContent/Menulist'
const Sidebar = () => {

  return (
    <div className='overflow-y-scroll h-[95vh]'>
    
        <UserInfo/>
                <hr className='mt-3' />

        
        <div>
         <Menulist/>
        </div>
       

    </div>
  )
}

export default Sidebar