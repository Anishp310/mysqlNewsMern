import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast, Toaster } from "react-hot-toast";

const Admin = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');

    if (!token) {
      toast.error("Token not Found");
      navigate("/login");
    } else if (tokenExpiry && Date.now() > tokenExpiry) {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      localStorage.removeItem('tokenExpiry');
      toast.info("Session expired. Please log in again.");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className='bg-slate-200 flex justify-center p-2'>
      <div className="flex gap-4 p-2 w-full mx-auto">
        <div className='w-[220px]'>   
            <Sidebar />
        </div>
        <div className='flex-1 h-[95vh] bg-white shadow-lg rounded-lg p-2'>
            <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Admin
