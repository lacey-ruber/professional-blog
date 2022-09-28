import React, { useMemo, useCallback, useState, useRef, useEffect } from 'react'
import { useNavigate, Navigate, useParams, Link } from 'react-router-dom'
import httpService from '../../services/http.service'
import SimpleMde from 'react-simplemde-editor'
import styles from './CreatePost.module.scss'
import 'easymde/dist/easymde.min.css'
import { useSelector } from 'react-redux'
import { selectedIsAuth } from '../../redux/slices/auth'
import config from '../../config.json'

const CreatePost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isAuth = useSelector(selectedIsAuth)
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const inputFileRef = useRef(null)
  const editing = Boolean(id)

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append('image', file)
      const { data } = await httpService.post('/upload', formData)
      setImageUrl(data.url)
    } catch (err) {
      alert('File upload error')
    }
  }

  const handleRemoveImage = () => {
    setImageUrl(null)
  }

  const handleChangeText = useCallback((value) => {
    setText(value)
  }, [])

  const handleSubmit = async () => {
    try {
      const content = {
        imageUrl,
        title,
        tags,
        text
      }

      const { data } = editing
        ? await httpService.patch(`/posts/${id}`, content)
        : await httpService.post('/posts', content)

      const articleId = editing ? id : data._id

      navigate(`/posts/${articleId}`)
    } catch (error) {
      alert('Error creating article')
    }
  }

  useEffect(() => {
    if (id) {
      httpService
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setImageUrl(data.imageUrl)
          setTitle(data.title)
          setTags(data.tags.join(','))
          setText(data.text)
        })
        .catch(() => {
          alert('Error getting article')
        })
    }
  }, [])

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Enter text...',
      status: false,
      autosave: {
        enabled: true,
        uniqueId: '123',
        delay: 1000
      }
    }),
    []
  )

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />
  }

  return (
    <div className={styles.createpost}>
      <div className={styles.wrapper}>
        <div className={styles.download}>
          <div onClick={() => inputFileRef.current.click()}>Upload picture</div>
          {imageUrl && <button onClick={handleRemoveImage}>Delete</button>}
          <input
            ref={inputFileRef}
            onChange={handleChangeFile}
            type="file"
            hidden
          />
        </div>
        {imageUrl && (
          <img
            className={styles.imageurl}
            src={`${config.apiEndpoint}${imageUrl}`}
            alt={title}
          />
        )}
        <input
          className={styles.title}
          type="text"
          placeholder="Article title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          className={styles.theme}
          type="text"
          placeholder="Specify topics separated by commas"
          value={tags}
          onChange={(event) => setTags(event.target.value)}
        />
        <SimpleMde
          className={styles.editor}
          value={text}
          onChange={handleChangeText}
          options={options}
        />
        <div className={styles.buttons}>
          <button onClick={handleSubmit}>{editing ? 'Save' : 'Publish'}</button>
          <Link to="/">
            <span>Cancel</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
