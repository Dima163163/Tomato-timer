import {RenderForm} from "./form";
export class RenderTomato {
  constructor(app, elem) {
    this.app = app;
    this.elem = elem
    this.init();
  }

  init() {
    if (this.app) {
      this.app.append(this.elem)
    }
  }
}



