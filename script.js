const axios = require('axios');

// Skyscanner API credentials
const API_KEY = 'YOUR_API_KEY';

// Function to fetch flight prices
async function getFlightPrices(source, destination, date) {
  try {
    const response = await axios.get('https://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/US/USD/en-US/' + source + '/' + destination + '/' + date + '?apiKey=' + API_KEY);
    const { Quotes } = response.data;
    const prices = {};

    Quotes.forEach(quote => {
      const { MinPrice, Direct, CarrierIds } = quote;
      const carriers = response.data.Carriers.filter(carrier => CarrierIds.includes(carrier.CarrierId));
      const carrierNames = carriers.map(carrier => carrier.Name);
      const flightInfo = carrierNames.join(', ');

      prices[flightInfo] = '₹' + MinPrice;
    });

    return prices;
  } catch (error) {
    console.error('Error fetching flight prices:', error.response.data);
    return null;
  }
}

// Example usage
const source = 'Delhi';
const destination = 'Jaipur';
const date = '2023-04-15';

getFlightPrices(source, destination, date)
  .then(prices => {
    if (prices) {
      console.log(prices);
    }
  });
