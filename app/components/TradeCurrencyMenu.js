import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {roundNumber, getQuote} from "../utils/numbers";
import {updateActiveCurrency, updateCurrencyBalance} from "../actions/currency";
import {getLastPriceBTC} from '../utils/api';


export class TradeCurrencyMenu extends React.Component {
    state = {
        amount: '',
        quote: '',
        lastPrice: null
    };

    componentDidMount() {
        getLastPriceBTC()
            .then(price => this.setState({lastPrice: price}))
    }

    updateQuote(e) {
        const activeCurrency = this.getActiveCurrency();
        const targetValue = e.target.value;
        const lastPrice = this.getActiveCurrency().code === this.props.originalCurrencyCode ?
            this.state.lastPrice : 1 / this.state.lastPrice;

        if (targetValue > activeCurrency.balance) {
            return this.setState({
                amount: activeCurrency.balance,
                quote: getQuote(activeCurrency.balance, lastPrice)
            });
        } else {
            return this.setState({
                amount: targetValue,
                quote: getQuote(targetValue, lastPrice)
            });
        }


    }

    getActiveCurrency() {
        return this.props.currency.find(currency => {
            return currency.active;
        }) || '';
    }

    getQuotedCurrency() {
        return this.props.currency.find(currency => {
            return !currency.active;
        }) || '';
    }

    handleTrade() {
        const {dispatch} = this.props;
        const {amount, quote} = this.state;
        const activeCurrency = this.getActiveCurrency();
        const quotedCurrency = this.getQuotedCurrency();

        if (amount > activeCurrency.balance) {
            console.error('Can\'t trade more than available funds')
        } else {
            dispatch(updateCurrencyBalance(
                Object.assign({}, activeCurrency, {
                    balance: activeCurrency.balance - amount
                })
            ));
            dispatch(updateCurrencyBalance(
                Object.assign({}, quotedCurrency, {
                    balance: quotedCurrency.balance + quote
                })
            ));

            this.setState({
                amount: '',
                quote: ''
            })
        }

    }

    handleCurrencyChange(e) {
        const {dispatch} = this.props;
        this.setState({
            amount: '',
            quote: ''
        });
        dispatch(updateActiveCurrency(e.target.value));
    }

    render() {
        const isButtonDisabled = !(Number(this.state.amount) > 0 &&
            Number(this.state.quote) > 0);

        return (
            <div className={'exchange-menu'}>
                <label htmlFor="exchangeType">Trade</label>
                <select name={'exchangeType'} value={this.getActiveCurrency().code}
                        onChange={(e) => this.handleCurrencyChange(e)}>
                    {this.props.currency.map(currency => {
                        return (
                            <option key={currency.code} value={currency.code}>{currency.code}</option>
                        )
                    })}
                </select>
                <input
                    id={'exchangeAmount'}
                    type={'number'}
                    onChange={e => this.updateQuote(e)}
                    value={this.state.amount}
                    placeholder={'Enter your amount'}
                    min={'0'}
                    max={this.getActiveCurrency().balance}/>
                <label htmlFor="exchangeQuoteCurrency">For</label>
                <div id={'exchangeQuoteCurrency'}
                     className={'mock-input'}
                     role={'input'}>{this.getQuotedCurrency().code}</div>
                <input id={'exchangeAmount'}
                       type={'number'}
                       placeholder={'Display Quote'}
                       disabled={true}
                       value={this.state.quote}/>
                <button onClick={() => this.handleTrade()}
                        disabled={isButtonDisabled}>Trade</button>
            </div>
        );
    }
};

export default connect(state => ({
    currency: state.currency
}))(TradeCurrencyMenu);

