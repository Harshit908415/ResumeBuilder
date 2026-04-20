import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../app/features/authSlice'
const Navbar = () => {
  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const logoutUser = () => {
    navigate('/')
    dispatch(logout())
  }
  return (
    <div className='shadow bg-white'>
      <nav className='flex item-center justify-between max-w-7xl max-auto px-4 py-3.5 text-slate-800 transition-all'>
        <Link to='/'>
          <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <p className="hidden sm:block text-gray-800">
            Hi, {user.name}
          </p>

          <button
            onClick={logoutUser}
            className="bg-white border border-gray-300 text-gray-800 
               px-6 py-2 rounded-full 
               hover:bg-slate-50 
               transition-all duration-200 
               active:scale-95"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar