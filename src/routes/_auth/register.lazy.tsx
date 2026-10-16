import { createLazyFileRoute } from '@tanstack/react-router'
import Register from '@/pages/Register'
export const Route = createLazyFileRoute('/_auth/register')({
  component: Register,
});
