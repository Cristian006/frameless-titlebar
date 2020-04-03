import React from 'react'
import PropTypes from 'prop-types'

const Dropdown = ({ label, options, onChange, value }) => {
  return (
    <div className='Dropdown'>
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
    </div>
  )
}

Dropdown.propTypes = {
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string
}

Dropdown.defaultProps = {
  options: [],
  label: ''
}

export default Dropdown
