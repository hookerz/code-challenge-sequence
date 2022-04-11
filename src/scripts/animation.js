/*
 * Animation Class
 */

/**
 * Class for turning the sequence of images into an animation
 * @memberOf  BackgroundClasses
 */
import anime from 'animejs';

export class Animation {
  constructor() {
    this.keyframe = 1; // Only allow values between [1 - 100]
  }

  start(container) {
    if (!container) {
      throw new Error('no container');
    }
    
    const animation = this;

    // Anime.js constructor which updates the image each keyframe
    let ball = anime({
      targets: '.TopContainer__animationContainer',
      loop: true,
      autoplay: true,
      easing: 'linear',
      update: () => container.innerHTML = animation._getNextImage()
    });
  }

  // Get the image corresponding to the keyframe index. 
  // Ex. Keyframe 4 returns `0004` which returns the 4th image in the sequence
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