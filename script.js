

const apiKey = " Enter your api key ";


async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const errorMsg = document.getElementById("errorMsg");
  const weatherDisplay = document.getElementById("weatherDisplay");

  if (!city) {
    errorMsg.textContent = "Please enter a city.";
    errorMsg.classList.remove("hidden");
    weatherDisplay.classList.add("hidden");
    return;
  }

  try {
    // Fetch current weather
    const resCurrent = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    if (!resCurrent.ok) throw new Error("City not found.");

    const currentData = await resCurrent.json();
    const { name, weather, main } = currentData;

    // Display current
    document.getElementById("cityName").textContent = name;
    document.getElementById("description").textContent = weather[0].description;
    document.getElementById("temp").textContent = `${main.temp}°C`;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    // Fetch 3-day forecast (every 8th item = daily approx)
    const resForecast = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    );
    const forecastData = await resForecast.json();

    const forecastEl = document.getElementById("forecast");
    forecastEl.innerHTML = ""; // Clear previous

    for (let i = 8; i <= 24; i += 8) {
      const item = forecastData.list[i];
      const date = new Date(item.dt_txt);
      const day = date.toLocaleDateString("en-US", { weekday: "short" });
      const icon = item.weather[0].icon;
      const desc = item.weather[0].description;
      const temp = item.main.temp;

      forecastEl.innerHTML += `
        <div class="bg-white p-4 rounded-lg shadow text-center">
          <h4 class="font-semibold">${day}</h4>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" class="w-12 h-12 mx-auto" />
          <p class="capitalize text-gray-700 text-sm">${desc}</p>
          <p class="font-bold mt-1">${temp}°C</p>
        </div>
      `;
    }

    errorMsg.classList.add("hidden");
    weatherDisplay.classList.remove("hidden");
  } catch (err) {
    errorMsg.textContent = err.message;
    errorMsg.classList.remove("hidden");
    weatherDisplay.classList.add("hidden");
  }
}





