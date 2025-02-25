export interface IEmailProvider {
  sendEmail(
    to: string,
    subject: string,
    template: string,
    context: Record<string, unknown>,
  ): Promise<void>;
}

export enum EmailTemplate {
  FORGOT_PASSWORD = 'forgotPassword',
  CREATE_USER = 'createUser',
}
