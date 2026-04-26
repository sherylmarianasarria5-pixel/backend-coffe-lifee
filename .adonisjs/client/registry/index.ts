/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'cat_roles.index': {
    methods: ["GET","HEAD"],
    pattern: '/cat_roles',
    tokens: [{"old":"/cat_roles","type":0,"val":"cat_roles","end":""}],
    types: placeholder as Registry['cat_roles.index']['types'],
  },
  'cat_roles.store': {
    methods: ["POST"],
    pattern: '/cat_roles',
    tokens: [{"old":"/cat_roles","type":0,"val":"cat_roles","end":""}],
    types: placeholder as Registry['cat_roles.store']['types'],
  },
  'cat_roles.show': {
    methods: ["GET","HEAD"],
    pattern: '/cat_roles/:id',
    tokens: [{"old":"/cat_roles/:id","type":0,"val":"cat_roles","end":""},{"old":"/cat_roles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cat_roles.show']['types'],
  },
  'cat_roles.update': {
    methods: ["PUT"],
    pattern: '/cat_roles/:id',
    tokens: [{"old":"/cat_roles/:id","type":0,"val":"cat_roles","end":""},{"old":"/cat_roles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cat_roles.update']['types'],
  },
  'cat_roles.destroy': {
    methods: ["DELETE"],
    pattern: '/cat_roles/:id',
    tokens: [{"old":"/cat_roles/:id","type":0,"val":"cat_roles","end":""},{"old":"/cat_roles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cat_roles.destroy']['types'],
  },
  'usuarios.index': {
    methods: ["GET","HEAD"],
    pattern: '/usuarios',
    tokens: [{"old":"/usuarios","type":0,"val":"usuarios","end":""}],
    types: placeholder as Registry['usuarios.index']['types'],
  },
  'usuarios.store': {
    methods: ["POST"],
    pattern: '/usuarios',
    tokens: [{"old":"/usuarios","type":0,"val":"usuarios","end":""}],
    types: placeholder as Registry['usuarios.store']['types'],
  },
  'usuarios.show': {
    methods: ["GET","HEAD"],
    pattern: '/usuarios/:id',
    tokens: [{"old":"/usuarios/:id","type":0,"val":"usuarios","end":""},{"old":"/usuarios/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['usuarios.show']['types'],
  },
  'usuarios.update': {
    methods: ["PUT"],
    pattern: '/usuarios/:id',
    tokens: [{"old":"/usuarios/:id","type":0,"val":"usuarios","end":""},{"old":"/usuarios/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['usuarios.update']['types'],
  },
  'usuarios.destroy': {
    methods: ["DELETE"],
    pattern: '/usuarios/:id',
    tokens: [{"old":"/usuarios/:id","type":0,"val":"usuarios","end":""},{"old":"/usuarios/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['usuarios.destroy']['types'],
  },
  'cat_tipos_tratamiento.index': {
    methods: ["GET","HEAD"],
    pattern: '/cat_tipos_tratamiento',
    tokens: [{"old":"/cat_tipos_tratamiento","type":0,"val":"cat_tipos_tratamiento","end":""}],
    types: placeholder as Registry['cat_tipos_tratamiento.index']['types'],
  },
  'cat_tipos_tratamiento.store': {
    methods: ["POST"],
    pattern: '/cat_tipos_tratamiento',
    tokens: [{"old":"/cat_tipos_tratamiento","type":0,"val":"cat_tipos_tratamiento","end":""}],
    types: placeholder as Registry['cat_tipos_tratamiento.store']['types'],
  },
  'cat_tipos_tratamiento.show': {
    methods: ["GET","HEAD"],
    pattern: '/cat_tipos_tratamiento/:id',
    tokens: [{"old":"/cat_tipos_tratamiento/:id","type":0,"val":"cat_tipos_tratamiento","end":""},{"old":"/cat_tipos_tratamiento/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cat_tipos_tratamiento.show']['types'],
  },
  'cat_tipos_tratamiento.update': {
    methods: ["PUT"],
    pattern: '/cat_tipos_tratamiento/:id',
    tokens: [{"old":"/cat_tipos_tratamiento/:id","type":0,"val":"cat_tipos_tratamiento","end":""},{"old":"/cat_tipos_tratamiento/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cat_tipos_tratamiento.update']['types'],
  },
  'cat_tipos_tratamiento.destroy': {
    methods: ["DELETE"],
    pattern: '/cat_tipos_tratamiento/:id',
    tokens: [{"old":"/cat_tipos_tratamiento/:id","type":0,"val":"cat_tipos_tratamiento","end":""},{"old":"/cat_tipos_tratamiento/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cat_tipos_tratamiento.destroy']['types'],
  },
  'cat_niveles_roya.index': {
    methods: ["GET","HEAD"],
    pattern: '/cat_niveles_roya',
    tokens: [{"old":"/cat_niveles_roya","type":0,"val":"cat_niveles_roya","end":""}],
    types: placeholder as Registry['cat_niveles_roya.index']['types'],
  },
  'cat_niveles_roya.store': {
    methods: ["POST"],
    pattern: '/cat_niveles_roya',
    tokens: [{"old":"/cat_niveles_roya","type":0,"val":"cat_niveles_roya","end":""}],
    types: placeholder as Registry['cat_niveles_roya.store']['types'],
  },
  'cat_niveles_roya.show': {
    methods: ["GET","HEAD"],
    pattern: '/cat_niveles_roya/:id',
    tokens: [{"old":"/cat_niveles_roya/:id","type":0,"val":"cat_niveles_roya","end":""},{"old":"/cat_niveles_roya/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cat_niveles_roya.show']['types'],
  },
  'cat_niveles_roya.update': {
    methods: ["PUT"],
    pattern: '/cat_niveles_roya/:id',
    tokens: [{"old":"/cat_niveles_roya/:id","type":0,"val":"cat_niveles_roya","end":""},{"old":"/cat_niveles_roya/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cat_niveles_roya.update']['types'],
  },
  'cat_niveles_roya.destroy': {
    methods: ["DELETE"],
    pattern: '/cat_niveles_roya/:id',
    tokens: [{"old":"/cat_niveles_roya/:id","type":0,"val":"cat_niveles_roya","end":""},{"old":"/cat_niveles_roya/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cat_niveles_roya.destroy']['types'],
  },
  'cat_estados_cultivo.index': {
    methods: ["GET","HEAD"],
    pattern: '/cat_estados_cultivo',
    tokens: [{"old":"/cat_estados_cultivo","type":0,"val":"cat_estados_cultivo","end":""}],
    types: placeholder as Registry['cat_estados_cultivo.index']['types'],
  },
  'cat_estados_cultivo.store': {
    methods: ["POST"],
    pattern: '/cat_estados_cultivo',
    tokens: [{"old":"/cat_estados_cultivo","type":0,"val":"cat_estados_cultivo","end":""}],
    types: placeholder as Registry['cat_estados_cultivo.store']['types'],
  },
  'cat_estados_cultivo.show': {
    methods: ["GET","HEAD"],
    pattern: '/cat_estados_cultivo/:id',
    tokens: [{"old":"/cat_estados_cultivo/:id","type":0,"val":"cat_estados_cultivo","end":""},{"old":"/cat_estados_cultivo/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cat_estados_cultivo.show']['types'],
  },
  'cat_estados_cultivo.update': {
    methods: ["PUT"],
    pattern: '/cat_estados_cultivo/:id',
    tokens: [{"old":"/cat_estados_cultivo/:id","type":0,"val":"cat_estados_cultivo","end":""},{"old":"/cat_estados_cultivo/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cat_estados_cultivo.update']['types'],
  },
  'cat_estados_cultivo.destroy': {
    methods: ["DELETE"],
    pattern: '/cat_estados_cultivo/:id',
    tokens: [{"old":"/cat_estados_cultivo/:id","type":0,"val":"cat_estados_cultivo","end":""},{"old":"/cat_estados_cultivo/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cat_estados_cultivo.destroy']['types'],
  },
  'cat_estados_analisis.index': {
    methods: ["GET","HEAD"],
    pattern: '/cat_estados_analisis',
    tokens: [{"old":"/cat_estados_analisis","type":0,"val":"cat_estados_analisis","end":""}],
    types: placeholder as Registry['cat_estados_analisis.index']['types'],
  },
  'cat_estados_analisis.store': {
    methods: ["POST"],
    pattern: '/cat_estados_analisis',
    tokens: [{"old":"/cat_estados_analisis","type":0,"val":"cat_estados_analisis","end":""}],
    types: placeholder as Registry['cat_estados_analisis.store']['types'],
  },
  'cat_estados_analisis.show': {
    methods: ["GET","HEAD"],
    pattern: '/cat_estados_analisis/:id',
    tokens: [{"old":"/cat_estados_analisis/:id","type":0,"val":"cat_estados_analisis","end":""},{"old":"/cat_estados_analisis/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cat_estados_analisis.show']['types'],
  },
  'cat_estados_analisis.update': {
    methods: ["PUT"],
    pattern: '/cat_estados_analisis/:id',
    tokens: [{"old":"/cat_estados_analisis/:id","type":0,"val":"cat_estados_analisis","end":""},{"old":"/cat_estados_analisis/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cat_estados_analisis.update']['types'],
  },
  'cat_estados_analisis.destroy': {
    methods: ["DELETE"],
    pattern: '/cat_estados_analisis/:id',
    tokens: [{"old":"/cat_estados_analisis/:id","type":0,"val":"cat_estados_analisis","end":""},{"old":"/cat_estados_analisis/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cat_estados_analisis.destroy']['types'],
  },
  'cat_tipos_recomendacion.index': {
    methods: ["GET","HEAD"],
    pattern: '/cat_tipos_recomendacion',
    tokens: [{"old":"/cat_tipos_recomendacion","type":0,"val":"cat_tipos_recomendacion","end":""}],
    types: placeholder as Registry['cat_tipos_recomendacion.index']['types'],
  },
  'cat_tipos_recomendacion.store': {
    methods: ["POST"],
    pattern: '/cat_tipos_recomendacion',
    tokens: [{"old":"/cat_tipos_recomendacion","type":0,"val":"cat_tipos_recomendacion","end":""}],
    types: placeholder as Registry['cat_tipos_recomendacion.store']['types'],
  },
  'cat_tipos_recomendacion.show': {
    methods: ["GET","HEAD"],
    pattern: '/cat_tipos_recomendacion/:id',
    tokens: [{"old":"/cat_tipos_recomendacion/:id","type":0,"val":"cat_tipos_recomendacion","end":""},{"old":"/cat_tipos_recomendacion/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cat_tipos_recomendacion.show']['types'],
  },
  'cat_tipos_recomendacion.update': {
    methods: ["PUT"],
    pattern: '/cat_tipos_recomendacion/:id',
    tokens: [{"old":"/cat_tipos_recomendacion/:id","type":0,"val":"cat_tipos_recomendacion","end":""},{"old":"/cat_tipos_recomendacion/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cat_tipos_recomendacion.update']['types'],
  },
  'cat_tipos_recomendacion.destroy': {
    methods: ["DELETE"],
    pattern: '/cat_tipos_recomendacion/:id',
    tokens: [{"old":"/cat_tipos_recomendacion/:id","type":0,"val":"cat_tipos_recomendacion","end":""},{"old":"/cat_tipos_recomendacion/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cat_tipos_recomendacion.destroy']['types'],
  },
  'cat_prioridades.index': {
    methods: ["GET","HEAD"],
    pattern: '/cat_prioridades',
    tokens: [{"old":"/cat_prioridades","type":0,"val":"cat_prioridades","end":""}],
    types: placeholder as Registry['cat_prioridades.index']['types'],
  },
  'cat_prioridades.store': {
    methods: ["POST"],
    pattern: '/cat_prioridades',
    tokens: [{"old":"/cat_prioridades","type":0,"val":"cat_prioridades","end":""}],
    types: placeholder as Registry['cat_prioridades.store']['types'],
  },
  'cat_prioridades.show': {
    methods: ["GET","HEAD"],
    pattern: '/cat_prioridades/:id',
    tokens: [{"old":"/cat_prioridades/:id","type":0,"val":"cat_prioridades","end":""},{"old":"/cat_prioridades/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cat_prioridades.show']['types'],
  },
  'cat_prioridades.update': {
    methods: ["PUT"],
    pattern: '/cat_prioridades/:id',
    tokens: [{"old":"/cat_prioridades/:id","type":0,"val":"cat_prioridades","end":""},{"old":"/cat_prioridades/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cat_prioridades.update']['types'],
  },
  'cat_prioridades.destroy': {
    methods: ["DELETE"],
    pattern: '/cat_prioridades/:id',
    tokens: [{"old":"/cat_prioridades/:id","type":0,"val":"cat_prioridades","end":""},{"old":"/cat_prioridades/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cat_prioridades.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
