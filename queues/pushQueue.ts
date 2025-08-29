import { pushWorker } from "../workers/pushWorker";

class Queue {
  private items: any[] = [];

  enqueue(msg: any) {
    this.items.push(msg);
  }

  async process() {
    while (this.items.length > 0) {
      const msg = this.items.shift();
      await pushWorker.handle(msg);
    }
  }

  start() {
    setInterval(() => this.process(), 1000);
  }
}

export const pushQueue = new Queue();
