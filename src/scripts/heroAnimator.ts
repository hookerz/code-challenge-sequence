import {
  getCurrentScrollPositionAtViewport,
  getElementById,
  getFilePathBasedOnFrameNumber,
  getViewportScrollableHeight,
} from './countdown.helpers';

export const AUTOMATICALLY_START_ANIMATION = true;
export const DEFAULT_INITIAL_FRAME = 1;
export const FRAMES_PER_SECOND = 10; // 10 as there are 100 images, 10 for each counter value...
export const IMAGE_ELEMENT_AT_DOM_ID = 'countdownImage';
export const INTERVAL_BETWEEN_IMAGES_SWITCH = 1000 / FRAMES_PER_SECOND;
export const TOTAL_FRAMES = 100;
export const TURN_ON_WHEEL_LISTENER = true;

export interface HeroAnimatorOptions {
  automaticallyStart?: boolean;
  initialFrame?: number;
}

export class HeroAnimator {
  public activeFrame = DEFAULT_INITIAL_FRAME;
  public imagesSwitchInteval: NodeJS.Timer | null = null;
  public isAnimationRunning = false;

  public constructor(options?: HeroAnimatorOptions) {
    if (options?.automaticallyStart === false) {
      return;
    }

    if (options?.initialFrame) {
      this.activeFrame = options?.initialFrame;
    }

    if (AUTOMATICALLY_START_ANIMATION) {
      this.startAnimation();
    }

    if (TURN_ON_WHEEL_LISTENER) {
      this.prepareScrollListener();
    }
  }

  public prepareScrollListener(): void {
    document.addEventListener('scroll', () => {
      this.stopAnimation();
      this.setFrameBasedOnScrollPosition();
    });
  }

  public setFrameBasedOnScrollPosition(): void {
    const maxScrollPosition = getViewportScrollableHeight();
    const scrollHeightPerFrame = maxScrollPosition / TOTAL_FRAMES;

    const scrollYPosition = getCurrentScrollPositionAtViewport();
    const newFrame = Math.ceil(scrollYPosition / scrollHeightPerFrame);

    if (newFrame !== this.activeFrame) {
      this.activeFrame = newFrame;

      if (newFrame <= 0) {
        this.activeFrame = 1;
      }

      if (newFrame > TOTAL_FRAMES) {
        this.activeFrame = TOTAL_FRAMES;
      }

      this.updateImageAtDomUsingCurrentFrame();
    }
  }

  public startAnimation(): void {
    const appTree = getElementById('app');

    if (!appTree) {
      return;
    }

    this.isAnimationRunning = true;

    this.imagesSwitchInteval = setInterval(() => {
      if (this.activeFrame >= TOTAL_FRAMES) {
        this.stopAnimation();
        return;
      }

      this.updateImageAtDomUsingCurrentFrame();
      this.activeFrame = this.activeFrame + 1;
    }, INTERVAL_BETWEEN_IMAGES_SWITCH);
  }

  public stopAnimation(): void {
    if (this.imagesSwitchInteval) {
      clearInterval(this.imagesSwitchInteval);
      this.imagesSwitchInteval = null;
      this.isAnimationRunning = false;
    }
  }

  public updateImageAtDomUsingCurrentFrame(): void {
    getElementById(IMAGE_ELEMENT_AT_DOM_ID)?.setAttribute(
      'src',
      getFilePathBasedOnFrameNumber(this.activeFrame)
    );
  }
}
