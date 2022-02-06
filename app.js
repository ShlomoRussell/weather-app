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
  const notValid='Please fill at least one'
  if (!form.city.checkValidity() && !form.zip.checkValidity()) {
    zip.placeholder = notValid;
    city.placeholder = notValid;
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
  document.querySelectorAll('input[type="search"]').forEach(i=>i.placeholder="")
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


const presentation = (data) => {
 const html=  Object.entries(data.main).map(k => {
   return `<tr>
    <td>${k[0].replace('_',' ')}</td>
    <td>${k[1]}</td>
    </tr>`;
    
  })
  showWeather.innerHTML += html.join(' ');
};