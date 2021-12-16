let link = [];

const linker = (from, to) => {
  document.querySelector(`#${to}-value`).value = document.querySelector(
    `#${from}-value`
  ).value;
  document.querySelector(`#${to}-unit`).value = document.querySelector(
    `#${from}-unit`
  ).value;
};

document.querySelectorAll('.link_icon').forEach((icon, i) => {
  icon.addEventListener('click', (e) => {
    if (i === 0) {
      linker('fr-top-left', 'fr-bottom-right');
    }
    if (i === 1) {
      linker('fr-top-right', 'fr-bottom-left');
    }
    if (i === 2) {
      linker('sr-top-left', 'sr-bottom-right');
    }
    if (i === 3) {
      linker('sr-top-right', 'sr-bottom-left');
    }
    applyBorderRadius();
  });
});

const propMaker = (side) => {
  if (!document.querySelector(`#${side}-value`).value) return '0';
  return ` ${document.querySelector(`#${side}-value`).value}${
    document.querySelector(`#${side}-unit`).value
  }`;
};

const applyBorderRadius = () => {
  const box = document.querySelector('#box');
  const frTopLeft = propMaker('fr-top-left');
  const frBottomRight = propMaker('fr-bottom-right');
  const frTopRight = propMaker('fr-top-right');
  const frBottomLeft = propMaker('fr-bottom-left');
  const srTopLeft = propMaker('sr-top-left');
  const srBottomRight = propMaker('sr-bottom-right');
  const srTopRight = propMaker('sr-top-right');
  const srBottomLeft = propMaker('sr-bottom-left');
  box.style.borderTopLeftRadius = `${frTopLeft} ${srTopLeft}`;
  box.style.borderTopRightRadius = `${frTopRight} ${srTopRight}`;
  box.style.borderBottomRightRadius = `${frBottomRight} ${srBottomRight}`;
  box.style.borderBottomLeftRadius = `${frBottomLeft} ${srBottomLeft}`;
  console.log(box.style.borderRadius);
};

document.querySelectorAll('select').forEach((s) =>
  s.addEventListener('change', () => {
    applyBorderRadius();
  })
);

document.addEventListener('DOMContentLoaded', applyBorderRadius);

document.querySelectorAll('input').forEach((inp, i) => {
  inp.addEventListener('keyup', applyBorderRadius);
});

document.querySelector('.copy').addEventListener('click', (e) => {
  const el = document.createElement('textarea');
  el.value = `border-radius: ${
    document.querySelector('#box').style.borderRadius
  };`;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  e.target.querySelector('.copy_title').textContent = 'Copied';
  e.target.querySelector('.copy > img').src = './check_circle.svg';
  e.target.classList.add('done');
  setTimeout(() => {
    e.target.querySelector('.copy_title').textContent = 'Copy';
    e.target.querySelector('.copy > img').src = './copy_icon.svg';
    e.target.classList.remove('done');
  }, 2000);
});

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js', { scope: './' })
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
