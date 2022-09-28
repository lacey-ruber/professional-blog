import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut, selectedIsAuth } from '../../redux/slices/auth'
import styles from './NavBar.module.scss'

const NavBar = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectedIsAuth)

  const onClickLogout = () => {
    dispatch(logOut())
    window.localStorage.removeItem('token')
  }
  return (
    <div className={styles.navbar}>
      <Link to="/">
        <h1>
          PROFESSIONAL
          <br />
          BLOG
        </h1>
      </Link>
      <div className={styles.auth}>
        {isAuth ? (
          <>
            <Link to="/create-post">
              <button>To write an article</button>
            </Link>
            <button onClick={onClickLogout} color="error">
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.4545 5.45455C17.4545 8.467 15.0124 10.9091 12 10.9091C8.98754 10.9091 7.18545 8.467 6.78545 5.45455C6.38545 2.4421 8.98754 0 12 0C15.0124 0 17.4545 2.44209 17.4545 5.45455ZM0.4 18.6542L0 22.6969L24 23.4969V18.6542C24 15.4645 21.0153 12.8787 17.3333 12.8787H6.66667C2.98477 12.8787 0.4 15.4645 0.4 18.6542Z"
                  fill="currentColor"
                ></path>
              </svg>
              <span>Login</span>
            </Link>
            <Link to="/register">
              <button>Create an account</button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default NavBar
