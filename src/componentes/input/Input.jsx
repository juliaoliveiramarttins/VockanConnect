import React from 'react'
import InputMask from 'react-input-mask'
import './input.css'

export default function Input({ label, required, error, ...props }) {
  return (
    <label className={`field ${error ? 'has-error' : ''}`}>
      <span>{label}{required && ' *'}</span>
      <input {...props} />
      {error && <em className="error">{error}</em>}
    </label>
  )
}
