import { EWebhook } from '@custom-types/types.d'
import { Middleware } from '@reduxjs/toolkit'

export const notificationsMiddleware: Middleware = function middleware({ dispatch, getState }) {
  return function wrapDispatch(next) {
    const worker = new Worker(new URL('../../../workers/worker.ts', import.meta.url))

    worker.onmessage = (e) => {
      const { type, payload } = e.data
      console.log(e.data);

      if (type === EWebhook.incomingMessageReceived) {
        console.log(payload);
      }
    }

    return function handleAction(action) {
      const { user } = getState().notificationsStore

      if (action.type === 'chatList/sendMessage') {
        worker.postMessage('test')
      }

      if (action.type === 'notifications/starNotificationsListening' && user != null) {
        // worker.postMessage({
        //   eventName: 'startListening',
        //   payload: user
        // })
      }

      return next(action)
    }
  }
}