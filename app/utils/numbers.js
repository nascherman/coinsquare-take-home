export function roundNumber(number, precision) {
   return parseFloat(Math.round(number * 100000000) / 100000000).toFixed(precision);
}

export function getQuote(amount, lastPrice) {
    return Number(amount) / Number(lastPrice);
}