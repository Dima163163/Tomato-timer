export class AddClass {
  #id;
  #name;
  #count;

  constructor(name, count = 0) {
    this.#id = String(Math.floor(Math.random() * 100000));
    this.#name = name;
    this.#count = count;
  }

  set className(name) {
    this.#name = name;
  }

  get className() {
    return this.#name;
  }

  cangeCount(number = 1) {
    return this.#count += number;
  }
  getCount() {
    return this.#count;
  }
}