import { useEffect } from "react"
import { RouterProvider } from "@tanstack/react-router"
import { router } from "./app/router/router"
import { useAuth } from "./feature/auth"
import { useAuthStore } from "./feature/auth"
export default function App(){
  const authUser = useAuthStore((state) => state.user);
  const authLoading = useAuthStore((state) => state.loading);
  useEffect(() => {
  const unsubscribe = useAuth();
  return unsubscribe;
  }, []);
  return(
    <RouterProvider router={router}
     context={{
      authLoading,
      authUser
     }}
    />
  )
}