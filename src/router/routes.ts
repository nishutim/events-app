import React from 'react';
import { IRoute } from '../models';
import RouteNames from './routeNames';

const LoginPage = React.lazy(() => import('../pages/LoginPage'));
const EventPage = React.lazy(() => import('../pages/EventPage'));

const publicRoutes = [
   {
      path: RouteNames.LOGIN,
      Component: LoginPage
   },
   {
      path: RouteNames.REGISTRATION,
      Component: LoginPage
   }
] as IRoute[];

const privateRoutes = [
   {
      path: RouteNames.EVENT,
      Component: EventPage
   }
]

export {
   publicRoutes,
   privateRoutes
}