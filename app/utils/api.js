const API_URL = 'https://api.bitfinex.com/v1';
const MOCK_PRICE = '8729.2';

/**
 * A proxy API server is required for this since the browser
 * block requests without the Access-Control-Allow-Origin
 * header.
 * @returns {Promise<{last_price: *}>}
 */
export function getLastPriceBTC() {
    return fetch(
        `${API_URL}/pubticker/btcusd`,
    )
        .then(response => response.json())
        .then(({last_price}) => last_price)
        .catch(() => {
            return MOCK_PRICE;
        });
}