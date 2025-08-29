import { dbService } from "../services/dbService";

export const inAppWorker = {
  async handle(msg: any) {
    console.log("InAppWorker processing:", msg);
    await dbService.save(msg);
  },
};
