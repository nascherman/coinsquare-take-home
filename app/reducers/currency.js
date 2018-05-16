import {
    ADD_CURRENCY, UPDATE_ACTIVE_CURRENCY,
    UPDATE_CURRENCY_BALANCE,
} from "../actions/currency";

import {
    RECEIVE_DATA
} from '../actions/shared';

export default function currency(state = [], action) {
    switch (action.type) {
        case ADD_CURRENCY:
            return state.concat([action.currency]);
        case UPDATE_CURRENCY_BALANCE:
            return state.map(currency => {
                return currency.code === action.currency.code ?
                    action.currency : currency;
            });
        case UPDATE_ACTIVE_CURRENCY:
            return state.map(currency => {
               return currency.code === action.id ?
                   Object.assign({}, currency, { active: true }) :
                   Object.assign({}, currency, { active: false })
            });
        case RECEIVE_DATA:
            return action.currency;
        default:
            return state;
    }
}