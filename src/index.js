import addClass from './js/main';
import {AddClass} from './js/addClass';
import {Timer} from './js/timer';


import './index.html'
import './scss/index.scss'

const init = () => {
  addClass();
}

init();

const classNone = new AddClass('container')
const timer = new Timer({});
timer.addTask({nameTask: 'убрать стол', id: 3456, counter: 2});
timer.activationTask(3456)
timer.startTask()
console.log(timer.getTask());