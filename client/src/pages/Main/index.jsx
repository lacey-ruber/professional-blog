import React, { useState, useEffect } from 'react'
import Post from '../../components/Post'
import _ from 'lodash'
import styles from './Main.module.scss'
import emptyPicture from '../../assets/img-6.jpg'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchPosts,
  getPosts,
  getPostsLoadingStatus
} from '../../redux/slices/posts'
import configFile from '../../config.json'
import { commentsDate, registrationDate } from '../../utils/dateFormat'
import { getUsersData } from '../../redux/slices/auth'
import Sort from '../../components/Sort'

const Main = () => {
  const dispatch = useDispatch()
  const userData = useSelector(getUsersData())
  const posts = useSelector(getPosts())

  const postsLoading = useSelector(getPostsLoadingStatus())

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  const [sortBy, setSortBy] = useState({ path: 'createdAt', order: 'desc' })
  const handleSort = (item) => {
    setSortBy(item)
  }
  const sortedPosts = _.orderBy(posts, [sortBy.path], [sortBy.order])

  if (sortedPosts.length > 0) {
    return (
      <>
        <Sort onSort={handleSort} selectedSort={sortBy} />
        <div className={styles.separation}>
          <div className={styles.posts}>
            {postsLoading ? (
              <h2>Загрузка</h2>
            ) : (
              sortedPosts.map((post) => (
                <Post
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  imageUrl={
                    post.imageUrl
                      ? `${configFile.apiEndpoint}${post.imageUrl}`
                      : emptyPicture
                  }
                  user={post.user}
                  createdAt={registrationDate(post.user.createdAt)}
                  createdAtPost={commentsDate(post.createdAt)}
                  viewsCount={post.viewsCount}
                  tags={post.tags}
                  isEditTable={userData?._id === post.user._id}
                  isLoading={postsLoading}
                />
              ))
            )}
          </div>
        </div>
      </>
    )
  } else {
    return (
      <p style={{ display: 'flex', justifyContent: 'center' }}>
        Be the first to write an article
      </p>
    )
  }
}

export default Main
