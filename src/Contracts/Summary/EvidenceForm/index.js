import React from 'react'
import _ from 'lodash'
import { SubmissionError, Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import { addEvidence } from '../../../business/contract/action-creators'
import Input from '../../../Input'
import './EvidenceForm.css'

const EvidenceForm = props => {
  const {
    evidenceFormContract,
    submitSucceeded,
    handleSubmit,
    submitting,
    error,
    hasErrored,
    match
  } = props

  if (submitSucceeded) {
    return <Redirect
      to='/contracts'
      push />
  }

  return (
    <form onSubmit={handleSubmit} className='EvidenceForm-container'>
      <div className='params'>
        <Field
          name='evidence'
          component={Input}
          type='text'
          required
          innerClassName='input-text-contract-param'
          placeholder='Link to the evidence' />
        <Field
          name='addressContract'
          component={Input}
          type='hidden'
          value={match.params.address}
          required />
      </div>
      {error && <div><strong>{error}</strong></div>}
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
      {hasErrored && <div>Error evidence</div>}
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

  // FIXME regex https | ipfs | swarm
  if (!/(bzz|ipfs|https):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(values.evidence)) {
    errors.evidence = 'Evidence link invalid'
  }

  return errors
}

export default withRouter(connect(mapStateToProps, null)(
  reduxForm({
    form: FORM_NAME,
    validate,
    onSubmit (values, dispatch) {
      return dispatch(addEvidence(values))
        .catch(error => {
          if (error)
            throw new SubmissionError({_error: 'error evidence submission'})
        })
    }
  })(EvidenceForm)))
