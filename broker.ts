import { emailQueue } from "./queues/emailQueue";
import { inAppQueue } from "./queues/inAppQueue";
import { pushQueue } from "./queues/pushQueue";

export const broker = {
  start() {
    emailQueue.start();
    inAppQueue.start();
    pushQueue.start();
  },

  publish(queue: string, message: any) {
    switch (queue) {
      case "email":
        emailQueue.enqueue(message);
        break;
      case "inapp":
        inAppQueue.enqueue(message);
        break;
      case "push":
        pushQueue.enqueue(message);
        break;
    }
  },
};
