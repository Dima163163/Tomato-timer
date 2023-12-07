export class AddClass {
  #id;
  #name;
  #count;

  constructor(name, count = 0) {
    this.#id = String(Math.floor(Math.random() * 100000));
    this.#name = name;
    this.#count = count;
  }

  set changeName(name) {
    this.#name = name;
  }

  get changeName() {
    return this.#name;
  }

  set classCount(number = 1) {
    return this.#count += number;
  }
  
  get classCount() {
    return this.#count;
  }
}