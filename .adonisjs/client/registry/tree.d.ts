/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    login: typeof routes['auth.login']
    register: typeof routes['auth.register']
    recuperarPassword: typeof routes['auth.recuperarPassword']
    restablecerPassword: typeof routes['auth.restablecerPassword']
  }
  usuarios: {
    index: typeof routes['usuarios.index']
    store: typeof routes['usuarios.store']
    show: typeof routes['usuarios.show']
    update: typeof routes['usuarios.update']
    destroy: typeof routes['usuarios.destroy']
  }
  admins: {
    index: typeof routes['admins.index']
    store: typeof routes['admins.store']
    show: typeof routes['admins.show']
    update: typeof routes['admins.update']
    destroy: typeof routes['admins.destroy']
  }
  cafeteros: {
    index: typeof routes['cafeteros.index']
    store: typeof routes['cafeteros.store']
    show: typeof routes['cafeteros.show']
    update: typeof routes['cafeteros.update']
    destroy: typeof routes['cafeteros.destroy']
  }
  expertos: {
    index: typeof routes['expertos.index']
    store: typeof routes['expertos.store']
    show: typeof routes['expertos.show']
    update: typeof routes['expertos.update']
    destroy: typeof routes['expertos.destroy']
  }
  roles: {
    index: typeof routes['roles.index']
    store: typeof routes['roles.store']
    show: typeof routes['roles.show']
    update: typeof routes['roles.update']
    destroy: typeof routes['roles.destroy']
  }
  catRoles: {
    index: typeof routes['cat_roles.index']
    store: typeof routes['cat_roles.store']
    show: typeof routes['cat_roles.show']
    update: typeof routes['cat_roles.update']
    destroy: typeof routes['cat_roles.destroy']
  }
  catTiposTratamiento: {
    index: typeof routes['cat_tipos_tratamiento.index']
    store: typeof routes['cat_tipos_tratamiento.store']
    show: typeof routes['cat_tipos_tratamiento.show']
    update: typeof routes['cat_tipos_tratamiento.update']
    destroy: typeof routes['cat_tipos_tratamiento.destroy']
  }
  catNivelesRoya: {
    index: typeof routes['cat_niveles_roya.index']
    store: typeof routes['cat_niveles_roya.store']
    show: typeof routes['cat_niveles_roya.show']
    update: typeof routes['cat_niveles_roya.update']
    destroy: typeof routes['cat_niveles_roya.destroy']
  }
  catPrioridades: {
    index: typeof routes['cat_prioridades.index']
    store: typeof routes['cat_prioridades.store']
    show: typeof routes['cat_prioridades.show']
    update: typeof routes['cat_prioridades.update']
    destroy: typeof routes['cat_prioridades.destroy']
  }
  catTiposRecomendacion: {
    index: typeof routes['cat_tipos_recomendacion.index']
    store: typeof routes['cat_tipos_recomendacion.store']
    show: typeof routes['cat_tipos_recomendacion.show']
    update: typeof routes['cat_tipos_recomendacion.update']
    destroy: typeof routes['cat_tipos_recomendacion.destroy']
  }
  catEstadosAnalisis: {
    index: typeof routes['cat_estados_analisis.index']
    store: typeof routes['cat_estados_analisis.store']
    show: typeof routes['cat_estados_analisis.show']
    update: typeof routes['cat_estados_analisis.update']
    destroy: typeof routes['cat_estados_analisis.destroy']
  }
  catEstadosCultivo: {
    index: typeof routes['cat_estados_cultivo.index']
    store: typeof routes['cat_estados_cultivo.store']
    show: typeof routes['cat_estados_cultivo.show']
    update: typeof routes['cat_estados_cultivo.update']
    destroy: typeof routes['cat_estados_cultivo.destroy']
  }
  categorias: {
    index: typeof routes['categorias.index']
    store: typeof routes['categorias.store']
    show: typeof routes['categorias.show']
    update: typeof routes['categorias.update']
    destroy: typeof routes['categorias.destroy']
  }
  fincas: {
    index: typeof routes['fincas.index']
    store: typeof routes['fincas.store']
    show: typeof routes['fincas.show']
    update: typeof routes['fincas.update']
    destroy: typeof routes['fincas.destroy']
  }
  cultivos: {
    index: typeof routes['cultivos.index']
    store: typeof routes['cultivos.store']
    show: typeof routes['cultivos.show']
    update: typeof routes['cultivos.update']
    destroy: typeof routes['cultivos.destroy']
  }
  monitoreos: {
    index: typeof routes['monitoreos.index']
    store: typeof routes['monitoreos.store']
    show: typeof routes['monitoreos.show']
    update: typeof routes['monitoreos.update']
    destroy: typeof routes['monitoreos.destroy']
  }
  recomendacionTratamientos: {
    index: typeof routes['recomendacion_tratamientos.index']
    store: typeof routes['recomendacion_tratamientos.store']
    show: typeof routes['recomendacion_tratamientos.show']
    update: typeof routes['recomendacion_tratamientos.update']
    destroy: typeof routes['recomendacion_tratamientos.destroy']
  }
  tratamientos: {
    index: typeof routes['tratamientos.index']
    store: typeof routes['tratamientos.store']
    show: typeof routes['tratamientos.show']
    update: typeof routes['tratamientos.update']
    destroy: typeof routes['tratamientos.destroy']
  }
  aplicacionesTratamientos: {
    index: typeof routes['aplicaciones_tratamientos.index']
    store: typeof routes['aplicaciones_tratamientos.store']
    show: typeof routes['aplicaciones_tratamientos.show']
    update: typeof routes['aplicaciones_tratamientos.update']
    destroy: typeof routes['aplicaciones_tratamientos.destroy']
  }
  imagenes: {
    index: typeof routes['imagenes.index']
    store: typeof routes['imagenes.store']
    show: typeof routes['imagenes.show']
    update: typeof routes['imagenes.update']
    destroy: typeof routes['imagenes.destroy']
  }
  analisisIa: {
    index: typeof routes['analisis_ia.index']
    store: typeof routes['analisis_ia.store']
    show: typeof routes['analisis_ia.show']
    update: typeof routes['analisis_ia.update']
    destroy: typeof routes['analisis_ia.destroy']
  }
  recomendaciones: {
    index: typeof routes['recomendaciones.index']
    store: typeof routes['recomendaciones.store']
    show: typeof routes['recomendaciones.show']
    update: typeof routes['recomendaciones.update']
    destroy: typeof routes['recomendaciones.destroy']
  }
}
