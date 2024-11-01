// netlify/functions/getWeather.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
  const city = event.queryStringParameters.city;
  const API_KEY = process.env.API_KEY; // Access the API key securely from Netlify's environment variables
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return { statusCode: 404, body: JSON.stringify({ message: "City not found or invalid input" }) };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: error.toString() }) };
  }
};