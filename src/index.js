import addClass from './js/main';
import {AddClass} from './js/addClass';
import {Timer} from './js/timer';
import {RenderForm} from './js/form'
import {RenderTomato} from './js/RenderTomato';

import './index.html'
import './scss/index.scss'


const form = new RenderForm();
console.log('form: ', form);
const formTomato = new RenderTomato('.pomodoro-form', form);
console.log('formTomato: ', formTomato);
const init = () => {
  // addClass();
  formTomato.init();
}

init();

// const form = new renderForm();
// console.log('form: ', form);
// const classNone = new AddClass('container')
// const timer = new Timer({});
// Object.freeze(timer);
// timer.addTask({nameTask: 'убрать стол', id: 3456, counter: 2});
// timer.activationTask(3456)
// timer.startTask()
// console.log(timer.getTask());