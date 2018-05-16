import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TradeCurrencyMenu from '../../app/components/TradeCurrencyMenu';
import configureStore from 'redux-mock-store'

Enzyme.configure({adapter: new Adapter()});

jest.unmock("../../app/utils/api");
const api = require('../../app/utils/api');

api.getLastPriceBTC = jest.fn(() => Promise.resolve('8000'));

const MOCK_CURRENCIES = [ // would be part of an API response
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
const INITIAL_STATE = {
    amount: '',
    quote: '',
    lastPrice: '8000'
};

let store;

function setup() {
    const mockStore = configureStore();
    store = mockStore({ currency: MOCK_CURRENCIES });

  const enzymeWrapper = shallow(<TradeCurrencyMenu store={store} originalCurrencyCode={'USD'} />);
  return {
      store,
      enzymeWrapper
  }
}

describe('components', () => {
    describe('TradeCurrenyMenu', () => {
        it('should render self with stored props', () => {
            const {enzymeWrapper} = setup();

            const props = enzymeWrapper.props();
            expect(props.currency).toBe(MOCK_CURRENCIES);
        });

        it('Should get the active currency', () => {
            const {enzymeWrapper} = setup();

            expect(enzymeWrapper.dive().instance().getActiveCurrency()).toBe(MOCK_CURRENCIES[0]);
        });

        it('Should get the quoted currency', () => {
            const {enzymeWrapper} = setup();

            expect(enzymeWrapper.dive().instance().getQuotedCurrency()).toBe(MOCK_CURRENCIES[1]);
        });

        it('Should update the state quoted value', () => {
            const {enzymeWrapper} = setup();
            const instance = enzymeWrapper.dive().instance();
            instance.state = INITIAL_STATE;
            const event = {
                target: {
                    value: '100'
                }
            };

            instance.updateQuote(event);

            expect(instance.state).toEqual({
                amount: '100',
                lastPrice: '8000',
                quote: 100 / 8000
            });
        });

        // it('Should handle trades by updating the store', () => {
        //     const {enzymeWrapper, store} = setup();
        //     const instance = enzymeWrapper.dive({ context: {store}}).instance();
        //     const event = {
        //         target: {
        //             value: '100'
        //         }
        //     };
        //
        //     console.log('DISPATCH', instance.props.dispatch);
        //     // const spy = jest.spyOn(instance.props.dispatch);
        //
        //     instance.state = INITIAL_STATE;
        //
        //     instance.updateQuote(event);
        //     instance.handleTrade();
        //
        //     expect(instance.props.currency).toBe([]);
        //     expect(instance.state).toEqual({
        //         amount: '',
        //         quote: '',
        //         lastPrice: '8000'
        //     });
        // });
        //
        // it('Handle a currency switch by changing the store and clearing state', () => {
        //     const {enzymeWrapper, store} = setup();
        // });
    });
});