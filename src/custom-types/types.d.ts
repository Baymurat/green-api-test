export interface WSUser {
  wid: string
  countryInstance: string
  typeAccount: string
  webhookUrl: string
  webhookUrlToken: string
  delaySendMessagesMilliseconds: number
  markIncomingMessagesReaded: string
  markIncomingMessagesReadedOnReply: string
  outgoingWebhook: string
  outgoingMessageWebhook: string
  stateWebhook: string
  incomingWebhook: string
  deviceWebhook: string
  statusInstanceWebhook: string
  sendFromUTC: string
  sendToUTC: string
}

export interface Message {
  typeWebhook: TWebhook
  instanceData: IInstanceData
  timestamp: number
  idMessage: string
  senderData: ISenderData
  messageData: TMessageData
}

export type TWebhook =
  | "incomingMessageReceived"    /** уведомление о входящих сообщениях и файлах */
  | "outgoingMessageReceived"    /** уведомление о сообщении, отправленного с телефона */
  | "outgoingAPIMessageReceived" /** уведомление о сообщении, отправленного из API */
  | "outgoingMessageStatus"      /** уведомление о статусах отправки/доставки/прочтении исходящих сообщений */
  | "stateInstanceChanged"       /** уведомление об изменении состояния авторизации аккаунта */
  | "statusInstanceChanged"      /** уведомление об изменении состояния сокета аккаунта */
  | "deviceInfo"                 /** уведомление об устройстве (телефоне) и уровне заряда батареи */
  | "incomingCall"               /** уведомление о входящем звонке */

export interface IInstanceData {
  idInstance: integer
  wid: string
  typeInstance: string
}

export interface ISenderData {
  chatId: string
  sender: string
  chatName: string
  senderName: string
}

export type TMessageData = TTextMessage

interface TTextMessage {
  typeMessage: 'textMessage'
  textMessageData: ITextMessageData
  quotedMessage?: IQuotedMessage
}

interface ITextMessageData {
  textMessage: string
  isTemplateMessage: boolean
}

interface IQuotedMessage {
  stanzaId: string
  participant: string
  typeMessage: string
}