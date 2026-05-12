import { v2 as cloudinary } from 'cloudinary'
import env from '#start/env'

cloudinary.config({
  cloud_name: env.get('CLOUDINARY_CLOUD_NAME'),
  api_key:    env.get('CLOUDINARY_API_KEY'),
  api_secret: env.get('CLOUDINARY_API_SECRET'),
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
