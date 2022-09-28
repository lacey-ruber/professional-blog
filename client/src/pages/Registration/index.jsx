import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import TextField from '../../components/TextField'
import { validator } from '../../utils/validator'
import styles from './Registration.module.scss'
// import config from '../../config.json'
// import httpService from '../../services/http.service'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRegister, selectedIsAuth } from '../../redux/slices/auth'

const Registration = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectedIsAuth)
  const [data, setData] = useState({
    fullName: '',
    email: '',
    password: ''
  })
  // const [avatarUrl, setAvatarUrl] = useState('')
  // const inputFileRef = useRef(null)
  const [errors, setErrors] = useState({})

  // const handleChangeFile = async (event) => {
  //   try {
  //     const formData = new FormData()
  //     const file = event.target.files[0]
  //     formData.append('image', file)
  //     const { data } = await httpService.post('/upload', formData)
  //     setAvatarUrl(data.url)
  //   } catch (err) {
  //     console.log(err)
  //     alert('File upload error')
  //   }
  // }

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfig = {
    fullName: {
      isRequired: {
        message: 'Name is required'
      },
      min: {
        message: 'Name must be at least 3 characters long',
        value: 3
      }
    },
    email: {
      isRequired: {
        message: 'Email is required'
      },
      isEmail: {
        message: 'Email entered incorrectly'
      }
    },
    password: {
      isRequired: {
        message: 'Password is required'
      },
      isCapitalSymbol: {
        message: 'Password must contain at least one capital letter'
      },
      isContainDigit: {
        message: 'Password must contain at least one number'
      },
      min: {
        message: 'Password must be at least 8 characters long',
        value: 8
      }
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
    const values = await dispatch(fetchRegister(data))

    if (!values.payload) {
      return alert('Registration error')
    }

    if ('token' in values.payload) {
      window.localStorage.setItem('token', values.payload.token)
    }
  }

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <div className={styles.register}>
      <div className={styles.container}>
        <h1>Create an account</h1>
        <form onSubmit={handleSubmit}>
          {/* <div className={styles.download}>
            <div onClick={() => inputFileRef.current.click()}>
              Upload picture
            </div>
            {imageUrl && <button onClick={handleRemoveImage}>Delete</button>}
            <input
              ref={inputFileRef}
              onChange={handleChangeFile}
              type="file"
              hidden
            />
          </div> */}
          {/* <img
            className={styles.avatar}
            src={
              avatarUrl ? `${config.apiEndpoint}${avatarUrl}` : './noavatar.png'
            }
            alt={data.fullName}
          /> */}
          <TextField
            label={'Full name'}
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />
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
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Registration
