import { Animation } from './animation';
import '../styles/app.scss';

const animation = new Animation();
const app = document.getElementById('app');
let container = document.querySelector('.TopContainer__animationContainer');

if (app) {
  animation.start(container);
}
