import { emailWorker } from "../workers/emailWorker";
import { dlq } from "./dlq";

class Queue {
  private items: any[] = [];
  private retries = new Map<any, number>();

  enqueue(msg: any) {
    this.items.push(msg);
  }

  async process() {
    while (this.items.length > 0) {
      const msg = this.items.shift();
      try {
        await emailWorker.handle(msg);
      } catch (e) {
        const count = (this.retries.get(msg) ?? 0) + 1;
        if (count >= 10) dlq.enqueue(msg);
        else {
          this.retries.set(msg, count);
          this.items.push(msg);
        }
      }
    }
  }

  start() {
    setInterval(() => this.process(), 1000);
  }
}

export const emailQueue = new Queue();
