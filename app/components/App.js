import React from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import PropTypes from 'prop-types';
import Balances from './Balances';
import TradeCurrencyMenu from './TradeCurrencyMenu';

class App extends React.Component {
    componentDidMount () {
        const { dispatch } = this.props;

        dispatch(handleInitialData());
    }

    render() {
        return (
            <div className={'app-container'}>
                <Balances />
                <TradeCurrencyMenu originalCurrencyCode={'USD'}/>
            </div>
        )
    }
}

export default connect()(App);