import admin from 'firebase-admin'
import env from '#start/env'

const serviceAccountJson = Buffer.from(
  env.get('FIREBASE_SERVICE_ACCOUNT_BASE64'),
  'base64'
).toString('utf-8')

const serviceAccount = JSON.parse(serviceAccountJson)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
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
    await admin.messaging().send({
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
