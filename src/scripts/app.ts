import '../styles/app.scss';

import { Animation } from './animation';

const animation: Animation = new Animation();
const app = document.getElementById('app');

if (app) {
  animation.start(app);
}
