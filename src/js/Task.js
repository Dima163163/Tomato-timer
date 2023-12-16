export class Task {
  constructor(title, count = 0) {
    this.id = String(Math.floor(Math.random() * 100000));
    this.title = title;
    this.count = count;
  }

  changeCount() {
    this.count += 1;
    return this.count;
  }

}

// Важная задача
export class ImportantTask extends Task {
  constructor(title, count = 0,importance = 'important') {
    super(title, count);
    this.importance = importance;
  }
}

// Стандартная задача
export class StandartTask extends Task {
  constructor(title, count = 0,importance = 'default') {
    super(title, count);
    this.importance = importance;
  }
}

// Неважная задача
export class UnImportantTask extends Task {
  constructor(title, count = 0, importance = 'so-so') {
    super(title, count);
    this.importance = importance;
  }
}