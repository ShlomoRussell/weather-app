const CITY_WEATHER_CACHE = {};

async function fetchApi(apiAddress, cashe_key) {
  fetch(apiAddress)
    .then((data) => data.json())
    .then(
      (data) => (
        (CITY_WEATHER_CACHE[cashe_key] = new Weather(data)), presentation(data)
      )
    );
}

function Weather(data) {
  for (let prop in data) {
    this[prop] = data[prop];
    }
    this.timestamp = new Date();
}
