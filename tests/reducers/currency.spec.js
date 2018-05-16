import currencyReducer from '../../app/reducers/currency';
import {ADD_CURRENCY, UPDATE_ACTIVE_CURRENCY, UPDATE_CURRENCY_BALANCE} from "../../app/actions/currency";

const INITIAL_DATA = [ // would be part of an API response
    {
        name: 'US Dollars',
        code: 'USD',
        balance: 156.12,
        precision: 2,
        active: true
    },
    {
        name: 'Bitcoin',
        code: 'BTC',
        balance: 0,
        precision: 8,
        active: false
    }
];

describe('currency reducer', () => {
    it('Should return the initial state', () => {
        expect(currencyReducer(undefined, {})).toEqual([])
    });

    it('Should handle ADD_CURRENCY', () => {
        expect(currencyReducer(undefined, {
            type: ADD_CURRENCY,
            currency: INITIAL_DATA[0]
        })).toEqual([INITIAL_DATA[0]]);
    });

    it('Should handle UPDATE_ACTIVE_CURRENCY', () => {
        expect(currencyReducer(INITIAL_DATA, {
            type: UPDATE_ACTIVE_CURRENCY,
            id: 'BTC'
        })).toEqual([
            {
                name: 'US Dollars',
                code: 'USD',
                balance: 156.12,
                precision: 2,
                active: false
            },
            {
                name: 'Bitcoin',
                code: 'BTC',
                balance: 0,
                precision: 8,
                active: true
            }
        ])
    });

    it('Should handle UPDATE_CURRENCY_BALANCE', () => {
        expect(currencyReducer(INITIAL_DATA, {
            type: UPDATE_CURRENCY_BALANCE,
            currency: Object.assign({}, INITIAL_DATA[0], { balance: 0 })
        })).toEqual([
            {
                name: 'US Dollars',
                code: 'USD',
                balance: 0,
                precision: 2,
                active: true
            },
            {
                name: 'Bitcoin',
                code: 'BTC',
                balance: 0,
                precision: 8,
                active: false
            }
        ])
    });
});