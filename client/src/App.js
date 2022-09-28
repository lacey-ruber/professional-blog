import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Main from './pages/Main'
import FullPost from './pages/FullPost'
import CreatePost from './pages/CreatePost'
import Login from './pages/Login'
import Registration from './pages/Registration'
import NotFound from './components/NotFound'
import Sidebar from './components/Sidebar'
import { fetchAuthMe } from './redux/slices/auth'
import './index.scss'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="posts/:id" element={<FullPost />} />
          <Route path="posts/:id/edit" element={<CreatePost />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Sidebar />
    </>
  )
}

export default App
