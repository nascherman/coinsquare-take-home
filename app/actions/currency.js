export const ADD_CURRENCY = 'ADD_CURRENCY';
export const UPDATE_CURRENCY_BALANCE = 'UPDATE_CURRENCY_BALANCE';
export const UPDATE_ACTIVE_CURRENCY = 'UPDATE_ACTIVE_CURRENCY';

export function addCurrency (currency) {
    return {
        type: ADD_CURRENCY,
        currency
    };
}

export function updateCurrencyBalance (currency) {
    return {
        type: UPDATE_CURRENCY_BALANCE,
        currency
    }
}

export function updateActiveCurrency (id) {
    return {
        type: UPDATE_ACTIVE_CURRENCY,
        id
    }
}