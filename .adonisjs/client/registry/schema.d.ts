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
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['login']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['login']>>>
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
  'auth.recuperarPassword': {
    methods: ["POST"]
    pattern: '/recuperar-password'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['recuperarPassword']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['recuperarPassword']>>>
    }
  }
  'auth.restablecerPassword': {
    methods: ["POST"]
    pattern: '/restablecer-password'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['restablecerPassword']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['restablecerPassword']>>>
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
  'admins.index': {
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
  'admins.store': {
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
  'admins.show': {
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
  'admins.update': {
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
  'admins.destroy': {
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
  'roles.index': {
    methods: ["GET","HEAD"]
    pattern: '/roles'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_roles_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_roles_controller').default['index']>>>
    }
  }
  'roles.store': {
    methods: ["POST"]
    pattern: '/roles'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_roles_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_roles_controller').default['store']>>>
    }
  }
  'roles.show': {
    methods: ["GET","HEAD"]
    pattern: '/roles/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_roles_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_roles_controller').default['show']>>>
    }
  }
  'roles.update': {
    methods: ["PUT"]
    pattern: '/roles/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_roles_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_roles_controller').default['update']>>>
    }
  }
  'roles.destroy': {
    methods: ["DELETE"]
    pattern: '/roles/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_roles_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_roles_controller').default['destroy']>>>
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
  'cat_roles.store': {
    methods: ["POST"]
    pattern: '/cat_roles'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_roles_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_roles_controller').default['store']>>>
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
  'cat_roles.update': {
    methods: ["PUT"]
    pattern: '/cat_roles/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_roles_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_roles_controller').default['update']>>>
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
  'cat_tipos_tratamiento.index': {
    methods: ["GET","HEAD"]
    pattern: '/cat_tipos_tratamiento'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_tipos_tratamientos_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_tipos_tratamientos_controller').default['index']>>>
    }
  }
  'cat_tipos_tratamiento.store': {
    methods: ["POST"]
    pattern: '/cat_tipos_tratamiento'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_tipos_tratamientos_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_tipos_tratamientos_controller').default['store']>>>
    }
  }
  'cat_tipos_tratamiento.show': {
    methods: ["GET","HEAD"]
    pattern: '/cat_tipos_tratamiento/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_tipos_tratamientos_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_tipos_tratamientos_controller').default['show']>>>
    }
  }
  'cat_tipos_tratamiento.update': {
    methods: ["PUT"]
    pattern: '/cat_tipos_tratamiento/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_tipos_tratamientos_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_tipos_tratamientos_controller').default['update']>>>
    }
  }
  'cat_tipos_tratamiento.destroy': {
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
  'cat_niveles_roya.index': {
    methods: ["GET","HEAD"]
    pattern: '/cat_niveles_roya'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_niveles_royas_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_niveles_royas_controller').default['index']>>>
    }
  }
  'cat_niveles_roya.store': {
    methods: ["POST"]
    pattern: '/cat_niveles_roya'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_niveles_royas_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_niveles_royas_controller').default['store']>>>
    }
  }
  'cat_niveles_roya.show': {
    methods: ["GET","HEAD"]
    pattern: '/cat_niveles_roya/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_niveles_royas_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_niveles_royas_controller').default['show']>>>
    }
  }
  'cat_niveles_roya.update': {
    methods: ["PUT"]
    pattern: '/cat_niveles_roya/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_niveles_royas_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_niveles_royas_controller').default['update']>>>
    }
  }
  'cat_niveles_roya.destroy': {
    methods: ["DELETE"]
    pattern: '/cat_niveles_roya/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_niveles_royas_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_niveles_royas_controller').default['destroy']>>>
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
  'cat_tipos_recomendacion.index': {
    methods: ["GET","HEAD"]
    pattern: '/cat_tipos_recomendacion'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_tipos_recomendacions_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_tipos_recomendacions_controller').default['index']>>>
    }
  }
  'cat_tipos_recomendacion.store': {
    methods: ["POST"]
    pattern: '/cat_tipos_recomendacion'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_tipos_recomendacions_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_tipos_recomendacions_controller').default['store']>>>
    }
  }
  'cat_tipos_recomendacion.show': {
    methods: ["GET","HEAD"]
    pattern: '/cat_tipos_recomendacion/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_tipos_recomendacions_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_tipos_recomendacions_controller').default['show']>>>
    }
  }
  'cat_tipos_recomendacion.update': {
    methods: ["PUT"]
    pattern: '/cat_tipos_recomendacion/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_tipos_recomendacions_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_tipos_recomendacions_controller').default['update']>>>
    }
  }
  'cat_tipos_recomendacion.destroy': {
    methods: ["DELETE"]
    pattern: '/cat_tipos_recomendacion/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_tipos_recomendacions_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_tipos_recomendacions_controller').default['destroy']>>>
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
  'cat_estados_analisis.store': {
    methods: ["POST"]
    pattern: '/cat_estados_analisis'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_estados_analises_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_estados_analises_controller').default['store']>>>
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
  'cat_estados_analisis.update': {
    methods: ["PUT"]
    pattern: '/cat_estados_analisis/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_estados_analises_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_estados_analises_controller').default['update']>>>
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
  'cat_estados_cultivo.index': {
    methods: ["GET","HEAD"]
    pattern: '/cat_estados_cultivo'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_estados_cultivos_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_estados_cultivos_controller').default['index']>>>
    }
  }
  'cat_estados_cultivo.store': {
    methods: ["POST"]
    pattern: '/cat_estados_cultivo'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_estados_cultivos_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_estados_cultivos_controller').default['store']>>>
    }
  }
  'cat_estados_cultivo.show': {
    methods: ["GET","HEAD"]
    pattern: '/cat_estados_cultivo/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_estados_cultivos_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_estados_cultivos_controller').default['show']>>>
    }
  }
  'cat_estados_cultivo.update': {
    methods: ["PUT"]
    pattern: '/cat_estados_cultivo/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_estados_cultivos_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_estados_cultivos_controller').default['update']>>>
    }
  }
  'cat_estados_cultivo.destroy': {
    methods: ["DELETE"]
    pattern: '/cat_estados_cultivo/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cat_estados_cultivos_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cat_estados_cultivos_controller').default['destroy']>>>
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
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/fincas_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/fincas_controller').default['store']>>>
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
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/fincas_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/fincas_controller').default['update']>>>
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
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cultivos_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cultivos_controller').default['store']>>>
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
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cultivos_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cultivos_controller').default['update']>>>
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
  'monitoreos.store': {
    methods: ["POST"]
    pattern: '/monitoreos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/monitoreos_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/monitoreos_controller').default['store']>>>
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
  'monitoreos.update': {
    methods: ["PUT"]
    pattern: '/monitoreos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/monitoreos_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/monitoreos_controller').default['update']>>>
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
  'recomendacion_tratamientos.index': {
    methods: ["GET","HEAD"]
    pattern: '/recomendacion_tratamientos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/recomendacion_tratamientos_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/recomendacion_tratamientos_controller').default['index']>>>
    }
  }
  'recomendacion_tratamientos.store': {
    methods: ["POST"]
    pattern: '/recomendacion_tratamientos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/recomendacion_tratamientos_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/recomendacion_tratamientos_controller').default['store']>>>
    }
  }
  'recomendacion_tratamientos.show': {
    methods: ["GET","HEAD"]
    pattern: '/recomendacion_tratamientos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/recomendacion_tratamientos_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/recomendacion_tratamientos_controller').default['show']>>>
    }
  }
  'recomendacion_tratamientos.update': {
    methods: ["PUT"]
    pattern: '/recomendacion_tratamientos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/recomendacion_tratamientos_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/recomendacion_tratamientos_controller').default['update']>>>
    }
  }
  'recomendacion_tratamientos.destroy': {
    methods: ["DELETE"]
    pattern: '/recomendacion_tratamientos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/recomendacion_tratamientos_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/recomendacion_tratamientos_controller').default['destroy']>>>
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
  'analisis_ia.store': {
    methods: ["POST"]
    pattern: '/analisis_ia'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/analisis_ia_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/analisis_ia_controller').default['store']>>>
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
  'analisis_ia.update': {
    methods: ["PUT"]
    pattern: '/analisis_ia/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/analisis_ia_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/analisis_ia_controller').default['update']>>>
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
}
