const SEC_PER_MINUTE = 60;

export const getMinutes = (time) => {
  const minutes = Math.trunc(time / SEC_PER_MINUTE).toString();

  return minutes.length > 1 ? minutes : `0${minutes}`;
};

export const getSeconds = (time) => {
  const minutes = Math.trunc(time / SEC_PER_MINUTE);
  const seconds = Math.trunc(time - minutes * SEC_PER_MINUTE).toString();

  return seconds.length > 1 ? seconds : `0${seconds}`;
};
