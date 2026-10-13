import { createFileRoute } from '@tanstack/react-router'
import LegalLayout from '@/layouts/LegalLayout'
export const Route = createFileRoute('/_legal')({
  component: LegalLayout,
})

