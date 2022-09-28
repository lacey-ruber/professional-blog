import React from 'react'
import { Link } from 'react-router-dom'
import UserInfo from '../UserInfo'
import TagsBlock from '../TagsBlock'
import styles from './Post.module.scss'
import { useDispatch } from 'react-redux'
import { fetchRemovePost } from '../../redux/slices/posts'

const Post = ({
  id,
  title,
  createdAt,
  createdAtPost,
  imageUrl,
  user,
  viewsCount,
  tags,
  children,
  isFullPost,
  isEditTable,
  isLoading
}) => {
  const dispatch = useDispatch()
  if (isLoading) {
    return <h2>Загрузка</h2>
  }

  const handleClickRemove = () => {
    if (window.confirm('Delete article?')) {
      dispatch(fetchRemovePost(id))
    }
  }

  return (
    <div className={styles.post}>
      <article>
        {isEditTable && (
          <div className={styles.edit}>
            <Link to={`/posts/${id}/edit`}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M2.5 14.375V17.5H5.625L14.8458 8.27916L11.7208 5.15416L2.5 14.375V14.375ZM17.2542 5.87083C17.5792 5.54583 17.5792 5.01666 17.2542 4.69166L15.3083 2.74583C14.9833 2.42083 14.4542 2.42083 14.1292 2.74583L12.6042 4.27083L15.7292 7.39583L17.2542 5.87083Z"
                  fill="black"
                />
              </svg>
            </Link>
            <div onClick={handleClickRemove}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M3.21875 17.5938L2.5 16.875L16.875 2.5L17.5937 3.21875L3.21875 17.5938Z"
                  fill="black"
                />
                <path
                  d="M16.875 17.5938L2.5 3.21875L3.21875 2.5L17.5937 16.875L16.875 17.5938Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
        )}

        {imageUrl && (
          <Link
            to={`/posts/${id}`}
            className={isFullPost ? styles.fullbanner : styles.banner}
          >
            <img src={imageUrl} alt={title} />
          </Link>
        )}
        <div className={styles.info}>
          <h2>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <UserInfo {...user} createdAt={createdAt} />
          {isFullPost && <TagsBlock tags={tags} />}
          {children && <div className={styles.text}>{children}</div>}
          <div className={styles.icons}>
            <span>
              <svg height="25px" viewBox="0 0 32 32" width="25px">
                <g
                  fill="none"
                  fillRule="evenodd"
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                >
                  <g fill="#ffffff">
                    <path d="M16,9 C7,9 3,16 3,16 C3,16 7,23.000001 16,23 C25,22.999999 29,16 29,16 C29,16 25,9 16,9 L16,9 L16,9 Z M16,10 C8,10 4.19995117,16 4.19995117,16 C4.19995117,16 8,22.0000006 16,22 C24,21.999999 27.8000488,16 27.8000488,16 C27.8000488,16 24,10 16,10 L16,10 L16,10 Z M16,20 C18.2091391,20 20,18.2091391 20,16 C20,13.7908609 18.2091391,12 16,12 C13.7908609,12 12,13.7908609 12,16 C12,18.2091391 13.7908609,20 16,20 L16,20 L16,20 Z M16,19 C17.6568543,19 19,17.6568543 19,16 C19,14.3431457 17.6568543,13 16,13 C14.3431457,13 13,14.3431457 13,16 C13,17.6568543 14.3431457,19 16,19 L16,19 L16,19 Z M16,17 C16.5522848,17 17,16.5522848 17,16 C17,15.4477152 16.5522848,15 16,15 C15.4477152,15 15,15.4477152 15,16 C15,16.5522848 15.4477152,17 16,17 L16,17 L16,17 Z" />
                  </g>
                </g>
              </svg>
              {viewsCount}
            </span>
            <span>{createdAtPost}</span>
          </div>
        </div>
      </article>
    </div>
  )
}

export default Post
