import env from '#start/env'

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email'

async function enviarConBrevo(destinatario: string, asunto: string, html: string) {
  const response = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'api-key': env.get('BREVO_API_KEY'),
    },
    body: JSON.stringify({
      sender: {
        name: 'Coffee Life',
        email: env.get('BREVO_SENDER_EMAIL'),
      },
      to: [{ email: destinatario }],
      subject: asunto,
      htmlContent: html,
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Brevo API error (${response.status}): ${errorBody}`)
  }

  return response.json()
}

export default class EmailService {
  static async enviarBienvenida(destinatario: string, nombre: string, rol: string, correo: string) {
    await enviarConBrevo(
      destinatario,
      'Bienvenido a Coffee Life',
      `
        <div style="font-family:sans-serif;max-width:500px;margin:auto">
          <h2 style="color:#6B4226">Bienvenido a Coffee Life</h2>
          <p>Hola <strong>${nombre}</strong>, tu cuenta fue creada exitosamente.</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0">
            <tr><td style="padding:8px;color:#666">Correo</td><td style="padding:8px">${correo}</td></tr>
            <tr><td style="padding:8px;color:#666">Rol</td><td style="padding:8px">${rol}</td></tr>
          </table>
          <p style="color:#999;font-size:12px">Si no solicitaste esta cuenta, ignora este correo.</p>
        </div>
      `
    )
  }

  static async enviarCodigoRecuperacion(destinatario: string, nombre: string, codigo: string) {
    await enviarConBrevo(
      destinatario,
      'Recuperar contraseña - Coffee Life',
      `
        <div style="font-family:sans-serif;max-width:500px;margin:auto">
          <h2 style="color:#6B4226">Recuperar contraseña</h2>
          <p>Hola <strong>${nombre}</strong>, recibimos una solicitud para restablecer tu contraseña.</p>
          <div style="text-align:center;margin:24px 0">
            <span style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#6B4226">${codigo}</span>
          </div>
          <p>Este código expira en <strong>15 minutos</strong>.</p>
          <p style="color:#999;font-size:12px">Si no solicitaste esto, ignora este correo.</p>
        </div>
      `
    )
  }

  static async enviarConfirmacionCambio(destinatario: string, nombre: string) {
    await enviarConBrevo(
      destinatario,
      'Contraseña restablecida - Coffee Life',
      `
        <div style="font-family:sans-serif;max-width:500px;margin:auto">
          <h2 style="color:#6B4226">Contraseña restablecida</h2>
          <p>Hola <strong>${nombre}</strong>, tu contraseña fue cambiada exitosamente.</p>
          <p>Si no realizaste este cambio, contacta al administrador inmediatamente.</p>
        </div>
      `
    )
  }
}
