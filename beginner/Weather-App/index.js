const search = document.querySelector('#city_name');
const loader = document.querySelector('.loading');
const key = '836cf1cc4017da9d367d3ad71a2ccafe';

async function updateDOM(res, city) {
  function toTimeString(fromDate) {
    return fromDate
      .toLocaleTimeString(navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
        timeZone: res.timezone,
      })
      .toLocaleLowerCase();
  }

  console.log(res);

  let today = new Date(0);
  today.setUTCSeconds(res.current.dt);
  document.querySelector('#city').textContent = city;
  document.querySelector('#day').textContent = today.toLocaleDateString(
    navigator.language,
    {
      weekday: 'long',
      timeZone: res.timezone,
    }
  );
  document.querySelector('#time').textContent = toTimeString(today);

  document.querySelector('#weather_description').textContent =
    res.current.weather[0].description;

  document.querySelector(
    '#weather_icon'
  ).src = `https://openweathermap.org/img/wn/${res.current.weather[0].icon}@2x.png`;

  document.querySelector(
    '#weather_temp'
  ).textContent = `${res.current.temp}° C`;

  document.querySelector(
    '#feels_like_temp'
  ).textContent = `${res.current.feels_like}° C`;

  document.querySelector(
    '#humidity > .value'
  ).textContent = `${res.current.humidity}%`;

  document.querySelector('#uvi > .value').textContent = `${res.current.uvi}`;

  document.querySelector(
    '#cloud > .value'
  ).textContent = `${res.current.clouds}%`;

  let sunrise = new Date(0);
  sunrise.setUTCSeconds(res.current.sunrise);
  document.querySelector('#sunrise > .value').textContent = `${toTimeString(
    sunrise
  )}`;

  let sunset = new Date(0);
  sunset.setUTCSeconds(res.current.sunset);
  document.querySelector('#sunset > .value').textContent = `${toTimeString(
    sunset
  )}`;

  let forecastTile = document.querySelectorAll('.forecast_tile');
  for (let i = 0; i < forecastTile.length; ++i) {
    let today = new Date(0);
    today.setUTCSeconds(res.daily[i + 1].dt);
    forecastTile[i].querySelector('.day').textContent = today
      .toLocaleDateString(navigator.language, {
        weekday: 'short',
        timeZone: res.timeZone,
      })
      .toLocaleUpperCase();

    forecastTile[i].querySelector(
      '.icon > img'
    ).src = `https://openweathermap.org/img/wn/${
      res.daily[i + 1].weather[0].icon
    }@2x.png`;
    forecastTile[i]
      .querySelector('.icon > img')
      .setAttribute('title', res.daily[i + 1].weather[0].description);

    forecastTile[i].querySelector('.highest').textContent =
      res.daily[i + 1].temp.max + '°';

    forecastTile[i].querySelector('.lowest').textContent =
      res.daily[i + 1].temp.min + '°';
  }
}

async function getTemp(city) {
  let lon = '';
  let lat = '';
  try {
    let res = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${city}&format=json`,
      {
        mode: 'cors',
      }
    );
    if (res.ok) {
      res = await res.json();
      if (res.length === 0) {
        alert('Please Enter a Valid City Name 😭');
        return;
      }
      lon = res[0].lon;
      lat = res[0].lat;
      console.log(lat, lon, city);
      localStorage.setItem('userCity', city);
    } else {
      throw new Error('API Down 🤷‍♀️');
    }
  } catch (e) {
    console.error(e);
    alert('Unable to Resolve City Name 😢');
    return;
  }
  try {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${key}`,
      {
        mode: 'cors',
      }
    );
    if (res.ok) {
      res = await res.json();
      await updateDOM(res, city);
    } else {
      throw new Error('API Down 🤷‍♀️');
    }
  } catch (e) {
    console.error(e);
    alert('Unable to Fetch Weather 😢');
    document.body.innerHTML = '';
    return;
  }
}

async function resolveCity(e) {
  loader.style.display = 'flex';
  let city = '';
  if (e) {
    if (e.target.value === '') {
      loader.style.display = 'none';
      return;
    }
    city = e.target.value;
    e.target.value = '';
  } else {
    if (localStorage.getItem('userCity')) {
      city = localStorage.getItem('userCity');
    } else {
      try {
        let res = await fetch('https://ipapi.co/json/', {
          mode: 'cors',
        });
        if (res.ok) {
          res = await res.json();
          city = res.city;
        } else {
          throw new Error('API Down 🤷‍♀️');
        }
      } catch (e) {
        alert('Unable to Fetch Location');
        city = 'Pune';
        console.error(e);
        return;
      }
    }
  }
  console.log(city);
  await getTemp(city);
  loader.style.display = 'none';
}

search.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.target.blur();
    resolveCity(e);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  resolveCity();
});
