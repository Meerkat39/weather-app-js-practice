// オブジェクトの取得
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const cityNameText = document.querySelector("#cityName");
const displayIcon = document.querySelector("#display-icon");
const weatherNameText = document.querySelector("#weather-name");
const temperatureText = document.querySelector("#temperature");
const humidityText = document.querySelector("#humidity");
const windSpeedText = document.querySelector("#wind-speed");
const pressureText = document.querySelector("#pressure");

const updateHTML = (weatherInfo) => {
  // データの取得
  const cityName = searchInput.value;
  let weatherName = weatherInfo.weather[0].main;
  let iconName = weatherInfo.weather[0].icon;
  let temperature = Math.round(weatherInfo.main.temp - 273.15);
  let humidity = weatherInfo.main.humidity;
  let windSpeed = weatherInfo.wind.speed;
  let pressure = weatherInfo.main.pressure;

  // テキストの更新
  cityNameText.innerHTML = cityName;
  weatherNameText.innerHTML = weatherName;
  temperatureText.innerHTML = temperature + "℃";
  humidityText.innerHTML = humidity + "%";
  windSpeedText.innerHTML = windSpeed + " m/s";
  pressureText.innerHTML = pressure + " hPa";

  // アイコンの更新
  const newImg = document.createElement("img");
  newImg.src = `https://openweathermap.org/img/wn/${iconName}@2x.png`;
  const oldImg = document.querySelector("#weather-icon");
  if (oldImg) oldImg.remove(); // 旧画像が残っているなら削除
  newImg.id = "weather-icon";
  displayIcon.append(newImg);
};

searchButton.addEventListener("click", async () => {
  const city = searchInput.value;

  try {
    const res = await axios.get(`/weather?city=${city}`);
    const weatherInfo = res.data;
    updateHTML(weatherInfo);
  } catch (error) {
    alert(error.response.data.error);
  }
});
