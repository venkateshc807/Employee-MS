import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'


const EmployeeSummaryCard = () => {
  const {user} = useAuth()
  return (
    <div className='p-6'>

          <div className="flex items-center bg-white rounded-xl shadow p-4 hover:shadow-md transition duration-300">
                <div className={`text-3xl bg-teal-600 text-white rounded-full w-14 h-14 flex items-center justify-center`}>
                    <FaUser/>
                </div>
                <div className="ml-4">
                    <p className="text-gray-600 text-sm">Welcome Back</p>
                    <p className="text-2xl font-bold">{user.name}</p>
                </div>
        </div>
        
  </div>
  )
}

export default EmployeeSummaryCard
