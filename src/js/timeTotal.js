// Рабочее время
export const timeTotalShow = (count) => {
  const time = count * 25;
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  return {
    hours,
    minutes
  }
}