import {
  getFilePathBasedOnFrameNumber,
  getNumberWithAddedZeros,
} from '../src/scripts/countdown.helpers';

describe('Countdown animation > helpers', () => {
  describe('getNumberWithAddedZeros function', () => {
    it('should prepend zeros to the number until getting a string with the needed length', () => {
      expect(getNumberWithAddedZeros(1, { targetLength: 4 })).toEqual('0001');
      expect(getNumberWithAddedZeros(15, { targetLength: 4 })).toEqual('0015');
      expect(getNumberWithAddedZeros(150, { targetLength: 4 })).toEqual('0150');
    });

    it('should not prepend zeros if not needed (number lengh equals the needed length)', () => {
      expect(getNumberWithAddedZeros(1, { targetLength: 1 })).toEqual('1');
    });
  });

  describe('getFilePathBasedOnFrameNumber function', () => {
    it('should get the proper image path for the countdown using prepended zeros', () => {
      expect(getFilePathBasedOnFrameNumber(51)).toEqual(
        'img/countdown/frame0051.jpg'
      );
    });
  });
});
