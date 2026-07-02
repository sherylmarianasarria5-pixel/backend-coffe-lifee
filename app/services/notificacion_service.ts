import Notificacione from '#models/notificacione'
import { emitirNotificacion } from '#start/socket'

export async function crearNotificacion({
  idUsuario,
  tipo,
  titulo,
  mensaje,
  idReferencia = null,
  tablaReferencia = null,
}: {
  idUsuario: number
  tipo: string
  titulo: string
  mensaje: string
  idReferencia?: number | null
  tablaReferencia?: string | null
}) {
  try {
    const notificacion = await Notificacione.create({
      idUsuario,
      tipo,
      titulo,
      mensaje,
      leida: false,
      idReferencia,
      tablaReferencia,
    })

    emitirNotificacion(idUsuario, notificacion.toJSON())

    return notificacion
  } catch (error) {
    console.error('Error al crear notificación:', error)
  }
}
