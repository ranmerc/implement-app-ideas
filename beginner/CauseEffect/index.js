let people = [];
for (let i = 0; i < 10; ++i) {
  people.push({
    name: faker.name.findName(),
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.country(),
    telephone: faker.phone.phoneNumberFormat(),
    birthday: faker.date
      .between('1990-01-01', '2021-12-31')
      .toLocaleDateString('en-IN')
      .split('T')[0],
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
  if (e.target.textContent === 'keyboard_arrow_up') {
    document.querySelector('#summary').style.transform = 'scale(1)';
    e.target.textContent = 'keyboard_arrow_down';
  } else {
    document.querySelector('#summary').style.transform = 'scale(0)';
    e.target.textContent = 'keyboard_arrow_up';
  }
});
