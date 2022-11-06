const axios = require('axios');
require('dotenv').config();

const getStock = async (symbol) => {
  const { APIKEY } = process.env;
  const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1min&apikey=${APIKEY}`;
  let data;
  try {
    const getData = await axios.get(url);
    const data = await getData.data;
    const stockPrice = parseFloat(data.values[0].close);
    return `${symbol.toUpperCase()}: $${stockPrice.toFixed(2)}`;
  } catch (err) {
    return `${symbol.toUpperCase()} is an invalid Stock`;
  }
};

const getCoin = async (symbol) => {
  const { CRYPTOAPI } = process.env;
  const url = `http://api.coinlayer.com/api/live?access_key=${CRYPTOAPI}&symbols=${symbol}`;

  try {
    const getData = await axios.get(url);
    const data = await getData.data;
    const coinValue = Object.values(data.rates);
    const val = parseFloat(coinValue[0]);
    return `${symbol.toUpperCase()}: $${val.toFixed(2)}`;
  } catch (err) {
    return `${symbol.toUpperCase()} is either an invalid coin or unavailable`;
  }
};

module.exports = { getStock, getCoin };
