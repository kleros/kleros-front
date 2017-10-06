import React from 'react'
import './Input.css'

const Input = ({
  className,
  innerClassName,
  input,
  type,
  placeholder,
  children,
  meta = {touched: false, error: false},
  ...rest
}) => (
  <div className={`Input-container ${className}`}>
    {children}
    { (() => {
      switch (type) {
        case 'textarea':
          return (
            <textarea
              className={innerClassName}
              placeholder={placeholder}
              {...rest}
              {...input}
            />
          )
        default :
          return (
            <input
              className={innerClassName}
              type={type}
              placeholder={placeholder}
              {...rest}
              {...input}
            />
          )
      }
    })() }
    {
      meta.touched && meta.error &&
        <span className='input_error'>{ meta.error }</span>
    }
  </div>
)

export default Input
