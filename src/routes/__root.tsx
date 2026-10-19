import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { RouteErrorBoundary } from '@/components/error/RouteErrorBoundary'
import { ErrorBoundary } from '@/components/error/ErrorBoundary'
import NotFound from '@/pages/NotFound';
import type { RouterContext } from '@/app/router/router';
export function RootLayout(){
 return(
   <ErrorBoundary onError={(error, info) => console.error("Render Error", error, info)}>
    <Outlet />
   </ErrorBoundary>
    );
}

export const Route = createRootRouteWithContext<RouterContext>()({ 
    component: RootLayout,
    errorComponent: RouteErrorBoundary,
    notFoundComponent: NotFound

});