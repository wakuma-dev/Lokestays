import { createFileRoute, redirect } from "@tanstack/react-router";
import ProtectedLayout from "@/layouts/ProtectedLayout";

export const Route = createFileRoute("/_protected")({
  beforeLoad: ({ context, location }) => {
if (context.authLoading) {
    return;
  }
    if (!context.authUser) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: ProtectedLayout,
});