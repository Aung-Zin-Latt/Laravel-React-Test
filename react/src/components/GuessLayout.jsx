import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'

const GuessLayout = () => {

  const {token} = useStateContext();

  if (token) {
    // return <Navigate to="/users" />
    return <Navigate to="/employees" />
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <Outlet />
      </div>
    </div>
  )
}

export default GuessLayout
