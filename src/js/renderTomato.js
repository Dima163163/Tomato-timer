import {ControllerTomato} from './ControllerTomato';
import {ImportantTask, StandartTask, UnImportantTask} from './Task';
import {TomatoTimer} from './TomatoTimer';
import {createElement} from './createElement';
import {timeTotalShow} from './timeTotal';
import {declencionNum} from './declencionNum';


export class RenderTomato {
  constructor() {
    this.tomato = new TomatoTimer();
    this.controller = new ControllerTomato();

    this.main = createElement('main',{});
    this.section = createElement('section', {className: 'main'});
    this.container = createElement('div', {className: 'container main__container'});
    this.pomodoroForm = createElement('div', {className: 'pomodoro-form window'});
    this.pomodoroTasks = createElement('div', {className: 'pomodoro-tasks'});
    this.windowPanel = createElement('div', {className: 'window__panel'});

    this.container.append(this.pomodoroForm, this.pomodoroTasks);
    this.section.append(this.container);
    this.main.append(this.section);
    document.body.append(this.main);

    this.init()
  }

  init() {
    this.renderHeader();
    this.renderActiveTask({});
    this.renderTimer();
    this.renderForm();
    this.renderInstructions();
    this.renderTasks();
    this.renderTimeTotal();
    this.setActiveTask();
    this.deleteTask();
    this.editTask();
    this.setPriorityTask();
  }

  // Отрисовка header
  renderHeader() {
    const header = document.createElement('header');
    header.innerHTML = `
      <section class="header">
        <div class="container header__container">
          <img src="./assets/noto_tomato.svg" class="header__logo" alt="Tomato image">
          <h1 class="header__title">Tomato timer</h1>
        </div>
      </section>
    `;
    document.body.prepend(header);
  }

  // Отрисовка активной задачи
  renderActiveTask({title = 'Выберите задачу', count = 0}) {
    this.windowPanel.innerHTML = '';

    this.taskTitle = createElement('p', {className: 'window__panel-title', textContent: title});
    const taskCount = createElement('p', {className: 'window__panel-task-text', textContent: `Томат ${count}`});
    this.windowPanel.append(this.taskTitle, taskCount)
    this.pomodoroForm.prepend(this.windowPanel);
  }

  //Отрисовка таймера
  renderTimer() {
    // Создаем элементы таймера
    const windowBody = createElement('div', {className: 'window__body'});
    this.timer = createElement('p', {className: 'window__timer-text', textContent: '25:00'});
    const timerBtns = createElement('div', {className: 'window__buttons'});
    const startBtn = createElement('button', {className: 'button button-primary', textContent: 'Старт', type: 'button'});
    const stopBtn = createElement('button', {className: 'button button-secondary', textContent: 'Стоп', type: 'button'});
    

    timerBtns.append(startBtn, stopBtn);
    windowBody.append(this.timer, timerBtns);
    this.pomodoroForm.append(windowBody);
    // Обрабатываем события при клике на кнопки
    startBtn.addEventListener('click', () => {
      if (this.tomato.isActive) return;
      this.tomato.startTimer();
    })
    stopBtn.addEventListener('click', () => {
      this.tomato.resetTimer();
    })
  }

  // Отрисовка формы
  renderForm() {
    const form = createElement('form', {className: 'task-form', action: 'submit'});
    const input = createElement('input', {
      className: 'task-name input-primary',
      type: 'text',
      name: 'title',
      id: 'task-name',
      placeholder: 'название задачи',
    });
    this.importanceBtn = createElement('button', {
      className: 'button button-importance default',
      type: 'button',
      ariaLabel: 'Указать важность',
    })
    this.importanceBtn.dataset.importance = 'default';

    const addBtn = createElement('button', {
      className: 'button button-primary task-form__add-button',
      type: 'submit',
      textContent: 'Добавить',
    })

    form.append(input, this.importanceBtn, addBtn);
    this.pomodoroForm.append(form);

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.title.value.length) {
        return;
      }

      let Task;
      if (this.importanceBtn.dataset.importance === 'important') {
        Task = ImportantTask;
      } else if (this.importanceBtn.dataset.importance === 'so-so') {
        Task = UnImportantTask;
      } else {
        Task = StandartTask;
      }

