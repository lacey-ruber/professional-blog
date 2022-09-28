import React, { useEffect, useState } from 'react'
import config from '../config.json'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import Post from '../components/Post'
import httpService from '../services/http.service'
import { registrationDate } from '../utils/dateFormat'
import '../components/Post/Post.module.scss'

const FullPost = () => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const { id } = useParams()

  useEffect(() => {
    httpService
      .get(`/posts/${id}`)
      .then((response) => {
        setData(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }

  return (
    <div className="full-post">
      <Post
        id={data._id}
        title={data.title}
        imageUrl={
          data.imageUrl
            ? `${config.apiEndpoint}${data.imageUrl}`
            : '../no-image.jpg'
        }
        user={data.user}
        createdAt={registrationDate(data.createdAt)}
        viewsCount={data.viewsCount}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
    </div>
  )
}

export default FullPost
