import {
  getElementById,
  getFilePathBasedOnFrameNumber,
} from './countdown.helpers';

export const AUTOMATICALLY_START_ANIMATION = true;
export const DEFAULT_INITIAL_FRAME = 1;
export const FRAMES_PER_SECOND = 10; // 10 as there are 100 images, 10 for each number...
export const IMAGE_ELEMENT_AT_DOM_ID = 'countdownImage';
export const INTERVAL_BETWEEN_IMAGES_SWITCH = 1000 / FRAMES_PER_SECOND;

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
      this.start();
    }
  }

  public start(): void {
    const appTree = getElementById('app');

    if (!appTree) {
      return;
    }

    this.isAnimationRunning = true;

    this.imagesSwitchInteval = setInterval(() => {
      if (this.activeFrame >= 100) {
        this.stop();
        return;
      }

      getElementById(IMAGE_ELEMENT_AT_DOM_ID)?.setAttribute(
        'src',
        getFilePathBasedOnFrameNumber(this.activeFrame)
      );

      this.activeFrame = this.activeFrame + 1;
    }, INTERVAL_BETWEEN_IMAGES_SWITCH);
  }

  public stop(): void {
    if (this.imagesSwitchInteval) {
      clearInterval(this.imagesSwitchInteval);
      this.imagesSwitchInteval = null;
      this.isAnimationRunning = false;
    }
  }
}
