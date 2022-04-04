export const easeInQuad = (
  elapsed: number,
  initialValue: number,
  amountOfChange: number,
  duration: number,
) => {
  elapsed /= duration;
  return amountOfChange * elapsed * elapsed + initialValue;
};

export const easeOutQuad = (
  elapsed: number,
  initialValue: number,
  amountOfChange: number,
  duration: number,
) => {
  elapsed /= duration;
  return -amountOfChange * elapsed * (elapsed - 2) + initialValue;
};

export const easeInOutQuad = (
  elapsed: number,
  initialValue: number,
  amountOfChange: number,
  duration: number,
) => {
  elapsed /= duration / 2;
  if (elapsed < 1) return (amountOfChange / 2) * elapsed * elapsed + initialValue;
  elapsed--;
  return (-amountOfChange / 2) * (elapsed * (elapsed - 2) - 1) + initialValue;
};

export const easeInOutQuart = (
  elapsed: number,
  initialValue: number,
  amountOfChange: number,
  duration: number,
) => {
  if ((elapsed /= duration / 2) < 1) {
    return (amountOfChange / 2) * elapsed * elapsed * elapsed * elapsed + initialValue;
  } else {
    return (
      (-amountOfChange / 2) * ((elapsed -= 2) * elapsed * elapsed * elapsed - 2) + initialValue
    );
  }
};

export const easeInSine = (
  elapsed: number,
  initialValue: number,
  amountOfChange: number,
  duration: number,
) => {
  return (
    -amountOfChange * Math.cos((elapsed / duration) * (Math.PI / 2)) + amountOfChange + initialValue
  );
};

export const easeOutSine = (
  elapsed: number,
  initialValue: number,
  amountOfChange: number,
  duration: number,
) => {
  return amountOfChange * Math.sin((elapsed / duration) * (Math.PI / 2)) + initialValue;
};

export const easeInOutSine = (
  elapsed: number,
  initialValue: number,
  amountOfChange: number,
  duration: number,
) => {
  return (-amountOfChange / 2) * (Math.cos((Math.PI * elapsed) / duration) - 1) + initialValue;
};
