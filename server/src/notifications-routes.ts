import WebPush from 'web-push'
import { z } from "zod";
import { FastifyInstance } from "fastify";

const publicKey = 'BOkNjohg0R28Ty8ouZnlpjX_QVcziDxVvug2RvLK3uvWMNZsZ5vujAkUVedRosQIp1xVDazjBa6aVinD0oVoFpg'
const privateKey = 'YsnoZdBYDcGjWKdr9Ojm3DAF34qDaVl_EK42fXs9lCI'

WebPush.setVapidDetails(
  'http://localhost:3333',
  publicKey,
  privateKey,
)

export async function notificationsRoutes(app: FastifyInstance) {
  app.get('/push/public_key', () => {
    return {
      publicKey
    }
  })

  app.post('/push/register', (req, reply) => {
    console.log(req.body)

    return reply.status(201).send();
  })

  app.post('/push/send', async (req, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string()
        })
      })
    })

    const { subscription } = sendPushBody.parse(req.body)

    setTimeout(() => {
      WebPush.sendNotification(subscription, 'Backend Running Notification')
    }, 5000)

    return reply.status(201).send();
  })
}
