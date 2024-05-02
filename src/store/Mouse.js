import { makeAutoObservable } from "mobx";

class Mouse {
  radius = 30;

  constructor() {
    makeAutoObservable(this);
  }

  setRadius(radius) {
    this.radius = radius;
  }
}

export default new Mouse();
