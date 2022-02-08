const API_KEY = "6b919c8e2b468c795b08994ffab6d977";
const UNITS = {
  celsius: "metric",
  farenheit: "imperial",
};
function builder() {
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let parameters = null;

  const init = (appid) => {
    parameters = { appid: appid };
  };

  const chooseCity = (city) => {
    parameters.q = city.replace(" ", "%20");
  };

  const setCoordinates = (coords) => {
    parameters["lat"] = coords.lat;
    parameters["lon"] = coords.lon;
    cashe_key = `${coords.lat},${coords.lon}`;
  };

  const setZip = (zip, countryCode) => {
    parameters.zip = `${zip},${countryCode}`;
  };

  const chooseUnit = (unit) => {
    parameters.units = unit;
  };

  const finish = () => {
    const finishUrl = Object.entries(parameters).map((k) => `${k[0]}=${k[1]}`);
    console.log(baseUrl + finishUrl.join("&"));
    return baseUrl + finishUrl.join("&");
  };
  return {
    init,
    chooseCity,
    chooseUnit,
    coordinates: setCoordinates,
    setZip,
    finish,
  };
}

const start = builder();
