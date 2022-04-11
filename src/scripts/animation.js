/*
 * Animation Class
 */

/**
 * Class for handling the playback of images
 * @memberOf  BackgroundClasses
 */
import anime from 'animejs';

export class Animation {
  constructor() {
    this.keyframe = 1; // Only allow values of [0 - 100]
  }

  start(container) {
    if (!container) {
      throw new Error('no container');
    }
    
    let animation = this;

    // Anime.js constructor which updates the container with the image of the 
    let ball = anime({
      targets: '.TopContainer__animationContainer',
      loop: true,
      easing: 'easeoutExpo',
      duration: 10000,
      update: () => container.innerHTML = animation._getNextImage()
    });
  }

  // Get the image corresponding to the keyframe index. Ex. Keyframe 4 returns an image with `0004`
  _getNextImage() {
    const { keyframe } = this;
    const paddedNumber = String(keyframe).padStart(4, '0');
    this._updateKeyframe();
    return `<img src="/img/countdown/frame${paddedNumber}.jpg"/>`;
  }
  
  // Loop this.keyframe between values 1 and 100
  _updateKeyframe() {
    const { keyframe } = this;
    if (keyframe === 100) {
      this.keyframe = 0;
      return 0;
    } else {
      this.keyframe++;
      return this.keyframe;
    }
  }
}