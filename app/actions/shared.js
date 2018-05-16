export const RECEIVE_DATA = 'RECEIVE_DATA';

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

function receiveData (currency) {
    return {
        type: RECEIVE_DATA,
        currency
    }
}

export function handleInitialData () {
    return dispatch => {
        dispatch(receiveData(INITIAL_DATA));
    }
}