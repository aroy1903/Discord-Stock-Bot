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

module.exports = getStock;
