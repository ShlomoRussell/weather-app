const city = document.getElementById("city");
const units = document.getElementById("units");
const search = document.getElementById("search");
const gps = document.querySelector(".location");
const showWeather = document.querySelector(".show-weather");
const showText = document.querySelector(".show-text");
const form = document.querySelector("form");

search.addEventListener("click", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
        city.value = city.validationMessage; 
        return
    }
  
  getData(city.value);
  start.chooseUnit(UNITS[units.value]);
});

const presentation = (data) => {
  showWeather.innerHTML += data.main.temp;
};

gps.addEventListener("click", (e) => {
  e.preventDefault();
  form.city.removeAttribute("required");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      getData({lat:position.coords.latitude, lon:position.coords.longitude});
    });
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
    }
    form.city.setAttribute("required", 'required');
});

const getData = (data) => {
    start.init(API_KEY);
    if (typeof data !== 'object') {
        start.chooseCity(data);
    }
    else {
        start.coordinates(data)
}
    start.chooseUnit(UNITS[units.value]);
    start.finish();
}
