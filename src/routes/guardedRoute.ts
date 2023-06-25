import { Navigate, Outlet } from 'react-router-dom';

// interface GuardedRouteProps {
//     /**
//      * Permission check for route
//      * @default false
//      */
//     isRouteAccessible?: boolean;
//     /**
//      * Route to be redirected to
//      * @default '/'
//      */
//     redirectRoute?: string;
// }

// /**
//  * Component for guarding restricted routes
//  *
//  * @example Default usage
//  * ```ts
//  * <GuardedRoute
//  *	 isRouteAccessible={true}
//  * />
//  * ```
//  *
//  * @example Usage with custom redirected route
//  * ```ts
//  * <GuardedRoute
//  *	 isRouteAccessible={false}
//  *	 redirectRoute={'/login'}
//  * />
//  * ```
//  */
// export const GuardedRoute = ({ isRouteAccessible = false, redirectRoute = '/' }: GuardedRouteProps): JSX.Element => isRouteAccessible ? <Outlet /> : <Navigate to={redirectRoute} replace / >