      const newTask = new Task(form.title.value);

      this.controller.setLocalStorage(newTask);
      this.renderTask(newTask);
      this.tomato.addTask(newTask);
      form.reset();
    });
  }

    // Отрисовка инструкции
  renderInstructions() {
    this.pomodoroTasks.insertAdjacentHTML('afterbegin', `
      <p class="pomodoro-tasks__header-title">
        Инструкция:
      </p>
      <ul class="pomodoro-tasks__quest-list">
        <li class="pomodoro-tasks__list-item">
          Напишите название задачи чтобы её добавить
        </li>
        <li class="pomodoro-tasks__list-item">
          Чтобы задачу активировать, выберите её из списка
        </li>
        <li class="pomodoro-tasks__list-item">
          Запустите таймер
        </li>
        <li class="pomodoro-tasks__list-item">
          Работайте пока таймер не прозвонит
        </li>
        <li class="pomodoro-tasks__list-item">
          Сделайте короткий перерыв (5 минут)
        </li>
        <li class="pomodoro-tasks__list-item">
          Продолжайте работать, пока задача не будет выполнена.
        </li>
        <li class="pomodoro-tasks__list-item">
          Каждые 4 периода таймера делайте длинный перерыв (15-20 минут).
        </li>
      </ul>
    `)
  }

  // При создании задачи задаем важность
  setPriorityTask() {
    let count = 0;
    const options = ['default', 'important', 'so-so'];
    this.importanceBtn.addEventListener('click', ({target}) => {
      console.log(target)
      count += 1;
      if (count >= options.length) {
        count = 0;
      }
      
      for (let i = 0; i < options.length; i++) {
        if (count === i) {
          target.classList.add(options[i]);
          target.dataset.importance = options[i];
        } else {
          target.classList.remove(options[i]);
        }
      }
    });
  }

  // Отрисовка задач из localStorage
  renderTasks() {
    const data = this.controller.getLocalStorage();
    this.taskList = createElement('ul', {className: 'pomodoro-tasks__quest-tasks'});
    this.pomodoroTasks.append(this.taskList);

    if (!data.length) return;
    data.map(task => this.taskList.append(this.createTask(task)));
  }

  // Добавление новой задачи
  renderTask(task) {
    this.taskList.append(this.createTask(task));
  }

  // Создание новой задачи
  createTask(task) {
    const taskItem = createElement('li', {
      className: `pomodoro-tasks__list-task ${task.importance}`,
      id: task.id,
    });

    const countNumber = createElement('span', {
      className: 'count-number',
      textContent: task.count,
    });

    const taskName = createElement('button', {
      className: 'pomodoro-tasks__task-text',
      type: 'button',
      textContent: task.title,
    });

    const taskBtn = createElement('button', {
      className: 'pomodoro-tasks__task-button',
      type: 'button',
    });

    const popup = createElement('div', {
      className: 'burger-popup',
    });

    const popupEditBtn = createElement('button', {
      className: 'popup-button burger-popup__edit-button',
      type: 'button',
      textContent: 'Редактировать',
    });

    const popupDeleteBtn = createElement('button', {
      className: 'popup-button burger-popup__delete-button',
      type: 'button',
      textContent: 'Удалить',
    });

    popup.append(popupEditBtn, popupDeleteBtn);
    taskItem.append(countNumber, taskName, taskBtn, popup);

    taskBtn.addEventListener('click', () => {
      popup.classList.toggle('burger-popup_active');
    });

    return taskItem;
  }

  // Удаление задачи 
  deleteTask() {
    this.taskList.addEventListener('click', ({target}) => {
      const deleteBtn = target.closest('.burger-popup__delete-button');

      if (deleteBtn) {
        const task = target.closest('.pomodoro-tasks__list-task');
        console.log('task: ', task);
        const modal = this.renderModal();
        console.log('modal: ', modal);
        const popup = target.closest('.burger-popup')
        console.log(popup);
        if (popup){
          popup.classList.remove('burger-popup_active')
        }
        modal.addEventListener('click', ({target}) => {
          console.log('click');
                
          if (target.closest('.modal-delete__delete-button')) {

            this.controller.removeLocalStorage(task.id);
            task.remove();

            const activTaskId = this.tomato.activeTask?.id;
            console.log('activTaskId: ', activTaskId);
            if (task.id === activTaskId) {
              this.tomato.isActive = !this.tomato.isActive;
              this.tomato.resetTimer();
              this.tomato.activeTask = null;
              this.renderActiveTask({});
            }
          }
          modal.remove();
        });
      }
    });
  }

  // Редактирование задачи
  editTask() {
    this.taskList.addEventListener('click', ({target}) => {
      const editBtn = target.closest('.burger-popup__edit-button');
      if (editBtn) {
        const task = target.closest('.pomodoro-tasks__list-task');
        console.log('task: ', task);
        const taskText = task.querySelector('.pomodoro-tasks__task-text');
        console.log('taskText: ', taskText);

        taskText.setAttribute('contenteditable', 'true');
        taskText.tabIndex = 0;
        taskText.focus();

        const popup = target.closest('.burger-popup')
        console.log(popup);
        if (popup){
          popup.classList.remove('burger-popup_active')
        }

        taskText.addEventListener('blur', ({target}) => {
          if (target.getAttribute('contenteditable')) {
            target.setAttribute('contenteditable', 'false');
            target.tabIndex = '';
            this.controller.editLocalStorage(task.id, target.textContent);
            this.tomato.editTask(task.id, target.textContent);
            const activTaskId = this.tomato.activeTask?.id;

            if (task.id === activTaskId) {
              this.taskTitle.textContent = target.textContent;
            }
          }
        });
      }
    });
  }

  // Выбор активной задачи
  setActiveTask() {
    this.taskList.addEventListener('click', ({target}) => {
      const taskText = target.closest('.pomodoro-tasks__task-text');

      if (taskText && this.tomato.isActive) {
        this.tomato.isActive = !this.tomato.isActive;
        this.tomato.resetTimer();
      }

      if (taskText) {
        const taskActive = this.taskList.querySelector('.pomodoro-tasks__task-text_active');
        console.log('taskActive: ', taskActive);

        if (taskActive) {
          taskActive.classList.remove('pomodoro-tasks__task-text_active');
        }

        target.classList.add('pomodoro-tasks__task-text_active');

        const id = target.closest('.pomodoro-tasks__list-task').id;
        const newTaskActive = this.tomato.setActiveTask(id);
        console.log('newTaskActive: ', newTaskActive);
        this.renderActiveTask(newTaskActive);
      }
    });
  }

  // Отрисовка общего времени задач
  renderTimeTotal() {
    const timeTotal = createElement('p', {
      className: 'pomodoro-tasks__deadline-timer',
      textContent: '0 часов 0 минут'
    });

    const {hours, minutes} = timeTotalShow(this.tomato.count);

    if (hours || minutes) {
      timeTotal.textContent = `${hours} ${declencionNum(hours, 'час', 'часа', 'часов')} ${minutes} ${declencionNum(minutes, 'минута', 'минуты', 'минут')}`
    } else {
      timeTotal.textContent = '0 часов 0 минут'
    }
    this.pomodoroTasks.append(timeTotal);
  }

  // Создание модального окна
  renderModal() {
    const modalOverlay = createElement('div', {className: 'modal-overlay'});
    const modalDelete = createElement('div', {className: 'modal-delete'});
    const modalDeleteTitle = createElement('p', {className: 'modal-delete__title', textContent: 'Удалить задачу?'});
    const modalDeleteCloseBtn = createElement('button', {
      className: 'modal-delete__close-button',
      type: 'button',
    });
    const modalDeleteDeleteBtn = createElement('button', {
      className: 'modal-delete__delete-button button-primary',
      type: 'button',
      textContent: 'Удалить',
    });
    const modalDeleteCancel = createElement('button', {
      className: 'modal-delete__cancel-button',
      type: 'button',
      textContent: 'Отмена',
    });

    modalDelete.append(modalDeleteTitle, modalDeleteCloseBtn, 
    modalDeleteDeleteBtn, modalDeleteCancel);
    modalOverlay.append(modalDelete);
    document.body.append(modalOverlay);

    return modalOverlay;
  }
}