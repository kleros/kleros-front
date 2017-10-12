import React from 'react'
import _ from 'lodash'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Input from '../../Input'
import './Form.css'

const Form = props => {
  const {formContract, handleSubmit, submitting, error, hasErrored} = props

  const contracts = ['Freelance', 'Buying goods', 'Services']

  return (
    <form onSubmit={handleSubmit} className='Form-container'>
      <div>
        <label htmlFor='contractName'>Select contract</label>
      </div>
      <div>
        <Field name='contractName' component='select' id='contractName' className='input-text-contract'>
          <option value=''>Select a contract</option>
          {contracts.map(contract => (
            <option value={contract} key={contract}>
              {contract}
            </option>
          ))}
        </Field>
      </div>
      {
        _.has(formContract, 'values.contractName')
        &&
        <div className='params'>
          <Field
            name='arbitrator'
            component={Input}
            type='text'
            required
            innerClassName='input-text-contract-param'
            placeholder='Arbitrator' />
          <Field
            name='hashContract'
            component={Input}
            type='text'
            required
            innerClassName='input-text-contract-param'
            placeholder='Hash contract' />
          <Field
            name='timeout'
            component={Input}
            type='text'
            required
            innerClassName='input-text-contract-param'
            placeholder='Timeout' />
          <Field
            name='partyB'
            component={Input}
            type='text'
            required
            innerClassName='input-text-contract-param'
            placeholder='Party B' />
          <Field
            name='arbitratorExtraData'
            component={Input}
            type='text'
            required
            innerClassName='input-text-contract-param'
            placeholder='Arbitrator extra data' />
        </div>
      }
      <div>
        <label htmlFor='email'>Email</label>
        <div className='subLabel'>Add if you want to receive infos about the contract.</div>
        <Field
          name='email'
          component={Input}
          type='email'
          required
          id='email'
          innerClassName='input-text-contract'
          placeholder='Email' />
      </div>
      <div>
        <label htmlFor='description'>Description</label>
        <Field
          name='description'
          component={Input}
          type='textarea'
          required
          innerClassName='input-textarea-contract'
          id='description'
          placeholder='Description' />
      </div>
      {error && <div><strong>{error}</strong></div>}
      <div>
        <button type='submit' disabled={submitting || error} className='submit'>
          Submit contract
        </button>
      </div>
      {hasErrored && <div>Error contract</div>}
    </form>
  )
}

const FORM_NAME = 'contract'

const mapStateToProps = state => {
  return {
    formContract: state.form.contract
  }
}

const validate = values => {
  const errors = {}

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email invalide'
  }

  return errors
}

export default withRouter(connect(mapStateToProps, null)(
  reduxForm({
    form: FORM_NAME,
    validate
    // onSubmit(values, dispatch) {
    //   return dispatch(contractFetchData(values))
    //     .catch(error => {
    //       if (error)
    //         throw new SubmissionError({ _error: 'submission' })
    //     })
    // }
  })(Form)))
