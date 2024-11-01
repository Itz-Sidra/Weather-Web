// netlify/functions/getWeather.js
import fetch from 'node-fetch';

export const handler = async (event) => {
    const city = event.queryStringParameters.city; // Assuming city is passed as a query parameter
    const apiKey = process.env.API_KEY; // Make sure to set your API key in Netlify environment variables
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'City not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch weather data' }),
        };
    }
};