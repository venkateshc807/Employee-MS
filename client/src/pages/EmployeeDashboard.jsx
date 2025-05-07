import React from 'react'
import Sidebar from '../components/employeedashboard/Sidebar'
import Navbar from "../components/dashboard/Navbar"
import { Outlet } from 'react-router-dom'


const EmployeeDashboard = () => {
  return (
    <div>
    <Sidebar/>
    <div className='flex-1 ml-64 bg-gray-100 h-screen'>
      <Navbar/>
      <Outlet />
    </div>
    </div>
  )
}

export default EmployeeDashboard
