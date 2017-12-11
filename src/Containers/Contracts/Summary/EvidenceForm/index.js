import React from 'react'
import { SubmissionError, Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import { addEvidence } from '../../../../redux/contracts/action-creators'
import Input from '../../../../Components/Input'
import './EvidenceForm.css'

const EvidenceForm = props => {
  const {
    handleSubmit,
    submitting,
    error,
    hasErrored
  } = props

  return (
    <form
      onSubmit={handleSubmit}
      className='EvidenceForm-container'>
      <div className='params'>
        <Field
          name='name'
          component={Input}
          type='text'
          required
          innerClassName='input-text-contract-param'
          placeholder='Title' />
        <Field
          name='description'
          component={Input}
          type='text'
          innerClassName='input-text-contract-param'
          placeholder='Description' />
        <Field
          name='url'
          component={Input}
          type='text'
          required
          innerClassName='input-text-contract-param'
          placeholder='Link to the evidence' />
        <div>
          <button type='submit' disabled={submitting || error} className='submit'>
            {
              submitting &&
              <FontAwesome
                name='circle-o-notch'
                spin
                style={{marginRight: '10px'}}
              />
            }
            Add an evidence
          </button>
        </div>
        {error && <div><strong>{error}</strong></div>}
        {hasErrored && <div>Error evidence</div>}
      </div>
    </form>
  )
}

const FORM_NAME = 'evidence'

const mapStateToProps = state => {
  return {
    evidenceFormContract: state.form.evidence
  }
}

const validate = values => {
  const errors = {}

  /* eslint-disable */
  if (!/(bzz|ipfs|https):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(values.evidence)) {
    errors.evidence = 'Evidence link invalid'
  }

  return errors
}

export default withRouter(connect(mapStateToProps, null)(
  reduxForm({
    form: FORM_NAME,
    validate,
    onSubmit (values, dispatch, props) {
      return dispatch(addEvidence({
        ...values,
        address: props.match.params.address
      }))
        .catch(error => {
          if (error) {
            throw new SubmissionError({_error: 'error evidence submission'})
          }
        })
    }
  })(EvidenceForm)))
