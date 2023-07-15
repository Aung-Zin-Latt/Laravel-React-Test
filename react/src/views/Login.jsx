import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider';
import axiosClientApi from '../api/axiosClientApi';

const Login = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null)
  const {setUser, setToken} = useStateContext();

  const onSubmit = (e) => {
    e.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password:  passwordRef.current.value,
    }

    setErrors(null)

    axiosClientApi.post('/login', payload)
      .then(({data}) => { // data will return actual JSON data object from the server
        setUser(data.user)
        setToken(data.token)
      }).catch(err => {
        const response = err.response;
        if (response && response.status === 422) { // 422 means validation errors
          // console.log(response.data.errors);
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({
              email: [response.data.message]
            })
          }
        }
      })
  }

  return (
    <form onSubmit={onSubmit}>
      <h1 className="title">
        Login into your account
      </h1>
      {errors && <div className='alert'>
      {/* Iterate errors object */}
        {Object.keys(errors).map(key => (
          <p key={key}>{errors[key][0]}</p>
        ))}
      </div>
      }
      <input ref={emailRef} type="email" placeholder="Enter your email" />
      <input ref={passwordRef} type="password" placeholder="Enter your password" />
      <button className="btn btn-block">Login</button>
      <p className="message">
        Not Registered? <Link to="/signup">Create an account</Link>
      </p>
    </form>
  )
}

export default Login
