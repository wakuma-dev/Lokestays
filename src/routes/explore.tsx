import { createFileRoute } from '@tanstack/react-router'
import { searchSchema } from '@/feature/search'
import Explore from '@/pages/Explore'
export const Route = createFileRoute('/explore')({
  validateSearch: searchSchema,
  component: Explore,
});



