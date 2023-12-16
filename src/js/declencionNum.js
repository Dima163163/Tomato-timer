// Склонение числительных
export const declencionNum = (number, one, two, three) => {
  if (number === 1 || (number > 19 && number % 10 === 1)) {
    return one;
  } else if ((number > 1 && number < 5) ||
  (number > 19 && number % 10 > 1 && number % 10 < 5)) {
    return two;
  } else {
    return three;
  }
};