import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'cat_roles.index': { paramsTuple?: []; params?: {} }
    'cat_roles.store': { paramsTuple?: []; params?: {} }
    'cat_roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_roles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'usuarios.index': { paramsTuple?: []; params?: {} }
    'usuarios.store': { paramsTuple?: []; params?: {} }
    'usuarios.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'usuarios.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'usuarios.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
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
    'cat_estados_cultivo.index': { paramsTuple?: []; params?: {} }
    'cat_estados_cultivo.store': { paramsTuple?: []; params?: {} }
    'cat_estados_cultivo.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_cultivo.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_cultivo.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_analisis.index': { paramsTuple?: []; params?: {} }
    'cat_estados_analisis.store': { paramsTuple?: []; params?: {} }
    'cat_estados_analisis.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_analisis.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_analisis.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_recomendacion.index': { paramsTuple?: []; params?: {} }
    'cat_tipos_recomendacion.store': { paramsTuple?: []; params?: {} }
    'cat_tipos_recomendacion.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_recomendacion.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_recomendacion.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_prioridades.index': { paramsTuple?: []; params?: {} }
    'cat_prioridades.store': { paramsTuple?: []; params?: {} }
    'cat_prioridades.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_prioridades.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_prioridades.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'cat_roles.index': { paramsTuple?: []; params?: {} }
    'cat_roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'usuarios.index': { paramsTuple?: []; params?: {} }
    'usuarios.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_tratamiento.index': { paramsTuple?: []; params?: {} }
    'cat_tipos_tratamiento.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_niveles_roya.index': { paramsTuple?: []; params?: {} }
    'cat_niveles_roya.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_cultivo.index': { paramsTuple?: []; params?: {} }
    'cat_estados_cultivo.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_analisis.index': { paramsTuple?: []; params?: {} }
    'cat_estados_analisis.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_recomendacion.index': { paramsTuple?: []; params?: {} }
    'cat_tipos_recomendacion.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_prioridades.index': { paramsTuple?: []; params?: {} }
    'cat_prioridades.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'cat_roles.index': { paramsTuple?: []; params?: {} }
    'cat_roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'usuarios.index': { paramsTuple?: []; params?: {} }
    'usuarios.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_tratamiento.index': { paramsTuple?: []; params?: {} }
    'cat_tipos_tratamiento.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_niveles_roya.index': { paramsTuple?: []; params?: {} }
    'cat_niveles_roya.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_cultivo.index': { paramsTuple?: []; params?: {} }
    'cat_estados_cultivo.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_analisis.index': { paramsTuple?: []; params?: {} }
    'cat_estados_analisis.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_recomendacion.index': { paramsTuple?: []; params?: {} }
    'cat_tipos_recomendacion.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_prioridades.index': { paramsTuple?: []; params?: {} }
    'cat_prioridades.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'cat_roles.store': { paramsTuple?: []; params?: {} }
    'usuarios.store': { paramsTuple?: []; params?: {} }
    'cat_tipos_tratamiento.store': { paramsTuple?: []; params?: {} }
    'cat_niveles_roya.store': { paramsTuple?: []; params?: {} }
    'cat_estados_cultivo.store': { paramsTuple?: []; params?: {} }
    'cat_estados_analisis.store': { paramsTuple?: []; params?: {} }
    'cat_tipos_recomendacion.store': { paramsTuple?: []; params?: {} }
    'cat_prioridades.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'cat_roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'usuarios.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_tratamiento.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_niveles_roya.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_cultivo.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_analisis.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_recomendacion.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_prioridades.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'cat_roles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'usuarios.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_tratamiento.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_niveles_roya.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_cultivo.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_estados_analisis.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_tipos_recomendacion.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cat_prioridades.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}