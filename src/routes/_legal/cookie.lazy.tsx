import { createLazyFileRoute } from '@tanstack/react-router'
import Cookie from '@/pages/Cookie'
export const Route = createLazyFileRoute('/_legal/cookie')({
  component: Cookie,
})


