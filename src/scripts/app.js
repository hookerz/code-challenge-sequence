/*
 * TODO
 * Replace this code with your own to
 * implement the functionality described in
 * CHALLENGE.md
 */

import '../styles/app.scss';

import { Animation } from './animation';

const animation = new Animation();
const app = document.getElementById('app');

if (app) {
  animation.start(app);
}
