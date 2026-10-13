import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/register"!</div>
}
