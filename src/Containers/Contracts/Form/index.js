import React from 'react'
import _ from 'lodash'
import { SubmissionError, Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import Web3 from 'web3'
import FontAwesome from 'react-fontawesome'
import { deployContract } from '../../../redux/contracts/action-creators'
import Input from '../../../Components/Input'
import SHA3 from 'crypto-js/sha3'
import './Form.css'

let sha3 = (value) => {
  return SHA3(value, {
    outputLength: 256
  }).toString()
}

const Form = props => {
  const {
    submitSucceeded,
    formContract,
    handleSubmit,
    submitting,
    error,
    hasErrored
  } = props

  if (submitSucceeded) {
    return <Redirect
      to='/contracts'
      push />
  }

  const contracts = ['Freelance', 'Buying goods', 'Services']

  return (
    <form onSubmit={handleSubmit} className='Form-container'>
      <div>
        <label htmlFor='contractName'>Select contract</label>
      </div>
      <div>
        <Field
          name='contractName'
          component='select'
          id='contractName'
          className='input-text-contract'
        >
          <option value=''>Select a contract</option>
          {contracts.map(contract => (
            <option value={contract} key={contract}>
              {contract}
            </option>
          ))}
        </Field>
      </div>
      {
        _.has(formContract, 'values.contractName') &&
        <div className='params'>
          <Field
            name='value'
            component={Input}
            type='number'
            step={1 * 10e-18}
            required
            innerClassName='input-text-contract-param'
            placeholder='Payment (ETH)' />
          <Field
            name='timeout'
            component={Input}
            type='number'
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
          {
            submitting &&
            <FontAwesome
              name='circle-o-notch'
              spin
              style={{marginRight: '10px'}}
            />
          }
          Submit contract
        </button>
      </div>
      {hasErrored && <div>Error contract</div>}
    </form>
  )
}

// NOTE copied from web3 v1.0 isAddress. Remove when we upgrade to web3 v1.0
const isAddress = address => {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    // check if it has the basic requirements of an address
    return false
  } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
    // If it's all small caps or all all caps, return true
    return true
  } else {
    // Otherwise check each case
    return isChecksumAddress(address)
  }
}

// NOTE copied from web3 v1.0 isAddress. Remove when we upgrade to web3 v1.0
const isChecksumAddress = address => {
  // Check each case
  address = address.replace('0x', '')
  const addressHash = sha3(address.toLowerCase())
  for (let i = 0; i < 40; i++) {
    // the nth letter should be uppercase if the nth digit of casemap is 1
    if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
      return false
    }
  }
  return true
}

const FORM_NAME = 'contract'

const mapStateToProps = state => {
  return {
    formContract: state.form.contract
  }
}

const validate = values => {
  const errors = {}

  if (!isAddress(values.partyB)) {
    errors.partyB = 'PartyB address invalid'
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email invalid'
  }

  return errors
}

export default withRouter(connect(mapStateToProps, null)(
  reduxForm({
    form: FORM_NAME,
    validate,
    onSubmit (values, dispatch) {
      const web3 = new Web3()
      values.hashContract = web3.sha3(values.description)
      return dispatch(deployContract(values))
        .catch(error => {
          if (error) { throw new SubmissionError({_error: 'error submission'}) }
        })
    }
  })(Form)))
