import { Server as SocketServer } from 'socket.io'

let io: SocketServer | null = null

export function iniciarSocketIO(server: any) {
  io = new SocketServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    console.log(`[Socket.IO] Cliente conectado: ${socket.id}`)

    socket.on('unirse', (idUsuario: number) => {
      socket.join(`usuario:${idUsuario}`)
      console.log(`[Socket.IO] Socket ${socket.id} unido a sala usuario:${idUsuario}`)
    })

    socket.on('disconnect', () => {
      console.log(`[Socket.IO] Cliente desconectado: ${socket.id}`)
    })
  })

  console.log('[Socket.IO] Servicio iniciado')
}

export function emitirNotificacion(idUsuario: number, data: any) {
  if (!io) {
    console.warn('[Socket.IO] No se puede emitir, io no está inicializado')
    return
  }
  io.to(`usuario:${idUsuario}`).emit('notificacion', data)
}
