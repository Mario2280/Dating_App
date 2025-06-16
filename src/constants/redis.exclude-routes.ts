import { RoutesEntities as r } from '@const/routes-entities'
import { RequestMethod as m } from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';
export const excludeRedisRoutes: RouteInfo[] = [
 
  {
    method: m.GET,
    path: `/${r.MEDIA}/(.*)`,
  },
];