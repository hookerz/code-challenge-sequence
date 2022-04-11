import { Animation } from './animation';
import '../styles/app.scss';

const animation = new Animation();
const app = document.getElementById('app');
let container = document.querySelector('.TopContainer__animationContainer');


function initializeEventListeners() {
  window.addEventListener('scroll',  (event) => {
    console.log('scrolling', event);
    console.log('window.scrolly: ', window.scrollY);
  });

  let jumpToCardsButton = document.querySelector('.TopContainer__buttonContainer');
  let gridContainer = document.querySelector('.BottomContainer__box');

  jumpToCardsButton.addEventListener('click', (event) => {
    const { top } = gridContainer.getBoundingClientRect();
    const offset = 25;
    // Scroll slightly above it
    const position = top + window.pageYOffset - offset;
    const options = {
      top: position,
      behavior: 'smooth'
    };
    window.scrollTo(options);
  });
}

function removeEventListeners() {
  window.removeEventListener('scroll')
}

if (app) {
  initializeEventListeners();
  animation.start(container);
}
