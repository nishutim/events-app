import React from 'react';
import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import RouteNames from '../router/routeNames';
import { privateRoutes, publicRoutes } from '../router/routes';
import { auth_selectIsAuth } from '../store/reducers/auth/selectors';

const AppRouter = React.memo(() => {
   const isAuth = useAppSelector(auth_selectIsAuth);

   return (
      isAuth ?
         <Suspense fallback={<div>Loading</div>}>
            <Routes>
               <Route path={RouteNames.HOME} element={<Navigate to={RouteNames.EVENT} />} />
               {privateRoutes.map(({ path, Component }) => (
                  <Route key={path} path={path} element={<Component />} />
               ))}
               <Route path={RouteNames.BAD_URL} element={<Navigate to={RouteNames.EVENT} />} />
            </Routes>
         </Suspense>
         :
         <Suspense fallback={<div>Loading</div>}>
            <Routes>
               <Route path={RouteNames.HOME} element={<Navigate to={RouteNames.LOGIN} />} />
               {publicRoutes.map(({ path, Component }) => (
                  <Route key={path} path={path} element={<Component />} />
               ))}
               <Route path={RouteNames.BAD_URL} element={<Navigate to={RouteNames.LOGIN} />} />
            </Routes>
         </Suspense>
   );
});

export default AppRouter;