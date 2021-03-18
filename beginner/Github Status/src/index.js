const request = require('request');

document.querySelector('.refresh').addEventListener('click', () => {
  window.location.reload();
});

const componentMaker = (c) => {
  let component = document.createElement('div');
  component.classList.add('component');
  component.classList.add(c.name.toLowerCase().replace(' ', '-'));

  // Component Name
  let componentName = document.createElement('div');
  componentName.classList.add('name');
  componentName.textContent = c.name;
  component.appendChild(componentName);

  // Component Description
  let componentDescription = document.createElement('div');
  componentDescription.classList.add('description');
  componentDescription.textContent = c.description;
  component.appendChild(componentDescription);

  // Component Icon
  let componentIcon = document.createElement('div');
  componentIcon.classList.add('material-icons');
  if (c.status === 'operational') {
    componentIcon.textContent = 'check_circle';
    componentIcon.classList.add('up');
  } else {
    componentIcon.textContent = 'error';
    componentIcon.classList.add('down');
  }
  component.appendChild(componentIcon);
  return component;
};

const handler = (err, res, body) => {
  console.log(body);

  document.querySelector('.loader_wrapper').style.display = 'none';

  let status = document.querySelector('#status-banner');
  let status_icon = document.createElement('i');
  status_icon.classList.add('material-icons');
  let status_title = document.createElement('span');
  if (body.status.description === 'All Systems Operational') {
    status.classList.remove('status-down');
    status.classList.add('status-up');
    status_icon.textContent = 'done';
  } else {
    status.classList.remove('status-up');
    status.classList.add('status-down');
    status_icon.textContent = 'error';
  }
  status_title.textContent = body.status.description;
  status.appendChild(status_icon);
  status.appendChild(status_title);

  const componentContainer = document.querySelector('#component-container');
  let fragment = document.createDocumentFragment();

  body.components.forEach((c) => {
    if (c.description === null) return;
    fragment.appendChild(componentMaker(c));
  });

  componentContainer.appendChild(fragment);
};

request('https://www.githubstatus.com/', { json: true }, handler);
