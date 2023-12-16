// Добавление нуля к числу
export const addZero = numb => {
  if (numb < 10) {
    return '0' + numb;
  } else {
    return numb;
  }
};