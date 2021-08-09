fetch('https://ipwhois.app/json/')
  .then((r) => r.json())
  .then((ipres) => {
    console.log(ipres);
    let cc = ipres.country_code;
    let lc = localStorage.getItem('languageCode');
    let hi_query = `https://fourtonfish.com/hellosalut/`;
    if (lc) hi_query = `${hi_query}?lang=${lc}`;
    else hi_query = `${hi_query}?cc=${cc}`;
    console.log(hi_query);
    fetch(hi_query)
      .then((r) => r.json())
      .then((json) => {
        document.querySelector('.loader').style.display = 'none';
        console.log(json);
        document.querySelector('#hello').innerHTML = json.hello;
        document.querySelector('#username').innerHTML =
          localStorage.getItem('username');
        document.querySelector('#ip').textContent = ipres.ip;
        document.querySelector('#city').textContent = ipres.city;
        document.querySelector('#region').textContent = ipres.region;
        document.querySelector('#country').textContent = ipres.country;
        const flag = new Image();
        flag.className = 'flag';
        flag.onload = () => {
          document.querySelector('#country').appendChild(flag);
        };
        flag.src = ipres.country_flag;
        flag.alt = 'Country Flag';
        document.querySelector(
          '#currency'
        ).textContent = `${ipres.currency}(${ipres.currency_symbol})`;
        document.querySelector('#long').textContent = ipres.longitude;
        document.querySelector('#lat').textContent = ipres.latitude;
        document.querySelector(
          '#tz'
        ).innerHTML = `${ipres.timezone}</br>(${ipres.timezone_gmt})`;
      });
  });

document.querySelector('#logout').addEventListener('click', () => {
  const bye = document.querySelector('.bye');
  bye.style.display = 'grid';
  bye.textContent = `Have a great day ${localStorage.getItem('username')}!`;
  setTimeout(() => {
    window.history.back();
  }, 2000);
});
