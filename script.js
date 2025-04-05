document.getElementById('weatherForm').addEventListener('submit', function (e) {
    e.preventDefault(); 

    const city = document.getElementById('city').value.trim();
    const weatherResult = document.getElementById('weatherResult');

    if (city === '') {
        weatherResult.innerHTML = `<p>Please enter a city name.</p>`;
        return;
    }

    const apiKey = '9720c892e120b2e1a4c53ac55889b639'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    weatherResult.innerHTML = `<p>Loading weather data...</p>`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const { name, main, weather, wind } = data;
            const temperature = main.temp;
            const humidity = main.humidity;
            const windSpeed = wind.speed;
            const description = weather[0].description;
            const icon = weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

            weatherResult.innerHTML = `
                <h2>${name}</h2>
                <img src="${iconUrl}" alt="${description}">
                <p><strong> Temperature: ${temperature}°C</strong></p>
                <p> Humidity: ${humidity}%</p>
                <p> Wind Speed: ${windSpeed} m/s</p>
                <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
            `;
        })
        .catch(error => {
            weatherResult.innerHTML = `<p>${error.message}</p>`;
        });
});
