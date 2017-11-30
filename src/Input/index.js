import React from 'react'
import './Input.css'

const Input = ({
  className,
  innerClassName,
  input,
  type,
  placeholder,
  children,
  value,
  meta = {touched: false, error: false},
  ...rest
}) => {
  // FIXME hack. Can't specify both value and defaultValue
  if (input && !input.value) delete input.value

  return (
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
          case 'radio':
            return (
              <input
                type='radio'
                className={innerClassName}
                value={value}
                {...rest}
                {...input}
              />
            )
          case 'file':
            return (
              <input
                type='file'
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
          <span className='input_error'><br />{ meta.error }</span>
      }
    </div>
  )
}

export default Input
