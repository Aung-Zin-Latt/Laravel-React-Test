import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClientApi from '../api/axiosClientApi';
import { useStateContext } from '../context/ContextProvider';

const SignUp = () => {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState(null)

  const {setUser, setToken} = useStateContext();

  const onSubmit = (e) => {
    e.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password:  passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }

    console.log(payload);
    axiosClientApi.post('/signup', payload)
      .then(({data}) => { // data will return actual JSON data object from the server
        setUser(data.user)
        setToken(data.token)
      }).catch(err => {
        const response = err.response;
        if (response && response.status === 422) { // 422 means validation errors
          // console.log(response.data.errors);
          setErrors(response.data.errors);
        }
      })
  }

  return (

    <form onSubmit={onSubmit}>
      <h1 className="title">
        Sign for free
      </h1>
      {errors && <div className='alert'>
      {/* Iterate errors object */}
        {Object.keys(errors).map(key => (
          <p key={key}>{errors[key][0]}</p>
        ))}
      </div>
      }
      <input ref={nameRef} type="text" placeholder="Enter your name" />
      <input ref={emailRef} type="email" placeholder="Enter your email address" />
      <input ref={passwordRef} type="password" placeholder="Enter your password" />
      <input ref={passwordConfirmationRef} type="password" placeholder="Enter your password confirmation" />
      <button className="btn btn-block">Signup</button>
      <p className="message">
        Already Registered? <Link to="/login">Sign in</Link>
      </p>
    </form>
  )
}

export default SignUp
