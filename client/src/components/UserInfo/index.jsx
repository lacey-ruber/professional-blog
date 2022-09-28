import React from 'react'
// import imageNull from '../../assets/img-5.jpg'
import styles from './UserInfo.module.scss'

const UserInfo = ({ fullName, avatarUrl, createdAt }) => {
  return (
    <div className={styles.user}>
      <img
        className={styles.avatar}
        src={avatarUrl || '/noavatar.png'}
        alt={fullName}
      />
      <div>
        <p>{fullName}</p>
        <span>{createdAt}</span>
      </div>
    </div>
  )
}

export default UserInfo
