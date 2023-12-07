import {AddClass} from "./addClass";


const addClass = () => {
  let count = 0;
  const defaultClass = new AddClass('default');
  const importantClass = new AddClass('important');
  const sosoClass = new AddClass('so-so');

  const imp = [defaultClass, importantClass, sosoClass];
  console.log('imp: ', imp);

  document.querySelector('.button-importance').addEventListener('click', ({target}) => {
    count += 1;
    if (count >= imp.length) {
      count = 0
    }

    for (let i = 0; i < imp.length; i++) {
      const calss = imp[i].className;
      if (count === i) {
        target.classList.add(calss)
      } else {
        target.classList.remove(calss)
      }
    }
  })
};

export default addClass;
