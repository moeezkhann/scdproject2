document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "73914a09887e7e5cf006d54d71f418df"; 
  const weatherContainer = document.querySelector(".weather-container");
  const background = document.querySelector(".background");
  const locationElement = document.querySelector(".location");
  const temperatureElement = document.querySelector(".temperature");
  const weatherDescriptionElement = document.querySelector(".weather-description");
  const searchInput = document.querySelector(".search-input");
  const searchButton = document.querySelector(".search-button");

  const weatherBackgrounds = {
    "Clear": "sunny.png",
    "Clouds": "cloudy.png",
    "Rain": "rainy.png",
    "Snow": "snowy.png",
  };

  async function getWeatherData(city) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
      if (!response.ok) {
        throw new Error("Weather data not found.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  }

  function updateWeatherUI(weatherData) {
    if (!weatherData) return;

    const { name, main, weather } = weatherData;
    const temperature = main.temp;
    const weatherDescription = weather[0].description;
    const weatherCondition = weather[0].main;

    locationElement.textContent = name;
    temperatureElement.textContent = `${temperature}°C`;
    weatherDescriptionElement.textContent = weatherDescription;

    const backgroundImagePath = weatherBackgrounds[weatherCondition];
    if (backgroundImagePath) {
      background.style.backgroundImage = `url('${backgroundImagePath}')`;
    }
  }

  searchButton.addEventListener("click", async () => {
    const city = searchInput.value.trim();
    if (city !== "") {
      const weatherData = await getWeatherData(city);
      updateWeatherUI(weatherData);

      // Clear the input after a successful search
      searchInput.value = "";
    }
  });

  // Initialization function
  async function init() {
    const city = "London"; // Default city
    const weatherData = await getWeatherData(city);
    updateWeatherUI(weatherData);
  }

  init();
});
