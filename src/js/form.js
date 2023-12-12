export class RenderForm {
  constructor() {
    this.init();
  }

  init() {
    this.renderForm();
  }

  renderForm() {
    this.form = document.createElement('form');
    this.form.classList.add('task-form');
    this.form.setAttribute('action', 'submit');

    const inputTask = this.renderInput();
    const btnTask = this.renderButtonTask();
    const btnSubmit = this.renderButtonSubmit();

    this.form.append(inputTask, btnTask, btnSubmit);
    this.form;
  }

  renderInput() {
    this.taskName = document.createElement('input');
    this.taskName.type = 'text';
    this.taskName.name = 'task-name';
    this.taskName.id = 'task-name';
    this.taskName.classList.add('task-name', 'input-primary')
    this.taskName.placeholder = 'название задачи';
    return this.taskName
  }

  renderButtonTask() {
    this.buttonTask = document.createElement('button');
    this.buttonTask.classList.add('button', 'button-importance', 'default');
    this.buttonTask.setAttribute('aria-label', 'Указать важность');
    return this.buttonTask;
  }

  renderButtonSubmit() {
    this.buttonSubmit = document.createElement('button');
    this.buttonSubmit.classList.add('button', 'button-primary', 'task-form__add-button');
    this.buttonSubmit.type = 'submit';
    this.buttonSubmit.textContent = 'Добавить';
    return this.buttonSubmit;
  }
}

