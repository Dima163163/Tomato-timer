// Создание элементов
export const createElement = (tag, attribute) => {
  const elem = document.createElement(tag);
  Object.assign(elem, attribute);

  return elem;
}