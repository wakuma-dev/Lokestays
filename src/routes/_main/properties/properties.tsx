import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/properties/properties')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_main/properties/properties"!</div>
}
