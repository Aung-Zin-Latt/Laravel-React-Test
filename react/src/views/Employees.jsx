import React, { useEffect, useState } from 'react'
import axiosClientApi from '../api/axiosClientApi'
import { Link } from 'react-router-dom'

const Employees = () => {

  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getEmployees();
  }, [])

  const getEmployees = () => {
    setLoading(true)
    axiosClientApi.get('/employees')
      .then(({data}) => {
        setLoading(false)
        console.log(data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Employees</h1>
          <Link to="/employees/new" className="btn-add">Add New</Link>
        </div>
        <div className='card animated fadeInDown'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Position</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.position}</td>
                  <td>
                    <Link className='btn-delete'>Delete</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Employees
