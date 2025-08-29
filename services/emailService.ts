export const emailService = {
  async send(payload: any) {
    console.log("Sending email via SES mock:", payload);
    // integrate AWS SES or SMTP here
  },
};
