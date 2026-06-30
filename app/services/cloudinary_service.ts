import { v2 as cloudinary } from 'cloudinary'
import env from '#start/env'

function resolverValor(valor: unknown): string {
  if (valor && typeof valor === 'object' && 'release' in valor && typeof (valor as any).release === 'function') {
    return (valor as { release(): string }).release()
  }
  return String(valor)
}

cloudinary.config({
  cloud_name: resolverValor(env.get('CLOUDINARY_CLOUD_NAME')),
  api_key:    resolverValor(env.get('CLOUDINARY_API_KEY')),
  api_secret: resolverValor(env.get('CLOUDINARY_API_SECRET')),
})

export async function subirImagen(rutaArchivo: string): Promise<string> {
  const resultado = await cloudinary.uploader.upload(rutaArchivo, {
    folder: 'coffee_life',
  })
  return resultado.secure_url
}

export async function eliminarImagen(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId)
}
