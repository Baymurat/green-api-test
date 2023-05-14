export interface WSUser {
  icon: string
  name: string
  id: string
}

export interface Message {
  id: string
  content: string
  messageDate: string
  author: WSUser
}