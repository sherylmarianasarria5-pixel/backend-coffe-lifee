/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.login': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['login']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['login']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.register': {
    methods: ["POST"]
    pattern: '/register'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['register']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['register']>>>
    }
  }
  'auth.recuperar_password': {
    methods: ["POST"]
    pattern: '/recuperar-password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').recuperarPasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').recuperarPasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['recuperarPassword']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['recuperarPassword']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.verificar_token': {
    methods: ["POST"]
    pattern: '/verificar-token'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['verificarToken']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['verificarToken']>>>
    }
  }
  'auth.restablecer_password': {
    methods: ["POST"]
    pattern: '/restablecer-password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').restablecerPasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').restablecerPasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['restablecerPassword']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['restablecerPassword']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'mi_perfil.show': {
    methods: ["GET","HEAD"]
    pattern: '/mi-perfil'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/mi-perfil_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/mi-perfil_controller').default['show']>>>
    }
  }
  'mi_perfil.update': {
    methods: ["PUT"]
    pattern: '/mi-perfil'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/mi-perfil_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/mi-perfil_controller').default['update']>>>
    }
  }
  'mi_perfil.cambiar_password': {
    methods: ["POST"]
    pattern: '/mi-perfil/cambiar-password'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/mi-perfil_controller').default['cambiarPassword']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/mi-perfil_controller').default['cambiarPassword']>>>
    }
  }
  'cat_roles.index': {
    methods: ["GET","HEAD"]
    pattern: '/cat_roles'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_roles_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_roles_controller').default['index']>>>
    }
  }
  'cat_roles.show': {
    methods: ["GET","HEAD"]
    pattern: '/cat_roles/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_roles_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_roles_controller').default['show']>>>
    }
  }
  'cat_tipos_tratamientos.index': {
    methods: ["GET","HEAD"]
    pattern: '/cat_tipos_tratamientos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_tipos_tratamientos_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_tipos_tratamientos_controller').default['index']>>>
    }
  }
  'cat_tipos_tratamientos.show': {
    methods: ["GET","HEAD"]
    pattern: '/cat_tipos_tratamientos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_tipos_tratamientos_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_tipos_tratamientos_controller').default['show']>>>
    }
  }
  'cat_niveles_royas.index': {
    methods: ["GET","HEAD"]
    pattern: '/cat_niveles_roya'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_niveles_roya_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_niveles_roya_controller').default['index']>>>
    }
  }
  'cat_niveles_royas.show': {
    methods: ["GET","HEAD"]
    pattern: '/cat_niveles_roya/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_niveles_roya_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_niveles_roya_controller').default['show']>>>
    }
  }
  'cat_prioridades.index': {
    methods: ["GET","HEAD"]
    pattern: '/cat_prioridades'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_prioridades_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_prioridades_controller').default['index']>>>
    }
  }
  'cat_prioridades.show': {
    methods: ["GET","HEAD"]
    pattern: '/cat_prioridades/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_prioridades_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_prioridades_controller').default['show']>>>
    }
  }
  'cat_tipos_recomendaciones.index': {
    methods: ["GET","HEAD"]
    pattern: '/cat_tipos_recomendaciones'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_tipos_recomendaciones_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_tipos_recomendaciones_controller').default['index']>>>
    }
  }
  'cat_tipos_recomendaciones.show': {
    methods: ["GET","HEAD"]
    pattern: '/cat_tipos_recomendaciones/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_tipos_recomendaciones_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_tipos_recomendaciones_controller').default['show']>>>
    }
  }
  'cat_estados_analisis.index': {
    methods: ["GET","HEAD"]
    pattern: '/cat_estados_analisis'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_estados_analises_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_estados_analises_controller').default['index']>>>
    }
  }
  'cat_estados_analisis.show': {
    methods: ["GET","HEAD"]
    pattern: '/cat_estados_analisis/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_estados_analises_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_estados_analises_controller').default['show']>>>
    }
  }
  'cat_estados_cultivos.index': {
    methods: ["GET","HEAD"]
    pattern: '/cat_estados_cultivo'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_estados_cultivo_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_estados_cultivo_controller').default['index']>>>
    }
  }
  'cat_estados_cultivos.show': {
    methods: ["GET","HEAD"]
    pattern: '/cat_estados_cultivo/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_estados_cultivo_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_estados_cultivo_controller').default['show']>>>
    }
  }
  'categorias.index': {
    methods: ["GET","HEAD"]
    pattern: '/categorias'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/categorias_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/categorias_controller').default['index']>>>
    }
  }
  'categorias.show': {
    methods: ["GET","HEAD"]
    pattern: '/categorias/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/categorias_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/categorias_controller').default['show']>>>
    }
  }
  'cat_tipos_insumos.index': {
    methods: ["GET","HEAD"]
    pattern: '/cat_tipos_insumos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_tipos_insumos_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_tipos_insumos_controller').default['index']>>>
    }
  }
  'cat_tipos_insumos.show': {
    methods: ["GET","HEAD"]
    pattern: '/cat_tipos_insumos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_tipos_insumos_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_tipos_insumos_controller').default['show']>>>
    }
  }
  'insumos.index': {
    methods: ["GET","HEAD"]
    pattern: '/insumos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/insumos_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/insumos_controller').default['index']>>>
    }
  }
  'insumos.show': {
    methods: ["GET","HEAD"]
    pattern: '/insumos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/insumos_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/insumos_controller').default['show']>>>
    }
  }
  'dashboard.index': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['index']>>>
    }
  }
  'dashboard.monitoreos_por_estado': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/monitoreos-por-estado'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['monitoreosPorEstado']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['monitoreosPorEstado']>>>
    }
  }
  'dashboard.tendencia_roya': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/tendencia-roya'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['tendenciaRoya']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['tendenciaRoya']>>>
    }
  }
  'dashboard.actividad_reciente': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/actividad-reciente'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['actividadReciente']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['actividadReciente']>>>
    }
  }
  'dashboard.monitoreos_recientes': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/monitoreos-recientes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['monitoreosRecientes']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['monitoreosRecientes']>>>
    }
  }
  'dashboard.top_fincas_roya': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/top-fincas-roya'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['topFincasRoya']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['topFincasRoya']>>>
    }
  }
  'dashboard.proximos_monitoreos': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/proximos-monitoreos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['proximosMonitoreos']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['proximosMonitoreos']>>>
    }
  }
  'dashboard.mapa_fincas': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/mapa-fincas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['mapaFincas']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['mapaFincas']>>>
    }
  }
  'dashboard.impacto_sistema': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/impacto'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['impactoSistema']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['impactoSistema']>>>
    }
  }
  'dashboard.debug_monitoreo': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/debug-monitoreo/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['debugMonitoreo']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['debugMonitoreo']>>>
    }
  }
  'usuarios.index': {
    methods: ["GET","HEAD"]
    pattern: '/usuarios'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuarios_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuarios_controller').default['index']>>>
    }
  }
  'usuarios.store': {
    methods: ["POST"]
    pattern: '/usuarios'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuarios_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuarios_controller').default['store']>>>
    }
  }
  'usuarios.show': {
    methods: ["GET","HEAD"]
    pattern: '/usuarios/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuarios_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuarios_controller').default['show']>>>
    }
  }
  'usuarios.update': {
    methods: ["PUT"]
    pattern: '/usuarios/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuarios_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuarios_controller').default['update']>>>
    }
  }
  'usuarios.destroy': {
    methods: ["DELETE"]
    pattern: '/usuarios/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuarios_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuarios_controller').default['destroy']>>>
    }
  }
  'admin.index': {
    methods: ["GET","HEAD"]
    pattern: '/admins'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_controller').default['index']>>>
    }
  }
  'admin.store': {
    methods: ["POST"]
    pattern: '/admins'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_controller').default['store']>>>
    }
  }
  'admin.show': {
    methods: ["GET","HEAD"]
    pattern: '/admins/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_controller').default['show']>>>
    }
  }
  'admin.update': {
    methods: ["PUT"]
    pattern: '/admins/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_controller').default['update']>>>
    }
  }
  'admin.destroy': {
    methods: ["DELETE"]
    pattern: '/admins/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin_controller').default['destroy']>>>
    }
  }
  'expertos.index': {
    methods: ["GET","HEAD"]
    pattern: '/expertos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/expertos_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/expertos_controller').default['index']>>>
    }
  }
  'expertos.store': {
    methods: ["POST"]
    pattern: '/expertos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/expertos_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/expertos_controller').default['store']>>>
    }
  }
  'expertos.show': {
    methods: ["GET","HEAD"]
    pattern: '/expertos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/expertos_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/expertos_controller').default['show']>>>
    }
  }
  'expertos.update': {
    methods: ["PUT"]
    pattern: '/expertos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/expertos_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/expertos_controller').default['update']>>>
    }
  }
  'expertos.destroy': {
    methods: ["DELETE"]
    pattern: '/expertos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/expertos_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/expertos_controller').default['destroy']>>>
    }
  }
  'asignaciones_expertos.store': {
    methods: ["POST"]
    pattern: '/asignaciones_expertos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/asignaciones_expertos_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/asignaciones_expertos_controller').default['store']>>>
    }
  }
  'asignaciones_expertos.update': {
    methods: ["PUT"]
    pattern: '/asignaciones_expertos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/asignaciones_expertos_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/asignaciones_expertos_controller').default['update']>>>
    }
  }
  'asignaciones_expertos.destroy': {
    methods: ["DELETE"]
    pattern: '/asignaciones_expertos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/asignaciones_expertos_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/asignaciones_expertos_controller').default['destroy']>>>
    }
  }
  'cat_roles.store': {
    methods: ["POST"]
    pattern: '/cat_roles'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').catalogoStoreValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').catalogoStoreValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_roles_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_roles_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'cat_roles.update': {
    methods: ["PUT"]
    pattern: '/cat_roles/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').catalogoUpdateValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').catalogoUpdateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_roles_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_roles_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'cat_roles.destroy': {
    methods: ["DELETE"]
    pattern: '/cat_roles/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_roles_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_roles_controller').default['destroy']>>>
    }
  }
  'cat_tipos_tratamientos.store': {
    methods: ["POST"]
    pattern: '/cat_tipos_tratamiento'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').catalogoStoreValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').catalogoStoreValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_tipos_tratamientos_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_tipos_tratamientos_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'cat_tipos_tratamientos.update': {
    methods: ["PUT"]
    pattern: '/cat_tipos_tratamiento/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').catalogoUpdateValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').catalogoUpdateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_tipos_tratamientos_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_tipos_tratamientos_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'cat_tipos_tratamientos.destroy': {
    methods: ["DELETE"]
    pattern: '/cat_tipos_tratamiento/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_tipos_tratamientos_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_tipos_tratamientos_controller').default['destroy']>>>
    }
  }
  'cat_niveles_royas.store': {
    methods: ["POST"]
    pattern: '/cat_niveles_roya'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').catalogoStoreValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').catalogoStoreValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_niveles_roya_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_niveles_roya_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'cat_niveles_royas.update': {
    methods: ["PUT"]
    pattern: '/cat_niveles_roya/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').catalogoUpdateValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').catalogoUpdateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_niveles_roya_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_niveles_roya_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'cat_niveles_royas.destroy': {
    methods: ["DELETE"]
    pattern: '/cat_niveles_roya/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_niveles_roya_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_niveles_roya_controller').default['destroy']>>>
    }
  }
  'cat_prioridades.store': {
    methods: ["POST"]
    pattern: '/cat_prioridades'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_prioridades_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_prioridades_controller').default['store']>>>
    }
  }
  'cat_prioridades.update': {
    methods: ["PUT"]
    pattern: '/cat_prioridades/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_prioridades_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_prioridades_controller').default['update']>>>
    }
  }
  'cat_prioridades.destroy': {
    methods: ["DELETE"]
    pattern: '/cat_prioridades/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_prioridades_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_prioridades_controller').default['destroy']>>>
    }
  }
  'cat_tipos_recomendaciones.store': {
    methods: ["POST"]
    pattern: '/cat_tipo_recomendacion'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').catalogoStoreValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').catalogoStoreValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_tipos_recomendaciones_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_tipos_recomendaciones_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'cat_tipos_recomendaciones.update': {
    methods: ["PUT"]
    pattern: '/cat_tipo_recomendacion/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').catalogoUpdateValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').catalogoUpdateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_tipos_recomendaciones_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_tipos_recomendaciones_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'cat_tipos_recomendaciones.destroy': {
    methods: ["DELETE"]
    pattern: '/cat_tipos_recomendacion/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_tipos_recomendaciones_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_tipos_recomendaciones_controller').default['destroy']>>>
    }
  }
  'cat_estados_analisis.store': {
    methods: ["POST"]
    pattern: '/cat_estados_analisis'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').catalogoStoreValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').catalogoStoreValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_estados_analises_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_estados_analises_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'cat_estados_analisis.update': {
    methods: ["PUT"]
    pattern: '/cat_estados_analisis/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').catalogoUpdateValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').catalogoUpdateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_estados_analises_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_estados_analises_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'cat_estados_analisis.destroy': {
    methods: ["DELETE"]
    pattern: '/cat_estados_analisis/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_estados_analises_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_estados_analises_controller').default['destroy']>>>
    }
  }
  'cat_estados_cultivos.store': {
    methods: ["POST"]
    pattern: '/cat_estados_cultivo'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').catalogoStoreValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').catalogoStoreValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_estados_cultivo_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_estados_cultivo_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'cat_estados_cultivos.update': {
    methods: ["PUT"]
    pattern: '/cat_estados_cultivo/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').catalogoUpdateValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').catalogoUpdateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_estados_cultivo_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_estados_cultivo_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'cat_estados_cultivos.destroy': {
    methods: ["DELETE"]
    pattern: '/cat_estados_cultivo/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_estados_cultivo_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_estados_cultivo_controller').default['destroy']>>>
    }
  }
  'categorias.store': {
    methods: ["POST"]
    pattern: '/categorias'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/categorias_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/categorias_controller').default['store']>>>
    }
  }
  'categorias.update': {
    methods: ["PUT"]
    pattern: '/categorias/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/categorias_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/categorias_controller').default['update']>>>
    }
  }
  'categorias.destroy': {
    methods: ["DELETE"]
    pattern: '/categorias/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/categorias_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/categorias_controller').default['destroy']>>>
    }
  }
  'asignaciones_expertos.index': {
    methods: ["GET","HEAD"]
    pattern: '/asignaciones_expertos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/asignaciones_expertos_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/asignaciones_expertos_controller').default['index']>>>
    }
  }
  'asignaciones_expertos.show': {
    methods: ["GET","HEAD"]
    pattern: '/asignaciones_expertos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/asignaciones_expertos_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/asignaciones_expertos_controller').default['show']>>>
    }
  }
  'cafeteros.index': {
    methods: ["GET","HEAD"]
    pattern: '/cafeteros'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cafeteros_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cafeteros_controller').default['index']>>>
    }
  }
  'cafeteros.show': {
    methods: ["GET","HEAD"]
    pattern: '/cafeteros/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cafeteros_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cafeteros_controller').default['show']>>>
    }
  }
  'monitoreos.update': {
    methods: ["PUT"]
    pattern: '/monitoreos/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').monitoreoUpdateValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').monitoreoUpdateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/monitoreos_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/monitoreos_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'analisis_ia.update': {
    methods: ["PUT"]
    pattern: '/analisis_ia/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').analisisIaUpdateValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').analisisIaUpdateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/analisis_ia_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/analisis_ia_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'analisis_ia.destroy': {
    methods: ["DELETE"]
    pattern: '/analisis_ia/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/analisis_ia_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/analisis_ia_controller').default['destroy']>>>
    }
  }
  'analisis_ia.predict': {
    methods: ["POST"]
    pattern: '/analisis_ia/predict'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/analisis_ia_controller').default['predict']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/analisis_ia_controller').default['predict']>>>
    }
  }
  'recomendaciones.store': {
    methods: ["POST"]
    pattern: '/recomendaciones'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/recomendaciones_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/recomendaciones_controller').default['store']>>>
    }
  }
  'recomendaciones.update': {
    methods: ["PUT"]
    pattern: '/recomendaciones/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/recomendaciones_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/recomendaciones_controller').default['update']>>>
    }
  }
  'recomendaciones.destroy': {
    methods: ["DELETE"]
    pattern: '/recomendaciones/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/recomendaciones_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/recomendaciones_controller').default['destroy']>>>
    }
  }
  'tratamientos.store': {
    methods: ["POST"]
    pattern: '/tratamientos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tratamientos_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tratamientos_controller').default['store']>>>
    }
  }
  'tratamientos.update': {
    methods: ["PUT"]
    pattern: '/tratamientos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tratamientos_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tratamientos_controller').default['update']>>>
    }
  }
  'tratamientos.destroy': {
    methods: ["DELETE"]
    pattern: '/tratamientos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tratamientos_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tratamientos_controller').default['destroy']>>>
    }
  }
  'aplicaciones_tratamientos.store': {
    methods: ["POST"]
    pattern: '/aplicaciones_tratamientos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aplicaciones_tratamientos_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aplicaciones_tratamientos_controller').default['store']>>>
    }
  }
  'aplicaciones_tratamientos.update': {
    methods: ["PUT"]
    pattern: '/aplicaciones_tratamientos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aplicaciones_tratamientos_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aplicaciones_tratamientos_controller').default['update']>>>
    }
  }
  'aplicaciones_tratamientos.destroy': {
    methods: ["DELETE"]
    pattern: '/aplicaciones_tratamientos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aplicaciones_tratamientos_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aplicaciones_tratamientos_controller').default['destroy']>>>
    }
  }
  'imagenes.update': {
    methods: ["PUT"]
    pattern: '/imagenes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/imagenes_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/imagenes_controller').default['update']>>>
    }
  }
  'imagenes.destroy': {
    methods: ["DELETE"]
    pattern: '/imagenes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/imagenes_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/imagenes_controller').default['destroy']>>>
    }
  }
  'insumos.store': {
    methods: ["POST"]
    pattern: '/insumos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/insumos_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/insumos_controller').default['store']>>>
    }
  }
  'insumos.update': {
    methods: ["PUT"]
    pattern: '/insumos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/insumos_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/insumos_controller').default['update']>>>
    }
  }
  'insumos.destroy': {
    methods: ["DELETE"]
    pattern: '/insumos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/insumos_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/insumos_controller').default['destroy']>>>
    }
  }
  'cat_tipos_insumos.store': {
    methods: ["POST"]
    pattern: '/cat_tipos_insumos'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').catalogoStoreValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').catalogoStoreValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_tipos_insumos_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_tipos_insumos_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'cat_tipos_insumos.update': {
    methods: ["PUT"]
    pattern: '/cat_tipos_insumos/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').catalogoUpdateValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').catalogoUpdateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_tipos_insumos_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_tipos_insumos_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'cat_tipos_insumos.destroy': {
    methods: ["DELETE"]
    pattern: '/cat_tipos_insumos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_tipos_insumos_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_tipos_insumos_controller').default['destroy']>>>
    }
  }
  'cafeteros.store': {
    methods: ["POST"]
    pattern: '/cafeteros'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cafeteros_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cafeteros_controller').default['store']>>>
    }
  }
  'cafeteros.update': {
    methods: ["PUT"]
    pattern: '/cafeteros/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cafeteros_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cafeteros_controller').default['update']>>>
    }
  }
  'cafeteros.destroy': {
    methods: ["DELETE"]
    pattern: '/cafeteros/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cafeteros_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cafeteros_controller').default['destroy']>>>
    }
  }
  'fincas.index': {
    methods: ["GET","HEAD"]
    pattern: '/fincas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/fincas_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/fincas_controller').default['index']>>>
    }
  }
  'fincas.store': {
    methods: ["POST"]
    pattern: '/fincas'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').fincaStoreValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').fincaStoreValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/fincas_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/fincas_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'fincas.show': {
    methods: ["GET","HEAD"]
    pattern: '/fincas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/fincas_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/fincas_controller').default['show']>>>
    }
  }
  'fincas.update': {
    methods: ["PUT"]
    pattern: '/fincas/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').fincaUpdateValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').fincaUpdateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/fincas_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/fincas_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'fincas.destroy': {
    methods: ["DELETE"]
    pattern: '/fincas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/fincas_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/fincas_controller').default['destroy']>>>
    }
  }
  'fincas.upload_photo': {
    methods: ["POST"]
    pattern: '/fincas/:id/foto'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/fincas_controller').default['uploadPhoto']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/fincas_controller').default['uploadPhoto']>>>
    }
  }
  'cultivos.index': {
    methods: ["GET","HEAD"]
    pattern: '/cultivos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cultivos_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cultivos_controller').default['index']>>>
    }
  }
  'cultivos.store': {
    methods: ["POST"]
    pattern: '/cultivos'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').cultivoStoreValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').cultivoStoreValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cultivos_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cultivos_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'cultivos.show': {
    methods: ["GET","HEAD"]
    pattern: '/cultivos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cultivos_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cultivos_controller').default['show']>>>
    }
  }
  'cultivos.update': {
    methods: ["PUT"]
    pattern: '/cultivos/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').cultivoUpdateValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').cultivoUpdateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cultivos_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cultivos_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'cultivos.destroy': {
    methods: ["DELETE"]
    pattern: '/cultivos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cultivos_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cultivos_controller').default['destroy']>>>
    }
  }
  'cultivos.upload_photo': {
    methods: ["POST"]
    pattern: '/cultivos/:id/foto'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cultivos_controller').default['uploadPhoto']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cultivos_controller').default['uploadPhoto']>>>
    }
  }
  'monitoreos.index': {
    methods: ["GET","HEAD"]
    pattern: '/monitoreos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/monitoreos_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/monitoreos_controller').default['index']>>>
    }
  }
  'monitoreos.show': {
    methods: ["GET","HEAD"]
    pattern: '/monitoreos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/monitoreos_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/monitoreos_controller').default['show']>>>
    }
  }
  'monitoreos.store': {
    methods: ["POST"]
    pattern: '/monitoreos'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').monitoreoStoreValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').monitoreoStoreValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/monitoreos_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/monitoreos_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'monitoreos.destroy': {
    methods: ["DELETE"]
    pattern: '/monitoreos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/monitoreos_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/monitoreos_controller').default['destroy']>>>
    }
  }
  'analisis_ia.index': {
    methods: ["GET","HEAD"]
    pattern: '/analisis_ia'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/analisis_ia_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/analisis_ia_controller').default['index']>>>
    }
  }
  'analisis_ia.show': {
    methods: ["GET","HEAD"]
    pattern: '/analisis_ia/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/analisis_ia_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/analisis_ia_controller').default['show']>>>
    }
  }
  'analisis_ia.store': {
    methods: ["POST"]
    pattern: '/analisis_ia'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/validators').analisisIaStoreValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/validators').analisisIaStoreValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/analisis_ia_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/analisis_ia_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'recomendaciones.index': {
    methods: ["GET","HEAD"]
    pattern: '/recomendaciones'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/recomendaciones_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/recomendaciones_controller').default['index']>>>
    }
  }
  'recomendaciones.show': {
    methods: ["GET","HEAD"]
    pattern: '/recomendaciones/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/recomendaciones_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/recomendaciones_controller').default['show']>>>
    }
  }
  'tratamientos.index': {
    methods: ["GET","HEAD"]
    pattern: '/tratamientos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tratamientos_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tratamientos_controller').default['index']>>>
    }
  }
  'tratamientos.show': {
    methods: ["GET","HEAD"]
    pattern: '/tratamientos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tratamientos_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tratamientos_controller').default['show']>>>
    }
  }
  'aplicaciones_tratamientos.index': {
    methods: ["GET","HEAD"]
    pattern: '/aplicaciones_tratamientos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aplicaciones_tratamientos_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aplicaciones_tratamientos_controller').default['index']>>>
    }
  }
  'aplicaciones_tratamientos.show': {
    methods: ["GET","HEAD"]
    pattern: '/aplicaciones_tratamientos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aplicaciones_tratamientos_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aplicaciones_tratamientos_controller').default['show']>>>
    }
  }
  'imagenes.index': {
    methods: ["GET","HEAD"]
    pattern: '/imagenes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/imagenes_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/imagenes_controller').default['index']>>>
    }
  }
  'imagenes.show': {
    methods: ["GET","HEAD"]
    pattern: '/imagenes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/imagenes_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/imagenes_controller').default['show']>>>
    }
  }
  'imagenes.store': {
    methods: ["POST"]
    pattern: '/imagenes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/imagenes_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/imagenes_controller').default['store']>>>
    }
  }
  'notificaciones.index': {
    methods: ["GET","HEAD"]
    pattern: '/notificaciones'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/notificaciones_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/notificaciones_controller').default['index']>>>
    }
  }
  'notificaciones.marcar_leida': {
    methods: ["PUT"]
    pattern: '/notificaciones/:id/leer'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/notificaciones_controller').default['marcarLeida']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/notificaciones_controller').default['marcarLeida']>>>
    }
  }
  'notificaciones.marcar_todas_leidas': {
    methods: ["PUT"]
    pattern: '/notificaciones/leer-todas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/notificaciones_controller').default['marcarTodasLeidas']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/notificaciones_controller').default['marcarTodasLeidas']>>>
    }
  }
  'notificaciones.destroy': {
    methods: ["DELETE"]
    pattern: '/notificaciones/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/notificaciones_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/notificaciones_controller').default['destroy']>>>
    }
  }
  'experto.dashboard': {
    methods: ["GET","HEAD"]
    pattern: '/experto/dashboard'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['dashboard']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['dashboard']>>>
    }
  }
  'experto.fincas': {
    methods: ["GET","HEAD"]
    pattern: '/experto/fincas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['fincas']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['fincas']>>>
    }
  }
  'experto.cultivos': {
    methods: ["GET","HEAD"]
    pattern: '/experto/cultivos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['cultivos']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['cultivos']>>>
    }
  }
  'experto.monitoreos': {
    methods: ["GET","HEAD"]
    pattern: '/experto/monitoreos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['monitoreos']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['monitoreos']>>>
    }
  }
  'experto.analisis_ia': {
    methods: ["GET","HEAD"]
    pattern: '/experto/analisis_ia'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['analisis_ia']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['analisis_ia']>>>
    }
  }
  'experto.crear_monitoreo': {
    methods: ["POST"]
    pattern: '/experto/monitoreos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['crearMonitoreo']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['crearMonitoreo']>>>
    }
  }
  'experto.actualizar_monitoreo': {
    methods: ["PUT"]
    pattern: '/experto/monitoreos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['actualizarMonitoreo']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['actualizarMonitoreo']>>>
    }
  }
  'experto.recomendaciones': {
    methods: ["GET","HEAD"]
    pattern: '/experto/recomendaciones'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['recomendaciones']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['recomendaciones']>>>
    }
  }
  'experto.crear_recomendacion': {
    methods: ["POST"]
    pattern: '/experto/recomendaciones'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['crearRecomendacion']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['crearRecomendacion']>>>
    }
  }
  'experto.actualizar_recomendacion': {
    methods: ["PUT"]
    pattern: '/experto/recomendaciones/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['actualizarRecomendacion']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['actualizarRecomendacion']>>>
    }
  }
  'experto.tratamientos': {
    methods: ["GET","HEAD"]
    pattern: '/experto/tratamientos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['tratamientos']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['tratamientos']>>>
    }
  }
  'experto.aplicaciones_tratamiento': {
    methods: ["GET","HEAD"]
    pattern: '/experto/aplicaciones_tratamiento'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['aplicaciones_tratamiento']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['aplicaciones_tratamiento']>>>
    }
  }
  'experto.crear_aplicacion_tratamiento': {
    methods: ["POST"]
    pattern: '/experto/aplicaciones_tratamiento'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['crearAplicacionTratamiento']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/experto_controller').default['crearAplicacionTratamiento']>>>
    }
  }
  'caficultor.dashboard': {
    methods: ["GET","HEAD"]
    pattern: '/caficultor/dashboard'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/caficultor_controller').default['dashboard']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/caficultor_controller').default['dashboard']>>>
    }
  }
  'caficultor.fincas': {
    methods: ["GET","HEAD"]
    pattern: '/caficultor/fincas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/caficultor_controller').default['fincas']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/caficultor_controller').default['fincas']>>>
    }
  }
  'caficultor.cultivos': {
    methods: ["GET","HEAD"]
    pattern: '/caficultor/cultivos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/caficultor_controller').default['cultivos']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/caficultor_controller').default['cultivos']>>>
    }
  }
  'caficultor.monitoreos': {
    methods: ["GET","HEAD"]
    pattern: '/caficultor/monitoreos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/caficultor_controller').default['monitoreos']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/caficultor_controller').default['monitoreos']>>>
    }
  }
  'caficultor.recomendaciones': {
    methods: ["GET","HEAD"]
    pattern: '/caficultor/recomendaciones'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/caficultor_controller').default['recomendaciones']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/caficultor_controller').default['recomendaciones']>>>
    }
  }
  'caficultor.analisis_ia': {
    methods: ["GET","HEAD"]
    pattern: '/caficultor/analisis_ia'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/caficultor_controller').default['analisis_ia']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/caficultor_controller').default['analisis_ia']>>>
    }
  }
  'caficultor.expertos_asignados': {
    methods: ["GET","HEAD"]
    pattern: '/caficultor/expertos_asignados'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/caficultor_controller').default['expertos_asignados']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/caficultor_controller').default['expertos_asignados']>>>
    }
  }
  'caficultor.analizar_imagen': {
    methods: ["POST"]
    pattern: '/caficultor/analizar-imagen'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/caficultor_controller').default['analizarImagen']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/caficultor_controller').default['analizarImagen']>>>
    }
  }
}
