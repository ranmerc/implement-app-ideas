const form = document.querySelector('form');
const imageURLInput = form[0];
const images = document.querySelectorAll('img');
const arrows = document.querySelectorAll('.arrow');
const error = document.querySelector('.error');

const rotater = (ele, rotation) => {
  let currentRotation = ele.style.transform.match(/[0-9]{1,}/);
  currentRotation = currentRotation ? currentRotation[0] : 0;
  const toRotate = (parseInt(currentRotation) + rotation) % 360;
  ele.style.transform = 'rotate(' + toRotate + 'deg)';
};

arrows.forEach((arrow, index) => {
  arrow.addEventListener('click', () => {
    rotater(images[Math.trunc(index / 4)], parseInt(arrow.dataset.angle));
  });
});

const checkImageExistence = (imageURL) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(imageURL);
    };
    img.onerror = () => {
      reject(false);
    };
    img.src = imageURL;
  });
};

async function loadImage() {
  try {
    const imageURL = await checkImageExistence(imageURLInput.value);
    images.forEach((image) => {
      image.setAttribute('src', imageURL);
    });
  } catch (e) {
    error.style.opacity = 1;
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  loadImage();
});
imageURLInput.addEventListener('focus', () => {
  error.removeAttribute('style');
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
