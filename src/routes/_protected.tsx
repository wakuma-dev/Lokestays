import { createFileRoute, redirect } from "@tanstack/react-router";
import ProtectedLayout from "@/layouts/ProtectedLayout";

export const Route = createFileRoute("/_protected")({
    beforeLoad: ({context}) => {
        if(!context.authUser){
            throw redirect({to: "/login"})
        }
    },
    component: ProtectedLayout
});