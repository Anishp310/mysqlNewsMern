import React, { useEffect, useState } from 'react'
import Header from '../common/header'
import ComponentTable from '../common/ComponentTable'
const AdminDashboard = () => {
   
  
  return (
    <div className=''>
            <Header heading="Dashboard" /> 

      <div >
      <ComponentTable/>
      </div>
    </div>
  )
}

export default AdminDashboard