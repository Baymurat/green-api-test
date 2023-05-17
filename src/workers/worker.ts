/* eslint-disable no-restricted-globals */

import whatsAppClient from '@green-api/whatsapp-api-client'

const start = ({ idInstance, apiTokenInstance }: any) => {

  (async () => {

    let restAPI = whatsAppClient.restAPI(({
      idInstance,
      apiTokenInstance
    }))

    try {
      console.log("Waiting incoming notifications...")
      let response
      while (response = await restAPI.webhookService.receiveNotification()) {
        let webhookBody = response.body;
        if (webhookBody.typeWebhook === 'incomingMessageReceived') {
          // Confirm WhatsApp message. Each received message must be confirmed to be able to consume next message
          await restAPI.webhookService.deleteNotification(response.receiptId);
        }

        self.postMessage({
          type: webhookBody.typeWebhook,
          payload: webhookBody
        })
      }
    } catch (ex) {
      console.error(ex)
    }

    console.log("End")

  })()
}

interface EventType {
  eventName: string
  payload: any
}

let isStarted = false

self.onmessage = (e: MessageEvent<EventType>) => {
  const { eventName, payload } = e.data
  if (eventName === 'startListening' && !isStarted) {
    isStarted = true
    start(payload)
  }
}