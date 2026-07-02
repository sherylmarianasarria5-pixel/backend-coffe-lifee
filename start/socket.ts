import app from '@adonisjs/core/services/app'
import server from '@adonisjs/core/services/server'
import { Server as SocketServer } from 'socket.io'

let io: SocketServer | null = null

app.ready(() => {
  io = new SocketServer(server.getNodeServer(), {
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

    socket.on('unirse_finca', (idFinca: number) => {
      socket.join(`finca:${idFinca}`)
      console.log(`[Socket.IO] Socket ${socket.id} unido a sala finca:${idFinca}`)
    })

    socket.on('salir_finca', (idFinca: number) => {
      socket.leave(`finca:${idFinca}`)
    })

    socket.on('disconnect', () => {
      console.log(`[Socket.IO] Cliente desconectado: ${socket.id}`)
    })
  })

  console.log('[Socket.IO] Servicio iniciado')
})

export function emitirNotificacion(idUsuario: number, data: any) {
  if (!io) {
    console.warn('[Socket.IO] No se puede emitir, io no está inicializado')
    return
  }
  io.to(`usuario:${idUsuario}`).emit('notificacion', data)
}

export function emitirEventoFinca(idFinca: number, evento: string, data: any) {
  if (!io) {
    console.warn('[Socket.IO] No se puede emitir, io no está inicializado')
    return
  }
  io.to(`finca:${idFinca}`).emit(evento, data)
}
