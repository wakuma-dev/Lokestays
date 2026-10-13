import { createLazyFileRoute } from '@tanstack/react-router'
import Privacy from '@/pages/Privacy'
export const Route = createLazyFileRoute('/_legal/privacy')({
  component: Privacy,
})


