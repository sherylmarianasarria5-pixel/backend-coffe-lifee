/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    login: typeof routes['auth.login']
    register: typeof routes['auth.register']
    recuperarPassword: typeof routes['auth.recuperar_password']
    verificarToken: typeof routes['auth.verificar_token']
    restablecerPassword: typeof routes['auth.restablecer_password']
  }
  miPerfil: {
    show: typeof routes['mi_perfil.show']
    update: typeof routes['mi_perfil.update']
    cambiarPassword: typeof routes['mi_perfil.cambiar_password']
  }
  catRoles: {
    index: typeof routes['cat_roles.index']
    show: typeof routes['cat_roles.show']
    store: typeof routes['cat_roles.store']
    update: typeof routes['cat_roles.update']
    destroy: typeof routes['cat_roles.destroy']
  }
  catTiposTratamientos: {
    index: typeof routes['cat_tipos_tratamientos.index']
    show: typeof routes['cat_tipos_tratamientos.show']
    store: typeof routes['cat_tipos_tratamientos.store']
    update: typeof routes['cat_tipos_tratamientos.update']
    destroy: typeof routes['cat_tipos_tratamientos.destroy']
  }
  catNivelesRoyas: {
    index: typeof routes['cat_niveles_royas.index']
    show: typeof routes['cat_niveles_royas.show']
    store: typeof routes['cat_niveles_royas.store']
    update: typeof routes['cat_niveles_royas.update']
    destroy: typeof routes['cat_niveles_royas.destroy']
  }
  catPrioridades: {
    index: typeof routes['cat_prioridades.index']
    show: typeof routes['cat_prioridades.show']
    store: typeof routes['cat_prioridades.store']
    update: typeof routes['cat_prioridades.update']
    destroy: typeof routes['cat_prioridades.destroy']
  }
  catTiposRecomendaciones: {
    index: typeof routes['cat_tipos_recomendaciones.index']
    show: typeof routes['cat_tipos_recomendaciones.show']
    store: typeof routes['cat_tipos_recomendaciones.store']
    update: typeof routes['cat_tipos_recomendaciones.update']
    destroy: typeof routes['cat_tipos_recomendaciones.destroy']
  }
  catEstadosAnalisis: {
    index: typeof routes['cat_estados_analisis.index']
    show: typeof routes['cat_estados_analisis.show']
    store: typeof routes['cat_estados_analisis.store']
    update: typeof routes['cat_estados_analisis.update']
    destroy: typeof routes['cat_estados_analisis.destroy']
  }
  catEstadosCultivos: {
    index: typeof routes['cat_estados_cultivos.index']
    show: typeof routes['cat_estados_cultivos.show']
    store: typeof routes['cat_estados_cultivos.store']
    update: typeof routes['cat_estados_cultivos.update']
    destroy: typeof routes['cat_estados_cultivos.destroy']
  }
  categorias: {
    index: typeof routes['categorias.index']
    show: typeof routes['categorias.show']
    store: typeof routes['categorias.store']
    update: typeof routes['categorias.update']
    destroy: typeof routes['categorias.destroy']
  }
  catTiposInsumos: {
    index: typeof routes['cat_tipos_insumos.index']
    show: typeof routes['cat_tipos_insumos.show']
    store: typeof routes['cat_tipos_insumos.store']
    update: typeof routes['cat_tipos_insumos.update']
    destroy: typeof routes['cat_tipos_insumos.destroy']
  }
  insumos: {
    index: typeof routes['insumos.index']
    show: typeof routes['insumos.show']
    store: typeof routes['insumos.store']
    update: typeof routes['insumos.update']
    destroy: typeof routes['insumos.destroy']
  }
  dashboard: {
    index: typeof routes['dashboard.index']
  }
  usuarios: {
    index: typeof routes['usuarios.index']
    store: typeof routes['usuarios.store']
    show: typeof routes['usuarios.show']
    update: typeof routes['usuarios.update']
    destroy: typeof routes['usuarios.destroy']
  }
  admin: {
    index: typeof routes['admin.index']
    store: typeof routes['admin.store']
    show: typeof routes['admin.show']
    update: typeof routes['admin.update']
    destroy: typeof routes['admin.destroy']
  }
  expertos: {
    index: typeof routes['expertos.index']
    store: typeof routes['expertos.store']
    show: typeof routes['expertos.show']
    update: typeof routes['expertos.update']
    destroy: typeof routes['expertos.destroy']
  }
  asignacionesExpertos: {
    store: typeof routes['asignaciones_expertos.store']
    update: typeof routes['asignaciones_expertos.update']
    destroy: typeof routes['asignaciones_expertos.destroy']
    index: typeof routes['asignaciones_expertos.index']
    show: typeof routes['asignaciones_expertos.show']
  }
  cafeteros: {
    index: typeof routes['cafeteros.index']
    show: typeof routes['cafeteros.show']
    store: typeof routes['cafeteros.store']
    update: typeof routes['cafeteros.update']
    destroy: typeof routes['cafeteros.destroy']
  }
  monitoreos: {
    update: typeof routes['monitoreos.update']
    destroy: typeof routes['monitoreos.destroy']
    index: typeof routes['monitoreos.index']
    show: typeof routes['monitoreos.show']
    store: typeof routes['monitoreos.store']
  }
  analisisIa: {
    update: typeof routes['analisis_ia.update']
    destroy: typeof routes['analisis_ia.destroy']
    predict: typeof routes['analisis_ia.predict']
    index: typeof routes['analisis_ia.index']
    show: typeof routes['analisis_ia.show']
    store: typeof routes['analisis_ia.store']
  }
  recomendaciones: {
    store: typeof routes['recomendaciones.store']
    update: typeof routes['recomendaciones.update']
    destroy: typeof routes['recomendaciones.destroy']
    index: typeof routes['recomendaciones.index']
    show: typeof routes['recomendaciones.show']
  }
  tratamientos: {
    store: typeof routes['tratamientos.store']
    update: typeof routes['tratamientos.update']
    destroy: typeof routes['tratamientos.destroy']
    index: typeof routes['tratamientos.index']
    show: typeof routes['tratamientos.show']
  }
  aplicacionesTratamientos: {
    store: typeof routes['aplicaciones_tratamientos.store']
    update: typeof routes['aplicaciones_tratamientos.update']
    destroy: typeof routes['aplicaciones_tratamientos.destroy']
    index: typeof routes['aplicaciones_tratamientos.index']
    show: typeof routes['aplicaciones_tratamientos.show']
  }
  recomendacionTratamientos: {
    store: typeof routes['recomendacion_tratamientos.store']
    update: typeof routes['recomendacion_tratamientos.update']
    destroy: typeof routes['recomendacion_tratamientos.destroy']
    index: typeof routes['recomendacion_tratamientos.index']
    show: typeof routes['recomendacion_tratamientos.show']
  }
  imagenes: {
    update: typeof routes['imagenes.update']
    destroy: typeof routes['imagenes.destroy']
    index: typeof routes['imagenes.index']
    show: typeof routes['imagenes.show']
    store: typeof routes['imagenes.store']
  }
  fincas: {
    index: typeof routes['fincas.index']
    store: typeof routes['fincas.store']
    show: typeof routes['fincas.show']
    update: typeof routes['fincas.update']
    destroy: typeof routes['fincas.destroy']
    uploadPhoto: typeof routes['fincas.upload_photo']
  }
  cultivos: {
    index: typeof routes['cultivos.index']
    store: typeof routes['cultivos.store']
    show: typeof routes['cultivos.show']
    update: typeof routes['cultivos.update']
    destroy: typeof routes['cultivos.destroy']
    uploadPhoto: typeof routes['cultivos.upload_photo']
  }
  experto: {
    dashboard: typeof routes['experto.dashboard']
    fincas: typeof routes['experto.fincas']
    cultivos: typeof routes['experto.cultivos']
    monitoreos: typeof routes['experto.monitoreos']
    analisisIa: typeof routes['experto.analisis_ia']
    crearMonitoreo: typeof routes['experto.crear_monitoreo']
    actualizarMonitoreo: typeof routes['experto.actualizar_monitoreo']
    recomendaciones: typeof routes['experto.recomendaciones']
    crearRecomendacion: typeof routes['experto.crear_recomendacion']
    actualizarRecomendacion: typeof routes['experto.actualizar_recomendacion']
    tratamientos: typeof routes['experto.tratamientos']
    aplicacionesTratamiento: typeof routes['experto.aplicaciones_tratamiento']
    crearAplicacionTratamiento: typeof routes['experto.crear_aplicacion_tratamiento']
    crearRecomendacionTratamiento: typeof routes['experto.crear_recomendacion_tratamiento']
  }
  caficultor: {
    dashboard: typeof routes['caficultor.dashboard']
    fincas: typeof routes['caficultor.fincas']
    cultivos: typeof routes['caficultor.cultivos']
    monitoreos: typeof routes['caficultor.monitoreos']
    recomendaciones: typeof routes['caficultor.recomendaciones']
    analisisIa: typeof routes['caficultor.analisis_ia']
    expertosAsignados: typeof routes['caficultor.expertos_asignados']
    analizarImagen: typeof routes['caficultor.analizar_imagen']
  }
}
