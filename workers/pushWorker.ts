import { pushService } from "../services/pushService";

export const pushWorker = {
  async handle(msg: any) {
    console.log("PushWorker processing:", msg);
    await pushService.send(msg);
  },
};
