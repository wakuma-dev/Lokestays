import { createFileRoute } from '@tanstack/react-router'
import { redirectSchema } from "@/feature/auth"
import Login from '@/pages/Login'
export const Route = createFileRoute('/_auth/login')({
  validateSearch: redirectSchema,
  component: Login,
})


