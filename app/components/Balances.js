import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { roundNumber} from "../utils/numbers";

const FormattedCurrency = props => {
    return (
        <span>{roundNumber(props.value, props.precision)}</span>
    );
};

FormattedCurrency.propTypes = {
    value: PropTypes.number,
    precision: PropTypes.number
};

class Balances extends React.Component {
    render() {
        const {currency} = this.props;

        return (
            <div className={'account-balance'}>
                <span>Account Balance</span>
                {currency.map((item, index) => {
                    const marginClass = index === 0 ? 'account-balance__currency--margin-top' : '';

                    return (
                        <div className={`account-balance__currency ${marginClass}`}
                             key={item.code}>
                            <span className="code">{item.code}</span>
                            <FormattedCurrency
                                value={item.balance}
                                precision={item.precision}
                            />
                        </div>
                    )
                })}
            </div>
        )
    }
};

export default connect(state => ({
    currency: state.currency
}))(Balances);