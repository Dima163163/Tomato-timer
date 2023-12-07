import addClass from './js/main';
import {AddClass} from './js/addClass';

import './index.html'
import './scss/index.scss'

const init = () => {
  addClass();
}

init();

const classNone = new AddClass('container')

console.log('classNone: ', classNone);
