import React, { Component } from 'react';
import { connect } from 'react-redux';
import { balanceFetchData } from './business/ethereum/action-creators';
import logo from './logo.svg';
import './App.scss';

class App extends Component {
  componentDidMount() {
    this.props.getBalance()
  }

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the balance</p>;
    }

    if (this.props.isFetching) {
      return <p>Loading…</p>;
    }

    return (
      <div className="App">
        <h1>Balance</h1>
          {this.props.balance}
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    balance: state.balance,
    hasErrored: state.failureBalance,
    isFetching: state.requestBalance,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBalance: url => dispatch(balanceFetchData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
