/*
 * TODO
 * Replace this code with your own to
 * implement the functionality described in
 * CHALLENGE.md
 */

import '../styles/app.scss';
import anime from 'animejs';

import { Animation } from './animation';

const animation = new Animation();
const app = document.getElementById('app');

if (app) {
  animation.start(app);
  
  let test = anime({
    targets: '.TopContainer__animationContainer',
    // Properties 
    translateX: 100,
    borderRadius: 50,
    // Property Parameters
    duration: 2000,
    easing: 'linear',
    // Animation Parameters
    direction: 'alternate'
});  
}
