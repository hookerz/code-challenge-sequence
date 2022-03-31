import { Animation } from '../src/scripts/animation';

describe('Animation', (): void => {
  let animation: Animation;
  beforeEach((): void => {
    animation = new Animation();
  });
  test('throws without container', (): void => {
    expect(() => animation.start(null)).toThrowError('no container');
  });
});
