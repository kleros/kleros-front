import React from 'react'
import { SubmissionError, Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import { submitDisputeResolution } from '../../../business/disputes/action-creators'
import Input from '../../../Input'
import './Form.css'

const Form = props => {
  const {resolutionOptions = [], handleSubmit, submitting, error, hasErrored} = props
  return (
    <form onSubmit={handleSubmit} className='Form-container'>
      {
        resolutionOptions.map(option => (
          <div className='radio-input-container' key={option.value}>
            <div className='input-container'>
              <div className='resolution-option'>
                <Field
                  name='decision'
                  required
                  id={option.value}
                  type='radio'
                  className='input-dispute-resolution'
                  value={option.value}
                  component={Input} />
                <div className='option-information'>
                  <h2>{ option.name }</h2>
                  <p>{ option.description }</p>
                </div>
              </div>
            </div>
            <div className='divider' />
          </div>
        ))
      }
      { error && <div><strong>{ error }</strong></div> }
      <div className='button-container'>
        <button
          type='submit'
          disabled={submitting || error}
          className='submit'>
          {
            submitting &&
            <FontAwesome
              name='circle-o-notch'
              spin
              style={{marginRight: '10px'}}
            />
          }
          Submit now
        </button>
      </div>
      { hasErrored && <div>Error contract</div> }
    </form>
  )
}

const FORM_NAME = 'disputeResolution'

const mapStateToProps = state => {
  return {
    formDisputeResolution: state.form.disputeResolution
  }
}

const validate = values => {
  return {}
}

export default withRouter(connect(mapStateToProps, null)(
  reduxForm({
    form: FORM_NAME,
    validate,
    onSubmit (values, dispatch) {
      return dispatch(submitDisputeResolution(values))
        .catch(error => {
          if (error) { throw new SubmissionError({ _error: 'submission' }) }
        })
    }
  })(Form)))
