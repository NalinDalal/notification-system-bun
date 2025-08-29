import { inAppWorker } from "../workers/inAppWorker";

class Queue {
  private items: any[] = [];

  enqueue(msg: any) {
    this.items.push(msg);
  }

  async process() {
    while (this.items.length > 0) {
      const msg = this.items.shift();
      await inAppWorker.handle(msg);
    }
  }

  start() {
    setInterval(() => this.process(), 1000);
  }
}

export const inAppQueue = new Queue();
