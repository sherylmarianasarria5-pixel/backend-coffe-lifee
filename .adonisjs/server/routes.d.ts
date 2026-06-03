import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.recuperar_password': { paramsTuple?: []; params?: {} }
    'auth.verificar_token': { paramsTuple?: []; params?: {} }
    'auth.restablecer_password': { paramsTuple?: []; params?: {} }
    'mi_perfil.show': { paramsTuple?: []; params?: {} }
    'mi_perfil.update': { paramsTuple?: []; params?: {} }
    'mi_perfil.cambiar_password': { paramsTuple?: []; params?: {} }
    'cat_roles.index': { paramsTuple?: []; params?: {} }
    'cat_roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_tratamientos.index': { paramsTuple?: []; params?: {} }
    'cat_tipos_tratamientos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_niveles_royas.index': { paramsTuple?: []; params?: {} }
    'cat_niveles_royas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_prioridades.index': { paramsTuple?: []; params?: {} }
    'cat_prioridades.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_recomendaciones.index': { paramsTuple?: []; params?: {} }
    'cat_tipos_recomendaciones.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_analisis.index': { paramsTuple?: []; params?: {} }
    'cat_estados_analisis.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_cultivos.index': { paramsTuple?: []; params?: {} }
    'cat_estados_cultivos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categorias.index': { paramsTuple?: []; params?: {} }
    'categorias.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'dashboard.index': { paramsTuple?: []; params?: {} }
    'usuarios.index': { paramsTuple?: []; params?: {} }
    'usuarios.store': { paramsTuple?: []; params?: {} }
    'usuarios.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'usuarios.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'usuarios.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.index': { paramsTuple?: []; params?: {} }
    'admin.store': { paramsTuple?: []; params?: {} }
    'admin.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'expertos.index': { paramsTuple?: []; params?: {} }
    'expertos.store': { paramsTuple?: []; params?: {} }
    'expertos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'expertos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'expertos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'asignaciones_expertos.store': { paramsTuple?: []; params?: {} }
    'asignaciones_expertos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'asignaciones_expertos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_roles.store': { paramsTuple?: []; params?: {} }
    'cat_roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_roles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_tratamientos.store': { paramsTuple?: []; params?: {} }
    'cat_tipos_tratamientos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_tratamientos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_niveles_royas.store': { paramsTuple?: []; params?: {} }
    'cat_niveles_royas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_niveles_royas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_prioridades.store': { paramsTuple?: []; params?: {} }
    'cat_prioridades.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_prioridades.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_recomendaciones.store': { paramsTuple?: []; params?: {} }
    'cat_tipos_recomendaciones.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_recomendaciones.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_analisis.store': { paramsTuple?: []; params?: {} }
    'cat_estados_analisis.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_analisis.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_cultivos.store': { paramsTuple?: []; params?: {} }
    'cat_estados_cultivos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_cultivos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categorias.store': { paramsTuple?: []; params?: {} }
    'categorias.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categorias.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'asignaciones_expertos.index': { paramsTuple?: []; params?: {} }
    'asignaciones_expertos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cafeteros.index': { paramsTuple?: []; params?: {} }
    'cafeteros.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'monitoreos.store': { paramsTuple?: []; params?: {} }
    'monitoreos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'monitoreos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'analisis_ia.store': { paramsTuple?: []; params?: {} }
    'analisis_ia.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'analisis_ia.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'analisis_ia.predict': { paramsTuple?: []; params?: {} }
    'recomendaciones.store': { paramsTuple?: []; params?: {} }
    'recomendaciones.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendaciones.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tratamientos.store': { paramsTuple?: []; params?: {} }
    'tratamientos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tratamientos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aplicaciones_tratamientos.store': { paramsTuple?: []; params?: {} }
    'aplicaciones_tratamientos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aplicaciones_tratamientos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendacion_tratamientos.store': { paramsTuple?: []; params?: {} }
    'recomendacion_tratamientos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendacion_tratamientos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendacion_ia.store': { paramsTuple?: []; params?: {} }
    'recomendacion_ia.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendacion_ia.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tratamiento_ia.store': { paramsTuple?: []; params?: {} }
    'tratamiento_ia.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tratamiento_ia.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'imagenes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'imagenes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cafeteros.store': { paramsTuple?: []; params?: {} }
    'cafeteros.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cafeteros.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
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
    'monitoreos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'analisis_ia.index': { paramsTuple?: []; params?: {} }
    'analisis_ia.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendaciones.index': { paramsTuple?: []; params?: {} }
    'recomendaciones.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tratamientos.index': { paramsTuple?: []; params?: {} }
    'tratamientos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aplicaciones_tratamientos.index': { paramsTuple?: []; params?: {} }
    'aplicaciones_tratamientos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendacion_tratamientos.index': { paramsTuple?: []; params?: {} }
    'recomendacion_tratamientos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendacion_ia.index': { paramsTuple?: []; params?: {} }
    'recomendacion_ia.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tratamiento_ia.index': { paramsTuple?: []; params?: {} }
    'tratamiento_ia.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'imagenes.index': { paramsTuple?: []; params?: {} }
    'imagenes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'imagenes.store': { paramsTuple?: []; params?: {} }
    'experto.dashboard': { paramsTuple?: []; params?: {} }
    'experto.fincas': { paramsTuple?: []; params?: {} }
    'experto.cultivos': { paramsTuple?: []; params?: {} }
    'experto.monitoreos': { paramsTuple?: []; params?: {} }
    'experto.crear_monitoreo': { paramsTuple?: []; params?: {} }
    'experto.actualizar_monitoreo': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'experto.recomendaciones': { paramsTuple?: []; params?: {} }
    'experto.crear_recomendacion': { paramsTuple?: []; params?: {} }
    'experto.actualizar_recomendacion': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'experto.tratamientos': { paramsTuple?: []; params?: {} }
    'experto.aplicaciones_tratamiento': { paramsTuple?: []; params?: {} }
    'experto.crear_aplicacion_tratamiento': { paramsTuple?: []; params?: {} }
    'experto.crear_recomendacion_tratamiento': { paramsTuple?: []; params?: {} }
    'caficultor.dashboard': { paramsTuple?: []; params?: {} }
    'caficultor.fincas': { paramsTuple?: []; params?: {} }
    'caficultor.cultivos': { paramsTuple?: []; params?: {} }
    'caficultor.monitoreos': { paramsTuple?: []; params?: {} }
    'caficultor.recomendaciones': { paramsTuple?: []; params?: {} }
    'caficultor.analisis_ia': { paramsTuple?: []; params?: {} }
    'caficultor.expertos_asignados': { paramsTuple?: []; params?: {} }
    'caficultor.analizar_imagen': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'mi_perfil.show': { paramsTuple?: []; params?: {} }
    'cat_roles.index': { paramsTuple?: []; params?: {} }
    'cat_roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_tratamientos.index': { paramsTuple?: []; params?: {} }
    'cat_tipos_tratamientos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_niveles_royas.index': { paramsTuple?: []; params?: {} }
    'cat_niveles_royas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_prioridades.index': { paramsTuple?: []; params?: {} }
    'cat_prioridades.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_recomendaciones.index': { paramsTuple?: []; params?: {} }
    'cat_tipos_recomendaciones.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_analisis.index': { paramsTuple?: []; params?: {} }
    'cat_estados_analisis.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_cultivos.index': { paramsTuple?: []; params?: {} }
    'cat_estados_cultivos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categorias.index': { paramsTuple?: []; params?: {} }
    'categorias.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'dashboard.index': { paramsTuple?: []; params?: {} }
    'usuarios.index': { paramsTuple?: []; params?: {} }
    'usuarios.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.index': { paramsTuple?: []; params?: {} }
    'admin.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'expertos.index': { paramsTuple?: []; params?: {} }
    'expertos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'asignaciones_expertos.index': { paramsTuple?: []; params?: {} }
    'asignaciones_expertos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cafeteros.index': { paramsTuple?: []; params?: {} }
    'cafeteros.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fincas.index': { paramsTuple?: []; params?: {} }
    'fincas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cultivos.index': { paramsTuple?: []; params?: {} }
    'cultivos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'monitoreos.index': { paramsTuple?: []; params?: {} }
    'monitoreos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'analisis_ia.index': { paramsTuple?: []; params?: {} }
    'analisis_ia.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendaciones.index': { paramsTuple?: []; params?: {} }
    'recomendaciones.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tratamientos.index': { paramsTuple?: []; params?: {} }
    'tratamientos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aplicaciones_tratamientos.index': { paramsTuple?: []; params?: {} }
    'aplicaciones_tratamientos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendacion_tratamientos.index': { paramsTuple?: []; params?: {} }
    'recomendacion_tratamientos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendacion_ia.index': { paramsTuple?: []; params?: {} }
    'recomendacion_ia.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tratamiento_ia.index': { paramsTuple?: []; params?: {} }
    'tratamiento_ia.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'imagenes.index': { paramsTuple?: []; params?: {} }
    'imagenes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'experto.dashboard': { paramsTuple?: []; params?: {} }
    'experto.fincas': { paramsTuple?: []; params?: {} }
    'experto.cultivos': { paramsTuple?: []; params?: {} }
    'experto.monitoreos': { paramsTuple?: []; params?: {} }
    'experto.recomendaciones': { paramsTuple?: []; params?: {} }
    'experto.tratamientos': { paramsTuple?: []; params?: {} }
    'experto.aplicaciones_tratamiento': { paramsTuple?: []; params?: {} }
    'caficultor.dashboard': { paramsTuple?: []; params?: {} }
    'caficultor.fincas': { paramsTuple?: []; params?: {} }
    'caficultor.cultivos': { paramsTuple?: []; params?: {} }
    'caficultor.monitoreos': { paramsTuple?: []; params?: {} }
    'caficultor.recomendaciones': { paramsTuple?: []; params?: {} }
    'caficultor.analisis_ia': { paramsTuple?: []; params?: {} }
    'caficultor.expertos_asignados': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'mi_perfil.show': { paramsTuple?: []; params?: {} }
    'cat_roles.index': { paramsTuple?: []; params?: {} }
    'cat_roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_tratamientos.index': { paramsTuple?: []; params?: {} }
    'cat_tipos_tratamientos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_niveles_royas.index': { paramsTuple?: []; params?: {} }
    'cat_niveles_royas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_prioridades.index': { paramsTuple?: []; params?: {} }
    'cat_prioridades.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_recomendaciones.index': { paramsTuple?: []; params?: {} }
    'cat_tipos_recomendaciones.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_analisis.index': { paramsTuple?: []; params?: {} }
    'cat_estados_analisis.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_cultivos.index': { paramsTuple?: []; params?: {} }
    'cat_estados_cultivos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categorias.index': { paramsTuple?: []; params?: {} }
    'categorias.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'dashboard.index': { paramsTuple?: []; params?: {} }
    'usuarios.index': { paramsTuple?: []; params?: {} }
    'usuarios.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.index': { paramsTuple?: []; params?: {} }
    'admin.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'expertos.index': { paramsTuple?: []; params?: {} }
    'expertos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'asignaciones_expertos.index': { paramsTuple?: []; params?: {} }
    'asignaciones_expertos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cafeteros.index': { paramsTuple?: []; params?: {} }
    'cafeteros.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fincas.index': { paramsTuple?: []; params?: {} }
    'fincas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cultivos.index': { paramsTuple?: []; params?: {} }
    'cultivos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'monitoreos.index': { paramsTuple?: []; params?: {} }
    'monitoreos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'analisis_ia.index': { paramsTuple?: []; params?: {} }
    'analisis_ia.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendaciones.index': { paramsTuple?: []; params?: {} }
    'recomendaciones.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tratamientos.index': { paramsTuple?: []; params?: {} }
    'tratamientos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aplicaciones_tratamientos.index': { paramsTuple?: []; params?: {} }
    'aplicaciones_tratamientos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendacion_tratamientos.index': { paramsTuple?: []; params?: {} }
    'recomendacion_tratamientos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendacion_ia.index': { paramsTuple?: []; params?: {} }
    'recomendacion_ia.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tratamiento_ia.index': { paramsTuple?: []; params?: {} }
    'tratamiento_ia.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'imagenes.index': { paramsTuple?: []; params?: {} }
    'imagenes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'experto.dashboard': { paramsTuple?: []; params?: {} }
    'experto.fincas': { paramsTuple?: []; params?: {} }
    'experto.cultivos': { paramsTuple?: []; params?: {} }
    'experto.monitoreos': { paramsTuple?: []; params?: {} }
    'experto.recomendaciones': { paramsTuple?: []; params?: {} }
    'experto.tratamientos': { paramsTuple?: []; params?: {} }
    'experto.aplicaciones_tratamiento': { paramsTuple?: []; params?: {} }
    'caficultor.dashboard': { paramsTuple?: []; params?: {} }
    'caficultor.fincas': { paramsTuple?: []; params?: {} }
    'caficultor.cultivos': { paramsTuple?: []; params?: {} }
    'caficultor.monitoreos': { paramsTuple?: []; params?: {} }
    'caficultor.recomendaciones': { paramsTuple?: []; params?: {} }
    'caficultor.analisis_ia': { paramsTuple?: []; params?: {} }
    'caficultor.expertos_asignados': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.recuperar_password': { paramsTuple?: []; params?: {} }
    'auth.verificar_token': { paramsTuple?: []; params?: {} }
    'auth.restablecer_password': { paramsTuple?: []; params?: {} }
    'mi_perfil.cambiar_password': { paramsTuple?: []; params?: {} }
    'usuarios.store': { paramsTuple?: []; params?: {} }
    'admin.store': { paramsTuple?: []; params?: {} }
    'expertos.store': { paramsTuple?: []; params?: {} }
    'asignaciones_expertos.store': { paramsTuple?: []; params?: {} }
    'cat_roles.store': { paramsTuple?: []; params?: {} }
    'cat_tipos_tratamientos.store': { paramsTuple?: []; params?: {} }
    'cat_niveles_royas.store': { paramsTuple?: []; params?: {} }
    'cat_prioridades.store': { paramsTuple?: []; params?: {} }
    'cat_tipos_recomendaciones.store': { paramsTuple?: []; params?: {} }
    'cat_estados_analisis.store': { paramsTuple?: []; params?: {} }
    'cat_estados_cultivos.store': { paramsTuple?: []; params?: {} }
    'categorias.store': { paramsTuple?: []; params?: {} }
    'monitoreos.store': { paramsTuple?: []; params?: {} }
    'analisis_ia.store': { paramsTuple?: []; params?: {} }
    'analisis_ia.predict': { paramsTuple?: []; params?: {} }
    'recomendaciones.store': { paramsTuple?: []; params?: {} }
    'tratamientos.store': { paramsTuple?: []; params?: {} }
    'aplicaciones_tratamientos.store': { paramsTuple?: []; params?: {} }
    'recomendacion_tratamientos.store': { paramsTuple?: []; params?: {} }
    'recomendacion_ia.store': { paramsTuple?: []; params?: {} }
    'tratamiento_ia.store': { paramsTuple?: []; params?: {} }
    'cafeteros.store': { paramsTuple?: []; params?: {} }
    'fincas.store': { paramsTuple?: []; params?: {} }
    'cultivos.store': { paramsTuple?: []; params?: {} }
    'imagenes.store': { paramsTuple?: []; params?: {} }
    'experto.crear_monitoreo': { paramsTuple?: []; params?: {} }
    'experto.crear_recomendacion': { paramsTuple?: []; params?: {} }
    'experto.crear_aplicacion_tratamiento': { paramsTuple?: []; params?: {} }
    'experto.crear_recomendacion_tratamiento': { paramsTuple?: []; params?: {} }
    'caficultor.analizar_imagen': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'mi_perfil.update': { paramsTuple?: []; params?: {} }
    'usuarios.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'expertos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'asignaciones_expertos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_tratamientos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_niveles_royas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_prioridades.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_recomendaciones.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_analisis.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_cultivos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categorias.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'monitoreos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'analisis_ia.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendaciones.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tratamientos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aplicaciones_tratamientos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendacion_tratamientos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendacion_ia.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tratamiento_ia.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'imagenes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cafeteros.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fincas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cultivos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'experto.actualizar_monitoreo': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'experto.actualizar_recomendacion': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'usuarios.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'expertos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'asignaciones_expertos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_roles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_tratamientos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_niveles_royas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_prioridades.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_recomendaciones.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_analisis.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_cultivos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categorias.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'monitoreos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'analisis_ia.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendaciones.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tratamientos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aplicaciones_tratamientos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendacion_tratamientos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'recomendacion_ia.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tratamiento_ia.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'imagenes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cafeteros.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'fincas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cultivos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}