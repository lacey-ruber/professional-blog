import React from 'react'
import styles from '../pages/Main/Main.module.scss'

const Sort = ({ onSort, selectedSort }) => {
  const items = {
    date: { path: 'createdAt', name: 'New' },
    rate: { path: 'viewsCount', name: 'Popular' }
  }

  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc'
      })
    } else {
      onSort({ path: item, order: 'desc' })
    }
  }

  return (
    <div className={styles.tabs}>
      <ul>
        {Object.keys(items).map((item) => (
          <li
            className={
              selectedSort.path === items[item].path ? styles.active : null
            }
            key={item}
            onClick={() => handleSort(items[item].path)}
          >
            {items[item].name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sort
