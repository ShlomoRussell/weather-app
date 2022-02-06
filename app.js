const city = document.getElementById("city");
const units = document.getElementById("units");
const search = document.getElementById("search");
const gps = document.querySelector(".location");
const gpsCont =document.querySelector('.by-location')
const showWeather = document.querySelector(".show-weather");
const form = document.querySelector("form");
const zip = document.getElementById('zip');

search.addEventListener("click", (e) => {
    e.preventDefault();
  if (!form.city.checkValidity() && !form.zip.checkValidity()) {
    zip.placeholder = 'Please fill at least one';
    city.placeholder = "Please fill at least one";
    return;
  }
  else if (!form.zip.checkValidity() && form.city.checkValidity()) {
    getData(city.value);
  } else {
    getData(Number(zip.value));
  }
    start.chooseUnit(UNITS[units.value]);
  form.reset()
  document.querySelectorAll('input[type="search"]').forEach(i=>i.placeholder="")
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
    gpsCont.innerHTML = "Geolocation is not supported by this browser.";
    }
    form.city.setAttribute("required", 'required');
});

const getData = (data) => {
    start.init(API_KEY);
  if (typeof data == 'object') {
      start.coordinates(data);
        
    }
    else if (typeof data == 'number') {
      start.setZip(data)
  }
    else {
        start.chooseCity(data);
}
    start.chooseUnit(UNITS[units.value]);
    start.finish();
}
