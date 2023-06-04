export const EVENT_NAME = {
  SEND_MAIL: 'send-mail',
};

export interface ISendMailEvent {
  emailReceiver: string;
  subject: string;
  linkVerify: string;
}
