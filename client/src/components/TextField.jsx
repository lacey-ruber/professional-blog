import React from 'react'

const TextField = ({ label, type, name, value, onChange, error }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }
  // const getInputClasses = () => {
  //   return error ? className={styles.isvalid} : ''
  // }

  return (
    <div>
      <div>
        <label style={{ display: 'none' }} htmlFor={name}>
          {label}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={label}
          className="form-input"
        />
      </div>
      {error && <span className="errors">{error}</span>}
    </div>
  )
}
TextField.defaultProps = {
  type: 'text'
}

export default TextField
