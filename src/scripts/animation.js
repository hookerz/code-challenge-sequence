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
    this.scrollPosition = 0; // ScrollY of the page
    this.animationContainerBottom = 0; // The bottom of the animation container, equal to 400vh + height of TopContainer (title, and button), set on app load and resize
    this.multiplier = 0; // Multipler = bottom / numberOfImages. Splits the 400vh area into 100 different sections, displaying an image corresponding to the scroll position for each
    this.numberOfImages = 100; // 100 total images
    this.heightOfImage = 0; // (Bottom - heightOfImage) / multiplier is the image to show. We subtract the heightOfImage so we see the full last image as we scroll past the bottom of the container
  }

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
      update: () => container.innerHTML = animation._getImageForScrollPosition()
    });
  }

  // Get the image corresponding to the keyframe index. 
  // Ex. Keyframe 4 returns `0004` which returns the 4th image in the sequence
  // Deprecated since we are now binding to the scroll position
  _getNextImage() {
    const { keyframe } = this;
    const paddedNumber = String(keyframe).padStart(4, '0');
    this._updateKeyframe();
    return `<img src="/img/countdown/frame${paddedNumber}.jpg"/>`;
  }

  // Binds scroll position to an image
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
  
  // Loop this.keyframe between values 1 and 100
  // Deprecated since we are now binding to the scroll position
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

  // Sets the scroll position
  setScrollPosition(scrollPosition) {
    this.scrollPosition = scrollPosition;
  }

  // TODO: throttle this since it's being called on resize
  setAnimationContainerDimensions(bottom) {
    this.animationContainerBottom = bottom;

    // Image to load = bottom / multiplier since we are starting the sequence from the very top of the page
    const { numberOfImages } = this;
    this.multiplier = bottom / numberOfImages;
  }
}