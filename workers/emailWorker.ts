import { emailService } from "../services/emailService";

export const emailWorker = {
  async handle(msg: any) {
    console.log("EmailWorker processing:", msg);
    await emailService.send(msg);
  },
};
