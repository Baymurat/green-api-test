import { Middleware } from '@reduxjs/toolkit'
import { addMessages } from '../chat-list/chatListSlice'
import { ETypeMessage } from '@custom-types/types.d'

const REACT_APP_WEB_SOCKET_URL = process.env.REACT_APP_WEB_SOCKET_URL ?? ''

export const webSocketmsMiddleware: Middleware = function middleware({ dispatch, getState }) {
  return function wrapDispatch(next) {

    const ws = new WebSocket(REACT_APP_WEB_SOCKET_URL)
    ws.addEventListener('open', () => {
      console.log('Websocket connection is established');

      const intervalId = setInterval(() => {
        const { user } = getState().userStore
        console.log(user);

        if (user != null) {
          ws.send(JSON.stringify({
            command: 'init',
            idInstance: user.idInstance,
            apiTokenInstance: user.apiTokenInstance
          }))
          clearInterval(intervalId)
        }
      }, 1000)
    })

    ws.addEventListener('message', (message) => {
      const { idMessage, timestamp, senderData, messageData } = JSON.parse(message.data)
      const { chatId } = senderData
      const { textMessage } = messageData.textMessageData

      console.log('Received from server: ', message);
      dispatch(addMessages({
        chatId,
        messages: [{
          chatId,
          idMessage,
          timestamp,
          textMessage,
          typeMessage: ETypeMessage.textMessage,
          type: 'incoming'
        }]
      }))
    })

    return (action) => next(action)
  }
}