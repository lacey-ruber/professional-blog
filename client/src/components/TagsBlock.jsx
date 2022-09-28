import React from 'react'

const TagsBlock = ({ tags }) => {
  return (
    <div>
      <ul className="tags">
        {tags.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  )
}

export default TagsBlock
