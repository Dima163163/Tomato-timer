export class Timer {
  #timeTask;
  #timePause;
  #timeBigPause;
  #tasks;
  #activeTask;

  constructor({timeTask = 1, timePause = 5, timeBigPause = 15, tasks = []}){
    if(Timer._instance) return Timer._instance;
    this.#timeTask = timeTask;
    this.#timePause = timePause;
    this.#timeBigPause = timeBigPause;
    this.#tasks = tasks;
    this.#activeTask = null;
    Timer._instance = this;
  }


  addTask(taskObj) {
    this.#tasks.push(taskObj);
  }

  getTask() {
    return this.#tasks
  }

  activationTask(id) {
    this.#tasks.forEach(task => {
      if(id === task.id) {
        return this.#activeTask = task;
      }
    })
  }

  addCounterTask(id) {
    this.#tasks.forEach(task => {
      if (id === task.id) {
        ++task.counter;
      }
    })
  }

  startTimer(time) {
    let startTime = new Date();
    let stopTime = startTime.setMinutes(startTime.getMinutes() + time);

    let countDown = setInterval(function() {
      let now = new Date().getTime();
      let remain = stopTime - now;

      let minutes = Math.floor((remain % (1000 * 60 *60)) / (1000 * 60));
      let seconds = Math.floor((remain % (1000 * 60)) / 1000);
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      console.log(`${minutes}:${seconds}`)
      if (minutes === '00' && seconds === '00') {
        clearInterval(countDown);
      }
    }, 1000)
  }

  startTask() {
    if (this.#activeTask) {
      this.startTimer(this.#timeTask)
      const time = this.#timeTask * 60 * 1000;
      setTimeout(() => {
          if (this.#activeTask.counter % 3 === 0) {
          this.startTimer(this.#timeBigPause);
          this.addCounterTask(this.#activeTask.id);
        } else {
          this.startTimer(this.#timePause);
          this.addCounterTask(this.#activeTask.id);
        }
      }, time)
    } else {
      console.log('Ошибка.Активной задачи нет.');
    }
  }
}