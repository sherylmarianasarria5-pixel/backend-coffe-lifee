import nodemailer from 'nodemailer'
import env from '#start/env'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  family: 4,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  auth: {
    user: env.get('SMTP_USER'),
    pass: env.get('SMTP_APP_PASSWORD'),
  },
} as nodemailer.TransportOptions)

export default class EmailService {
  static async enviarBienvenida(destinatario: string, nombre: string, rol: string, correo: string) {
    await transporter.sendMail({
      from: `"Coffee Life" <${env.get('SMTP_USER')}>`,
      to: destinatario,
      subject: 'Bienvenido a Coffee Life',
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:auto">
          <h2 style="color:#6B4226">Bienvenido a Coffee Life</h2>
          <p>Hola <strong>${nombre}</strong>, tu cuenta fue creada exitosamente.</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0">
            <tr><td style="padding:8px;color:#666">Correo</td><td style="padding:8px">${correo}</td></tr>
            <tr><td style="padding:8px;color:#666">Rol</td><td style="padding:8px">${rol}</td></tr>
          </table>
          <p style="color:#999;font-size:12px">Si no solicitaste esta cuenta, ignora este correo.</p>
        </div>
      `,
    })
  }

  static async enviarCodigoRecuperacion(destinatario: string, nombre: string, codigo: string) {
    await transporter.sendMail({
      from: `"Coffee Life" <${env.get('SMTP_USER')}>`,
      to: destinatario,
      subject: 'Recuperar contraseña - Coffee Life',
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:auto">
          <h2 style="color:#6B4226">Recuperar contraseña</h2>
          <p>Hola <strong>${nombre}</strong>, recibimos una solicitud para restablecer tu contraseña.</p>
          <div style="text-align:center;margin:24px 0">
            <span style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#6B4226">${codigo}</span>
          </div>
          <p>Este código expira en <strong>15 minutos</strong>.</p>
          <p style="color:#999;font-size:12px">Si no solicitaste esto, ignora este correo.</p>
        </div>
      `,
    })
  }

  static async enviarConfirmacionCambio(destinatario: string, nombre: string) {
    await transporter.sendMail({
      from: `"Coffee Life" <${env.get('SMTP_USER')}>`,
      to: destinatario,
      subject: 'Contraseña restablecida - Coffee Life',
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:auto">
          <h2 style="color:#6B4226">Contraseña restablecida</h2>
          <p>Hola <strong>${nombre}</strong>, tu contraseña fue cambiada exitosamente.</p>
          <p>Si no realizaste este cambio, contacta al administrador inmediatamente.</p>
        </div>
      `,
    })
  }
}
