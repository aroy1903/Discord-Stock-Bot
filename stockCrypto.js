const axios = require('axios');
require('dotenv').config();

const getStock = async (symbol) => {
  const { APIKEY } = process.env;

  const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1min&apikey=${APIKEY}`;
  let data;
  try {
    await axios
      .get(url)
      .then((res) => {
        data = res.data;
      })
      .catch((err) => console.log);
    const stockPrice = parseFloat(data.values[0].high);
    return `${symbol.toUpperCase()}: $${stockPrice.toFixed(2)}`;
  } catch (err) {
    return 'Invalid Stock';
  }
};

const getCoin = async (symbol) => {
  const { CRYPTOAPI } = process.env;
  const url = `http://api.coinlayer.com/api/live?access_key=${CRYPTOAPI}&symbols=${symbol}`;
  let data;
  try {
    await axios
      .get(url)
      .then((res) => {
        data = res.data;
      })
      .catch((err) => console.log);
    const coinValue = Object.values(data.rates);
    const val = parseFloat(coinValue[0]);
    return `${symbol.toUpperCase()}: $${val.toFixed(2)}`;
  } catch (err) {
    return 'Invalid Coin';
  }
};

module.exports = { getStock, getCoin };
