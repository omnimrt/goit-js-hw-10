// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

function delayFunction(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`Promise resolved after ${delay} milliseconds`);
      } else {
        reject(`Promise rejected after ${delay} milliseconds`);
      }
    }, delay);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = parseInt(e.target.elements.delay.value, 10);
  const state = e.target.elements.state.value;

  delayFunction(delay, state)
    .then(result => {
      console.log(result);
      iziToast.success({
        title: '',
        message: `${result}`,
        position: 'topRight',
      });
    })
    .catch(err => {
      console.log(err);
      iziToast.error({
        title: '',
        message: `${err}`,
        position: 'topRight',
      });
    });
});
