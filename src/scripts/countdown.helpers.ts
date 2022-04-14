export const getNumberWithAddedZeros = (
  number: number,
  { targetLength }: { targetLength: number }
): string => {
  if (!targetLength) {
    targetLength = 4;
  }

  let numberAsText = number.toString();

  while (numberAsText.length < targetLength) {
    numberAsText = '0' + numberAsText;
  }

  return numberAsText;
};

export const getFilePathBasedOnFrameNumber = (frameNumber: number): string => {
  return `img/countdown/frame${getNumberWithAddedZeros(frameNumber, {
    targetLength: 4,
  })}.jpg`;
};

export const getCurrentScrollPositionAtViewport = (): number => {
  return window.scrollY;
};

export const getElementById = (id: string): HTMLElement | null => {
  return document.getElementById(id);
};

export const getViewportScrollableHeight = (): number => {
  return document.documentElement.scrollHeight - window.innerHeight;
};
