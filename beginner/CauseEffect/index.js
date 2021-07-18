let people = [];

let firstNames = [
  'Aaliyah',
  'Aaron',
  'Abagail',
  'Abbey',
  'Abbie',
  'Abbigail',
  'Abby',
  'Abdiel',
  'Abdul',
  'Percival',
  'Percy',
  'Perry',
  'Pete',
  'Peter',
  'Petra',
];

const lastNames = [
  'Abbott',
  'Abernathy',
  'Abshire',
  'Adams',
  'Altenwerth',
  'Anderson',
  'Schroeder',
  'Schulist',
  'Schultz',
  'Schumm',
  'Schuppe',
  'Bahringer',
  'Bailey',
  'Balistreri',
  'Barrows',
  'Bartell',
  'Bartoletti',
  'Barton',
  'Bashirian',
  'Batz',
  'Bauch',
  'Baumbach',
  'Bayer',
];

const countries = [
  'Chili',
  'China',
  'Christmas Island',
  'Clipperton Island',
  'Cocos (Keeling) Islands',
  'Colombia',
  'Comoren (Unie)',
  'Congo (Democratische Republiek)',
  'Congo (Volksrepubliek)',
  'Cook',
  'Coral Sea Islands',
  'Costa Rica',
  'Cuba',
  'Cyprus',
  'Denemarken',
];

const cities = [
  'Baden-Württemberg',
  'Bayern',
  'Berlin',
  'Brandenburg',
  'Bremen',
  'Hamburg',
  'Hessen',
  'Mecklenburg-Vorpommern',
  'Niedersachsen',
  'Nordrhein-Westfalen',
  'Rheinland-Pfalz',
  'Saarland',
  'Sachsen',
  'Sachsen-Anhalt',
  'Schleswig-Holstein',
  'Thüringen',
];

const streets = [
  'Green',
  'Greens',
  'Grove',
  'Groves',
  'Harbor',
  'Harbors',
  'Haven',
  'Heights',
  'Highway',
  'Hill',
  'Hills',
  'Hollow',
  'Inlet',
  'Inlet',
  'Island',
  'Island',
  'Islands',
  'Islands',
  'Isle',
  'Isle',
  'Junction',
  'Junctions',
  'Key',
  'Keys',
  'Knoll',
  'Knolls',
  'Lake',
  'Lakes',
  'Land',
  'Landing',
  'Lane',
  'Light',
  'Lights',
  'Loaf',
  'Lock',
  'Locks',
  'Locks',
  'Lodge',
  'Lodge',
];

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomBirthday = () => {
  return `${getRandomNumber(1, 28)}/${getRandomNumber(1, 12)}/${getRandomNumber(
    1990,
    2020
  )}`;
};

const getRandomTelephone = () => {
  return `${getRandomNumber(100, 999)}-${getRandomNumber(
    100,
    999
  )}-${getRandomNumber(1000, 9999)}`;
};

const getRandomName = () => {
  return `${firstNames[getRandomNumber(0, firstNames.length - 1)]} ${
    lastNames[getRandomNumber(0, lastNames.length - 1)]
  }`;
};

const getRandomCountry = () => {
  return countries[getRandomNumber(0, countries.length - 1)];
};

const getRandomCity = () => {
  return cities[getRandomNumber(0, cities.length - 1)];
};

const getRandomStreet = () => {
  return `${getRandomNumber(1000, 9999)} ${
    streets[getRandomNumber(0, streets.length - 1)]
  }`;
};

for (let i = 0; i < 10; ++i) {
  people.push({
    name: getRandomName(),
    street: getRandomStreet(),
    city: getRandomCity(),
    country: getRandomCountry(),
    telephone: getRandomTelephone(),
    birthday: getRandomBirthday(),
  });
}

console.log(people);

let frag = document.createDocumentFragment();
people.forEach((p) => {
  let name = document.createElement('div');
  name.classList.add('summary_item');
  name.textContent = p.name;
  frag.appendChild(name);
});
document.querySelector('#summary').appendChild(frag);

const render = (person) => {
  const selected = document.querySelector('.selected');
  if (selected) selected.classList.remove('selected');
  document.querySelector('.name').textContent = person.name;
  document.querySelector('.street').textContent = person.street;
  document.querySelector('.city').textContent = person.city;
  document.querySelector('.country').textContent = person.country;
  document.querySelector('.telephone').textContent = person.telephone;
  document.querySelector('.birthday').textContent = person.birthday;
};

document.querySelectorAll('.summary_item').forEach((s, i) => {
  if (i === 0) {
    render(people[0]);
    s.classList.add('selected');
  }
  s.addEventListener('click', () => {
    render(people[i]);
    s.classList.add('selected');
  });
});

document.querySelector('.expand').addEventListener('click', (e) => {
  if (e.target.getAttribute('src') === './arrow_up.svg') {
    document.querySelector('#summary').style.transform = 'scale(1)';
    e.target.setAttribute('src', './arrow_down.svg');
  } else {
    document.querySelector('#summary').style.transform = 'scale(0)';
    e.target.setAttribute('src', './arrow_up.svg');
  }
});

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('../../sw.js', { scope: './' })
      .then(function () {
        console.log('ServiceWorker succesfully registered');
      })
      .catch(function (err) {
        console.log('ServiceWorker registration failed: ', err);
      });
  } else {
    console.log('Service workers are not supported.');
  }
});
