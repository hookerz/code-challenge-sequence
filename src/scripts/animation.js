/*
 * Animation Class
 */

import anime from 'animejs';

/**
 * Class for turning the sequence of images into an animation
 */
export class Animation {
  constructor() {
    this.keyframe = 1; // Only allow values between [1 - 100]
    this.scrollPosition = 0; // ScrollY of the page
    this.animationContainerBottom = 0; // The bottom of the animation container, equal to 400vh + height of TopContainer (title, and button), set on app load and resize
    this.multiplier = 0; // Multipler = bottom / numberOfImages. Splits the 400vh area into 100 different sections, displaying an image corresponding to the scroll position for each
    this.numberOfImages = 100; // 100 total images
  }

  get keyframe() {
    return this._keyframe;
  }

  set keyframe(keyframe) {
    this._keyframe = keyframe;
  }

  get scrollPosition() {
    return this._scrollPosition;
  }

  set scrollPosition(position) {
    this._scrollPosition = position;
  }

  get animationContainerBottom() {
    return this._animationContainerBottom;
  }

  set animationContainerBottom(bottom) {
    this._animationContainerBottom = bottom;
  }

  get multiplier() {
    return this._multiplier;
  }

  set multiplier(number) {
    this._multiplier = number;
  }

  get numberOfImages() {
    return this._numberOfImages;
  }

  set numberOfImages(number) {
    this._numberOfImages = number;
  }

 	/**
	 * Starts the animation
	 * @param {DOM element} container Empty div element which gets dynamically replaced with the animation 
	 */ 
  start(container) {
    if (!container) {
      throw new Error('no container');
    }

    const animation = this;

    // Anime.js constructor which uses a callback function to get the intended image at the scroll position and displays it
    let ball = anime({
      targets: '.AnimationContainer__animation',
      loop: true,
      autoplay: true,
      easing: 'linear',
      update: () =>
        (container.innerHTML = animation._getImageForScrollPosition()),
    });
  }

 	/**
	 * Starts the animation
	 * @param {number} bottom The bottom coordinate of the 400vh container. Pulled from getBoundingClientRect()
   * TODO: throttle this since it's being called on resize
	 */ 
  setAnimationContainerDimensions(bottom) {
    this.animationContainerBottom = bottom;
    const { numberOfImages } = this;
    this.multiplier = bottom / numberOfImages;
  }

  /**
   * Get the image corresponding to the keyframe index.
   * Ex. Keyframe 4 returns `0004` which returns the 4th image in the sequence
   * Deprecated since we are now binding to the scroll position
	 */ 
  _getNextImage() {
    const { keyframe } = this;
    const paddedNumber = String(keyframe).padStart(4, '0');
    this._updateKeyframe();
    return `<img src="/img/countdown/frame${paddedNumber}.jpg"/>`;
  }

  /**
   * Loop this.keyframe between values 1 and 100
   * Deprecated since we are now binding to the scroll position
	 */ 
  _updateKeyframe() {
    const { keyframe } = this;
    if (keyframe === 100) {
      this.keyframe = 1;
      return 1;
    } else {
      this.keyframe++;
      return this.keyframe;
    }
  }

  /**
   * Binds scroll position to the appropriate image
	 */ 
  _getImageForScrollPosition() {
    const { scrollPosition, multiplier } = this;
    // This is the magic formula
    // When the user is scrolled within the 0-400vh pinned view, Math.floor(scrollPosition/multiplier) will return a number 0-99 determining the image index of the sequence we should load. Offset by 1 since we don't have a frame0000.
    let imageToLoad = Math.floor(scrollPosition / multiplier) + 1;
    // Don't load anything if we're scrolled past the animation container
    if (imageToLoad > 100) return;
    const paddedNumber = String(imageToLoad).padStart(4, '0');
    return `<img src="/img/countdown/frame${paddedNumber}.jpg"/>`;
  }
}
