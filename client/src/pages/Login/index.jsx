import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import TextField from '../../components/TextField'
import { validator } from '../../utils/validator'
import styles from './Login.module.scss'
import { fetchLogin, selectedIsAuth } from '../../redux/slices/auth'

const Login = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectedIsAuth)
  const [data, setData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfig = {
    email: {
      isRequired: { message: 'Email is required' }
    },
    password: {
      isRequired: { message: 'Password is required' }
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = async (event) => {
    event.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const values = await dispatch(fetchLogin(data))

    if (!values.payload) {
      return alert('Authorisation Error')
    }

    if ('token' in values.payload) {
      window.localStorage.setItem('token', values.payload.token)
    }
  }

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <div className={styles.forms}>
      <div className={styles.container}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label={'E-mail'}
            name="email"
            value={data.email}
            onChange={handleChange}
            error={errors.email}
          />
          <TextField
            label={'Password'}
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
            error={errors.password}
          />

          <button
            type="submit"
            disabled={!isValid}
            className={'form-btn' + (isValid ? ' active' : '')}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
