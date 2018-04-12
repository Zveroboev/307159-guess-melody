const getDeepCopy = (data) => {
  if (typeof data !== `object` || data === null) {
    return data;
  }

  const output = Array.isArray(data) ? [] : {};

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];

      output[key] = (typeof value === `object`) ? getDeepCopy(value) : value;
    }
  }

  return output;
};

export default getDeepCopy;
