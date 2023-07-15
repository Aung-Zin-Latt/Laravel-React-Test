import React, { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import axiosClientApi from '../api/axiosClientApi';

const DefaultLayout = () => {

  const {user, token, setUser, setToken} = useStateContext(); // destructure with object
  // console.log("EMP", user)

  if (!token) {
    return <Navigate to="/login" />
  }

  const onLogout = (e) => {
    e.preventDefault()

    axiosClientApi.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    axiosClientApi.get('/user')
      .then(({data}) => {
        setUser(data)
      })
  }, [])
  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/employees">Employees</Link>
      </aside>
      <div className='content'>
        <header>
          <div>
            Header
          </div>
          <div>
            {user && user.name}
            <a href="#" onClick={onLogout} className='btn-logout'>Logout</a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DefaultLayout
