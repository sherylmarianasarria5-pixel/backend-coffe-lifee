import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.recuperarPassword': { paramsTuple?: []; params?: {} }
    'auth.restablecerPassword': { paramsTuple?: []; params?: {} }
    'usuarios.index': { paramsTuple?: []; params?: {} }
    'usuarios.store': { paramsTuple?: []; params?: {} }
    'usuarios.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'usuarios.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'usuarios.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admins.index': { paramsTuple?: []; params?: {} }
    'admins.store': { paramsTuple?: []; params?: {} }
    'admins.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admins.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admins.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cafeteros.index': { paramsTuple?: []; params?: {} }
    'cafeteros.store': { paramsTuple?: []; params?: {} }
    'cafeteros.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cafeteros.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cafeteros.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'expertos.index': { paramsTuple?: []; params?: {} }
    'expertos.store': { paramsTuple?: []; params?: {} }
    'expertos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'expertos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'expertos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.index': { paramsTuple?: []; params?: {} }
    'roles.store': { paramsTuple?: []; params?: {} }
    'roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_roles.index': { paramsTuple?: []; params?: {} }
    'cat_roles.store': { paramsTuple?: []; params?: {} }
    'cat_roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_roles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_tratamiento.index': { paramsTuple?: []; params?: {} }
    'cat_tipos_tratamiento.store': { paramsTuple?: []; params?: {} }
    'cat_tipos_tratamiento.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_tratamiento.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_tratamiento.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_niveles_roya.index': { paramsTuple?: []; params?: {} }
    'cat_niveles_roya.store': { paramsTuple?: []; params?: {} }
    'cat_niveles_roya.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_niveles_roya.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_niveles_roya.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_prioridades.index': { paramsTuple?: []; params?: {} }
    'cat_prioridades.store': { paramsTuple?: []; params?: {} }
    'cat_prioridades.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_prioridades.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_prioridades.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_recomendacion.index': { paramsTuple?: []; params?: {} }
    'cat_tipos_recomendacion.store': { paramsTuple?: []; params?: {} }
    'cat_tipos_recomendacion.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_recomendacion.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_recomendacion.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_analisis.index': { paramsTuple?: []; params?: {} }
    'cat_estados_analisis.store': { paramsTuple?: []; params?: {} }
    'cat_estados_analisis.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_analisis.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_analisis.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_cultivo.index': { paramsTuple?: []; params?: {} }
    'cat_estados_cultivo.store': { paramsTuple?: []; params?: {} }
    'cat_estados_cultivo.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_cultivo.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_cultivo.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categorias.index': { paramsTuple?: []; params?: {} }
    'categorias.store': { paramsTuple?: []; params?: {} }
    'categorias.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categorias.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categorias.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fincas.index': { paramsTuple?: []; params?: {} }
    'fincas.store': { paramsTuple?: []; params?: {} }
    'fincas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fincas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fincas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cultivos.index': { paramsTuple?: []; params?: {} }
    'cultivos.store': { paramsTuple?: []; params?: {} }
    'cultivos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cultivos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cultivos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'monitoreos.index': { paramsTuple?: []; params?: {} }
    'monitoreos.store': { paramsTuple?: []; params?: {} }
    'monitoreos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'monitoreos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'monitoreos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendacion_tratamientos.index': { paramsTuple?: []; params?: {} }
    'recomendacion_tratamientos.store': { paramsTuple?: []; params?: {} }
    'recomendacion_tratamientos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendacion_tratamientos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendacion_tratamientos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tratamientos.index': { paramsTuple?: []; params?: {} }
    'tratamientos.store': { paramsTuple?: []; params?: {} }
    'tratamientos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tratamientos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tratamientos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aplicaciones_tratamientos.index': { paramsTuple?: []; params?: {} }
    'aplicaciones_tratamientos.store': { paramsTuple?: []; params?: {} }
    'aplicaciones_tratamientos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aplicaciones_tratamientos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aplicaciones_tratamientos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'imagenes.index': { paramsTuple?: []; params?: {} }
    'imagenes.store': { paramsTuple?: []; params?: {} }
    'imagenes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'imagenes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'imagenes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'analisis_ia.index': { paramsTuple?: []; params?: {} }
    'analisis_ia.store': { paramsTuple?: []; params?: {} }
    'analisis_ia.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'analisis_ia.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'analisis_ia.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendaciones.index': { paramsTuple?: []; params?: {} }
    'recomendaciones.store': { paramsTuple?: []; params?: {} }
    'recomendaciones.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendaciones.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendaciones.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'usuarios.index': { paramsTuple?: []; params?: {} }
    'usuarios.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admins.index': { paramsTuple?: []; params?: {} }
    'admins.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cafeteros.index': { paramsTuple?: []; params?: {} }
    'cafeteros.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'expertos.index': { paramsTuple?: []; params?: {} }
    'expertos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.index': { paramsTuple?: []; params?: {} }
    'roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_roles.index': { paramsTuple?: []; params?: {} }
    'cat_roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_tratamiento.index': { paramsTuple?: []; params?: {} }
    'cat_tipos_tratamiento.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_niveles_roya.index': { paramsTuple?: []; params?: {} }
    'cat_niveles_roya.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_prioridades.index': { paramsTuple?: []; params?: {} }
    'cat_prioridades.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_recomendacion.index': { paramsTuple?: []; params?: {} }
    'cat_tipos_recomendacion.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_analisis.index': { paramsTuple?: []; params?: {} }
    'cat_estados_analisis.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_cultivo.index': { paramsTuple?: []; params?: {} }
    'cat_estados_cultivo.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categorias.index': { paramsTuple?: []; params?: {} }
    'categorias.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fincas.index': { paramsTuple?: []; params?: {} }
    'fincas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cultivos.index': { paramsTuple?: []; params?: {} }
    'cultivos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'monitoreos.index': { paramsTuple?: []; params?: {} }
    'monitoreos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendacion_tratamientos.index': { paramsTuple?: []; params?: {} }
    'recomendacion_tratamientos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tratamientos.index': { paramsTuple?: []; params?: {} }
    'tratamientos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aplicaciones_tratamientos.index': { paramsTuple?: []; params?: {} }
    'aplicaciones_tratamientos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'imagenes.index': { paramsTuple?: []; params?: {} }
    'imagenes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'analisis_ia.index': { paramsTuple?: []; params?: {} }
    'analisis_ia.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendaciones.index': { paramsTuple?: []; params?: {} }
    'recomendaciones.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'usuarios.index': { paramsTuple?: []; params?: {} }
    'usuarios.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admins.index': { paramsTuple?: []; params?: {} }
    'admins.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cafeteros.index': { paramsTuple?: []; params?: {} }
    'cafeteros.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'expertos.index': { paramsTuple?: []; params?: {} }
    'expertos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.index': { paramsTuple?: []; params?: {} }
    'roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_roles.index': { paramsTuple?: []; params?: {} }
    'cat_roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_tratamiento.index': { paramsTuple?: []; params?: {} }
    'cat_tipos_tratamiento.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_niveles_roya.index': { paramsTuple?: []; params?: {} }
    'cat_niveles_roya.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_prioridades.index': { paramsTuple?: []; params?: {} }
    'cat_prioridades.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_recomendacion.index': { paramsTuple?: []; params?: {} }
    'cat_tipos_recomendacion.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_analisis.index': { paramsTuple?: []; params?: {} }
    'cat_estados_analisis.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_cultivo.index': { paramsTuple?: []; params?: {} }
    'cat_estados_cultivo.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categorias.index': { paramsTuple?: []; params?: {} }
    'categorias.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fincas.index': { paramsTuple?: []; params?: {} }
    'fincas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cultivos.index': { paramsTuple?: []; params?: {} }
    'cultivos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'monitoreos.index': { paramsTuple?: []; params?: {} }
    'monitoreos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendacion_tratamientos.index': { paramsTuple?: []; params?: {} }
    'recomendacion_tratamientos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tratamientos.index': { paramsTuple?: []; params?: {} }
    'tratamientos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aplicaciones_tratamientos.index': { paramsTuple?: []; params?: {} }
    'aplicaciones_tratamientos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'imagenes.index': { paramsTuple?: []; params?: {} }
    'imagenes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'analisis_ia.index': { paramsTuple?: []; params?: {} }
    'analisis_ia.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendaciones.index': { paramsTuple?: []; params?: {} }
    'recomendaciones.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.recuperarPassword': { paramsTuple?: []; params?: {} }
    'auth.restablecerPassword': { paramsTuple?: []; params?: {} }
    'usuarios.store': { paramsTuple?: []; params?: {} }
    'admins.store': { paramsTuple?: []; params?: {} }
    'cafeteros.store': { paramsTuple?: []; params?: {} }
    'expertos.store': { paramsTuple?: []; params?: {} }
    'roles.store': { paramsTuple?: []; params?: {} }
    'cat_roles.store': { paramsTuple?: []; params?: {} }
    'cat_tipos_tratamiento.store': { paramsTuple?: []; params?: {} }
    'cat_niveles_roya.store': { paramsTuple?: []; params?: {} }
    'cat_prioridades.store': { paramsTuple?: []; params?: {} }
    'cat_tipos_recomendacion.store': { paramsTuple?: []; params?: {} }
    'cat_estados_analisis.store': { paramsTuple?: []; params?: {} }
    'cat_estados_cultivo.store': { paramsTuple?: []; params?: {} }
    'categorias.store': { paramsTuple?: []; params?: {} }
    'fincas.store': { paramsTuple?: []; params?: {} }
    'cultivos.store': { paramsTuple?: []; params?: {} }
    'monitoreos.store': { paramsTuple?: []; params?: {} }
    'recomendacion_tratamientos.store': { paramsTuple?: []; params?: {} }
    'tratamientos.store': { paramsTuple?: []; params?: {} }
    'aplicaciones_tratamientos.store': { paramsTuple?: []; params?: {} }
    'imagenes.store': { paramsTuple?: []; params?: {} }
    'analisis_ia.store': { paramsTuple?: []; params?: {} }
    'recomendaciones.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'usuarios.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admins.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cafeteros.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'expertos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_tratamiento.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_niveles_roya.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_prioridades.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_recomendacion.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_analisis.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_cultivo.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categorias.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fincas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cultivos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'monitoreos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendacion_tratamientos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tratamientos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aplicaciones_tratamientos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'imagenes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'analisis_ia.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendaciones.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'usuarios.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admins.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cafeteros.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'expertos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_roles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_tratamiento.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_niveles_roya.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_prioridades.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_recomendacion.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_analisis.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_cultivo.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categorias.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fincas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cultivos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'monitoreos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendacion_tratamientos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tratamientos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aplicaciones_tratamientos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'imagenes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'analisis_ia.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendaciones.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}