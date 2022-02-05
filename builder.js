const API_KEY = "6b919c8e2b468c795b08994ffab6d977";
const UNITS = {
  celsius: "metric",
  farenheit: "imperial",
};
function builder() {
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let parameters = null;
  let cashe_key;
  const init = (appid) => {
    parameters = { appid: appid };
  };

  const chooseCity = (city) => {
    parameters.q = city;
    cashe_key = city;
  };

  const coordinates = (coords) => {
    parameters["lat"] = coords.lat;
    parameters["lon"] = coords.lon;
    cashe_key = `${coords.lat},${coords.lon}`;
  };

  const chooseUnit = (unit) => {
    parameters.units = unit;
  };

  const finish = () => {
      const finishUrl = Object.entries(parameters).map((k) => `${k[0]}=${k[1]}`);
      console.log(baseUrl + finishUrl.join("&"));
    return fetchApi(baseUrl + finishUrl.join("&"), cashe_key);
  };
  return {
    init: init,
    chooseCity: chooseCity,
    chooseUnit: chooseUnit,
    coordinates: coordinates,
    finish: finish,
  };
}

const start = builder();
