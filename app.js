const city = document.getElementById("city");
const units = document.getElementById("units");
const search = document.getElementById("search");
const gps = document.querySelector(".location");
const gpsCont = document.querySelector(".by-location");
const showWeather = document.querySelector(".show-weather");
const form = document.querySelector("form");
const zip = document.getElementById("zip");
const links = document.querySelectorAll(".links");
const loading = document.querySelector(".spinner-border");


search.addEventListener("click",submit)

  function submit(e) {
    e.preventDefault();
    const input = document.querySelector('input[type="search"]');
    const select = document.getElementById("country-list");
    loading.classList.remove("invisible");
    if (!form.checkValidity()) {
      input.placeholder = "Please fill in this field";
      loading.classList.add("invisible");
      return;
    } else if (select) {
      getData(input.value, select.value);
    }
    else {
      getData(input.value)
    }
    start.chooseUnit(UNITS[units.value]);
    form.reset();
    input.placeholder = "";
};


gps.addEventListener("click", (e) => {
  e.preventDefault();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      getData({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  } else {
    gpsCont.innerHTML = "Geolocation is not supported by this browser.";
  }
 document.querySelector('input[type="search"]').placeholder=""
});

const getData = (data,select) => {
  if (CITY_WEATHER_CACHE[data])
    return presentation(CITY_WEATHER_CACHE[data], data);

  start.init(API_KEY);
  if (typeof data == "object") {
    start.coordinates(data);
  } else if (/^[0-9]*$/.test(data)) {
    start.setZip(data, countryList[select].toLowerCase());
   // start.setCountryCode(countryList[select]);
  } else {
    start.chooseCity(data);
  }
  start.chooseUnit(UNITS[units.value]);
  start.finish();
};

const presentation = (data, cashe_key) => {
  const html = Object.entries(data.main).map((k) => {
    return `<tr>
    <td>${k[0].replace("_", " ")}</td>
    <td>${checkRegex(k[0], k[1])}</td>
    </tr>`;
  });
  loading.classList.add("invisible");
  showWeather.innerHTML = `<thead>
                              <tr>
                                <th colspan="2">Current Weather for ${
                                  CITY_WEATHER_CACHE[cashe_key].name
                                }
                                </th>
                              </tr>
                          </thead>
                          <tbody>${html.join(" ")}
                          </tbody>`;
};

const selectInnerHTML = (countries) => {
  for (let prop in countryList) {
    countries.innerHTML += `<option value="${prop}">${prop}</option>`;
  }
};

links.forEach((k) => {
  k.addEventListener("click", (e) => {
    if (e.target.dataset.id == "city") {
      toHtml("city");
    } else {
      toHtml("zip");
    }
  });
});

const formHtml = document.querySelector(".form-switch");
function toHtml(html) {
  formHtml.innerHTML = ` <label for="${html}">By ${html}</label>
        <input type="search" required name="${html}" id="${html}"/>${
    html == "zip"
      ? '<label for="country-list">Choose a country</label><select required name="country"  id="country-list"><option value=""></option></select>'
      : ""
  }`;
  if (html == 'zip') {
    const countries = document.getElementById("country-list");
    selectInnerHTML(countries);
  }
  search.addEventListener("click",submit)
}

function checkRegex(rex, str) {
  const measure = {
    metric: "meters",
    imperial: "feet",
  };
  if (/feel|temp/.test(rex)) {
    return `${str}\u00B0`;
  } else if (/humidity/.test(rex)) {
    return `${str}%`;
  } else if (/pressure/.test(rex)) {
    return `${str}mb`;
  } else if (/level/.test(rex)) {
    return `${str} ${measure[UNITS[units.value]]}`;
  }
}
