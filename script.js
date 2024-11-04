import apiKey from './config.js' ;
const container=document.querySelector(".container"); //City Search
const cityName=document.querySelector(".cityName"); //City Name
const getWeatherBtn=document.getElementById("getWeatherBtn"); // Get Weather Button
const result=document.querySelector(".result"); //Weather Data


//capitalizing first letter
function capitalizeCityName(city) {
    return city.split(' ')
               .map(word => word.charAt(0).toUpperCase() + word.slice(1))
               .join(' ');
}



// Function to fetch and display weather
const getWeather = async () => {
    const city= cityName.value.trim();

    if(city){
        container.style.display = 'none';  //hides the input page
        result.innerHTML = `<p>Fetching weather for <strong>${capitalizeCityName(city)}</strong>....</p>`
        result.style.display= 'block'; //Show the weather result

        try{
            //Fetch weather data from OpenWeatherMap API
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            const response = await fetch(url);

            if(!response.ok){
                throw new Error('City not found or invalid input');
            }

             // Parse JSON data from response
            const data =await response.json();

            // Accessing the properties of the data object
            const temperature= data.main.temp;
            const tempMin = data.main.temp_min;
            const tempMax = data.main.temp_max; 
            const description = data.weather[0].description;
            const humidity = data.main.humidity;
            const wind = data.wind.speed; // Wind speed in m/s
            const weatherId = data.weather[0].id; // Get weather ID

            //Display the data
            result.innerHTML= `
                <div class="cityDisplay">${capitalizeCityName(city)}</div>
                <div class="weatherEmoji">${getWeatherEmoji(weatherId)}</div>
                <div class="tempDisplay">${temperature}°C</div>
                <div class="tempContainer">
                    <div class="tempMin">${tempMin}°C</div>
                    <div class="tempMax">${tempMax}°C</div>
                 </div>
                 <br>
                <div class="descDisplay">${description}</div>
                <hr>
                <div class="humidityDisplay"><b>Humidity:</b> ${humidity}%</div>
                <div class="speedDisplay"><b>Wind Speed:</b> ${wind} m/s</div>
                
                <!-- Another city -->
                <button id="Btn">Another City</button> 
            `;
           // Add event listener to the reset button
           document.getElementById("Btn").addEventListener('click', () => {
            cityName.value = ''; // Clear the city input
            result.style.display = 'none'; // Hide results
            container.style.display = 'block'; // Show input again
        });
        }
        catch(error){
            result.innerHTML=`<p class="errorDisplay">Error: ${error.message}</p>`; // Error Handling
        }
    }
    else{
        alert("Please enter a city name.")
    }
};

// Event listener for the button click
getWeatherBtn.addEventListener('click', getWeather);

// Event listener for pressing "Enter" key in the input field
cityName.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { // Check if "Enter" key is pressed
        getWeather();
    }
});

// Function to get weather emoji based on the weather ID
function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈⚡"; // Thunderstorm
        case (weatherId >= 300 && weatherId < 400):
            return "☔"; // Drizzle
        case (weatherId >= 500 && weatherId < 600):
            return "🌧"; // Rain
        case (weatherId >= 600 && weatherId < 700):
            return "❄"; // Snow
        case (weatherId >= 700 && weatherId < 800):
            return "🌫"; // Mist
        case (weatherId === 800):
            return "☀"; // Clear sky
        case (weatherId >= 801 && weatherId < 810):
            return "☁"; // Few clouds
        default:
            return "❓"; // Unknown weather
    }
}