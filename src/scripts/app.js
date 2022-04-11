import { Animation } from './animation';
import '../styles/app.scss';

const animation = new Animation();
const app = document.getElementById('app');
let container = document.querySelector('.AnimationContainer__animation');


function initializeEventListeners() {
  let jumpToCardsButton = document.querySelector('.TopContainer__buttonContainer');
  let gridContainer = document.querySelector('.BottomContainer__box');

  // Edge case: On page refresh, if the user is scrolled past the bottom of the 400vh animation container, bottom gets set to a negative value. 
  // Could do some crazy math, or just point them to the top of the page instead
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  window.addEventListener('scroll',  (event) => {
    const { scrollY } = window;
    animation.setScrollPosition(scrollY);
  });

  window.addEventListener('resize', (event) => {
    let { bottom } = animationContainer.getBoundingClientRect();
    setAnimationContainerDimensions(bottom);
  });

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

// Get dimensions of animation container since it is based off 400vh
function setAnimationContainerDimensions() {
  let animationContainer = document.querySelector('.AnimationContainer');
  let { bottom } = animationContainer.getBoundingClientRect();
  animation.setAnimationContainerDimensions(bottom);
}

if (app) {
  setAnimationContainerDimensions();
  initializeEventListeners();
  animation.start(container);
}
