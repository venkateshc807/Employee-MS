import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
  const { user, logOut } = useAuth()

  return (
    <div className='flex justify-between items-center h-12 bg-teal-500 px-4 text-white'>
      <p>Welcome {user?.name}</p>
      <button
        className="bg-white text-teal-500 px-3 py-1 rounded hover:bg-gray-200"
        onClick={logOut}
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
