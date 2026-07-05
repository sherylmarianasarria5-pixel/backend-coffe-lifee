import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getMessaging } from 'firebase-admin/messaging'
import env from '#start/env'

const serviceAccountJson = Buffer.from(
  env.get('FIREBASE_SERVICE_ACCOUNT_BASE64'),
  'base64'
).toString('utf-8')

const serviceAccount = JSON.parse(serviceAccountJson)

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  })
}

export async function enviarPush({
  token,
  titulo,
  mensaje,
  data = {},
}: {
  token: string
  titulo: string
  mensaje: string
  data?: Record<string, string>
}) {
  try {
    await getMessaging().send({
      token,
      notification: {
        title: titulo,
        body: mensaje,
      },
      data,
    })
  } catch (error: any) {
    console.error('Error al enviar push FCM:', error.message)
  }
}
