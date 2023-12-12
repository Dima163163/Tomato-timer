export class Task {
  #id;
  #text;
  #count;

  constructor(text) {
    this.id = Math.floor(Math.random() * 100000);
    this.text = text;
    this.#count = 0;
  }

  set text(str) {
    this.#text = str;
  }
}

// Важная задача
export class ImportantTask extends Task {
  #importance;
  constructor(text) {
    super(text);
    this.#importance = 'important';
  }
}

// Стандартная задача
export class StandartTask extends Task {
  #importance;
  constructor(text) {
    super(text);
    this.#importance = 'default';
  }
}

// Неважная задача
export class UnimportantTask extends Task {
  #importance
  constructor(text) {
    super(text);
    this.#importance = 'so-so';
  }
}