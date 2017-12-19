import React from 'react'
import { SubmissionError, Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import { activatePinakion } from '../../../../redux/ethereum/action-creators'
import Input from '../../../../Components/Input'
import './Form.css'

const Form = props => {
  const {
    handleSubmit,
    submitting,
    error,
    maxTokens = 0,
    hasErrored
  } = props

  return (
    <form onSubmit={handleSubmit} className='Form-container'>
      <div className='amount-container'>
        <Field
          name='amount'
          component={Input}
          type='number'
          required
          innerClassName='input-number'
          step={1 * 10e-18}
          defaultValue={maxTokens}
        />
      </div>
      { error && <div><strong>{ error }</strong></div> }
      <div className='button-container'>
        <button type='submit' disabled={submitting || error} className='submit'>
          {
            submitting &&
            <FontAwesome
              name='circle-o-notch'
              spin
              style={{marginRight: '10px'}}
            />
          }
          Activate
        </button>
      </div>
      { hasErrored && <div>Error contract</div> }
    </form>
  )
}

const FORM_NAME = 'activatePinakion'

const mapStateToProps = (state, props) => {
  return {
    initialValues: {
      amount: props.maxTokens
    }
  }
}

const validate = (values, props) => {
  const errors = {}
  if (values.amount > props.maxTokens) {
    errors.amount = 'Cannot activate more PNK than you own'
  }
  return errors
}

export default withRouter(connect(mapStateToProps, null)(
  reduxForm({
    form: FORM_NAME,
    validate,
    onSubmit (values, dispatch) {
      return dispatch(activatePinakion(values))
        .catch(error => {
          if (error) {
            throw new SubmissionError({_error: 'Error activating pinakion'})
          }
        })
    }
  })(Form)))
