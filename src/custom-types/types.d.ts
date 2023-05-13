export interface WSUser {
  icon: string
  name: string
}

export interface Message {
  id: string
  content: string
  messageDate: string
  author: WSUser
}