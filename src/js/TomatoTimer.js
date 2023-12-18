import {Task} from './Task';
import {addZero} from './addZero';
import {timeTotalShow} from './timeTotal';
import {declencionNum} from './declencionNum';


export class TomatoTimer {
  static instance = null;

  constructor(
    timeWork = 25,
    timePause = 5,
    timeBigPause = 15,
  ){
    if(TomatoTimer.instanse) return TomatoTimer.instanse;

    TomatoTimer.instance = this;
    this.timeWork = timeWork;
    this.timePause = timePause;
    this.timeBigPause = timeBigPause;
    this.timeLeft = this.timeWork * 60;
    this.tasks = this.getTasks();
    this.count = this.getCount();
    this.activeTask = null;
    this.timerId = null;
    this.isActive = false;
    this.status = 'timeWork';
  }

  // Запуск таймера
  startTimer(){
    if(!this.activeTask) {
      return alert('Ошибка.Активной задачи нет.')
    }
    this.isActive = true;
    this.timeLeft -= 1;
    this.showTime(this.timeLeft);

    if (this.isActive && this.timeLeft > 0) {
      this.timerId = setTimeout(this.startTimer.bind(this), 1000);
    }

    if (this.timeLeft <= 0) {
      if (this.status === 'timeWork') {
        this.count += 1;
        this.setCount(this.count);
        this.activeTask.changeCount();
        this.showActiveTaskCount(this.activeTask.count);
        this.setCountTask(this.activeTask.id, this.activeTask.count);
        this.updateTimeTotal();

        this.status = this.count % 3 ? 'timePause' : 'timeBigPause';
      } else {
        this.status = 'timeWork';
      }
      this.timeLeft = this[this.status] * 60;
      this.startTimer();
    }
  }

  // Сброс отсчета времени
  resetTimer() {
    if (!this.activeTask) {
      return alert('Ошибка.Активной задачи нет.')
    }
    this.isActive = false;
    this.status = 'timeWork';
    this.timeLeft = this[this.status] * 60;
    this.showTime(this.timeLeft);
    clearTimeout(this.timerId);
  }

  // Получение счетчика из localStorage
  getCount() {
    const dataCount = JSON.parse(localStorage.getItem('count'));

    if (!dataCount) {
      return 0;
    }
    return dataCount.count;
  }

  // Сохранение счетчика и даты в localStorage
  setCount(count) {
    localStorage.setItem('count', JSON.stringify(
      {
        count,
        date: new Date().getTime(),
      }
    ))
  }

  // Получение задач из localStorage и создание задач
  getTasks() {
    const data = JSON.parse(localStorage.getItem('tasks')) || [];
    const tasks = data.map(task => Object.assign(new Task(), task));

    return tasks;
  }

  // Добваление в список новой задачи
  addTask(task) {
    this.tasks.push(task);
  }

  // Редактирование задачи
  editTask(id, title) {
    const task = this.tasks.find(task => task.id === id);

    task.title = title;
  }

  // Сохранение задачи в активную
  setActiveTask(id) {
    const task = this.tasks.find(task => task.id === id);

    this.activeTask = task;
    return this.activeTask;
  }

  // Создаем счетчик активной задачи
  showActiveTaskCount(count) {
    const countWindowPanel = document.querySelector('.window__panel-task-text');
    const countElemsNumber = document.querySelectorAll('.count-number');
    const arrElems = [...countElemsNumber];
    const countElemNumber = arrElems.find(elem => elem.parentElement.id === this.activeTask.id);

    countWindowPanel.textContent = `Томат ${count}`;
    countElemNumber.textContent = count;
  }

  // Отображаем обратный отсчет таймера
  showTime(seconds) {
    const minutesTime = addZero(Math.floor(seconds / 60));
    const secondsTime = addZero(seconds % 60);

    const timerBlock = document.querySelector('.window__timer-text');
    timerBlock.textContent = `${minutesTime}:${secondsTime}`;
  }

  // Запись счетчика активной задачи в localStorage
  setCountTask(id, count) {
    const dataArr = JSON.parse(localStorage.getItem('tasks'));
    const newDataArr = dataArr.map(task => (task.id === id ? {...task, count} : task));

    localStorage.setItem('tasks', JSON.stringify(newDataArr));
  }

  // Вывод времени общей работы за день
  updateTimeTotal() {
    const {hours, minutes} = timeTotalShow(this.count);
    const deadlineTimer = document.querySelector('.pomodoro-tasks__deadline-timer');
    deadlineTimer.textContent = 
    `${hours} ${declencionNum(hours, 'час', 'часа', 'часов')} 
    ${minutes} ${declencionNum(minutes, 'минута', 'минуты', 'минут')}`;
  }
}