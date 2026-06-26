import Notificacione from '#models/notificacione'

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
    await Notificacione.create({
      idUsuario,
      tipo,
      titulo,
      mensaje,
      leida: false,
      idReferencia,
      tablaReferencia,
    })
  } catch (error) {
    console.error('Error al crear notificación:', error)
  }
}
