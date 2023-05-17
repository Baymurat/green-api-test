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
  idInstance: string
  apiTokenInstance: string
}

export interface IContactInfo {
  avatar: string
  name: string
  email: string
  category: string
  description: string
  chatId: string
}

export interface IChatMessage {
  type: 'outgoing' | 'incoming'
  timestamp: number
  idMessage: string
  statusMessage?: 'pending' | 'sent' | 'delivered' | 'read'
  typeMessage: ETypeMessage
  chatId: string
  textMessage: string
  senderId?: string
  senderName?: string
}

export interface Message {
  typeWebhook: EWebhook
  instanceData: IInstanceData
  timestamp: number
  idMessage: string
  senderData: ISenderData
  messageData: TMessageData
}

export enum EWebhook {
  incomingMessageReceived = "incomingMessageReceived",        /** уведомление о входящих сообщениях и файлах */
  outgoingMessageReceived = "outgoingMessageReceived",        /** уведомление о сообщении, отправленного с телефона */
  outgoingAPIMessageReceived = "outgoingAPIMessageReceived",  /** уведомление о сообщении, отправленного из API */
  outgoingMessageStatus = "outgoingMessageStatus",            /** уведомление о статусах отправки/доставки/прочтении исходящих сообщений */
  stateInstanceChanged = "stateInstanceChanged",              /** уведомление об изменении состояния авторизации аккаунта */
  statusInstanceChanged = "statusInstanceChanged",            /** уведомление об изменении состояния сокета аккаунта */
  deviceInfo = "deviceInfo",                                  /** уведомление об устройстве (телефоне) и уровне заряда батареи */
  incomingCall = "incomingCall",                              /** уведомление о входящем звонке */
}

export enum ETypeMessage {
  textMessage = "textMessage",          /** текстовое сообщение */
  imageMessage = "imageMessage",         /** сообщение с изображением */
  videoMessage = "videoMessage",         /** видео сообщение */
  documentMessage = "documentMessage",      /** сообщение с файлом документа */
  audioMessage = "audioMessage",         /** аудио сообщение */
  locationMessage = "locationMessage",      /** сообщение геолокации */
  contactMessage = "contactMessage",       /** сообщение с контактом */
  extendedTextMessage = "extendedTextMessage",  /** сообщение со ссылкой и превью */
}

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
  typeMessage: Extract<ETypeMessage, 'textMessage'>
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

export interface Contact {
  id: string
  name: string
  type: 'user' | 'group'
}