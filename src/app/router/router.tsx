import {
  createRouter,
  createBrowserHistory,
} from "@tanstack/react-router";
import { type User } from "firebase/auth";
import { routeTree } from "@/routeTree.gen";

const history = createBrowserHistory();
export interface RouterContext {
  authUser: User | null;
  authLoading: boolean;
}
export const router = createRouter({
  routeTree,
  basepath: "/Lokestays",
  defaultPreload: "intent",
  scrollRestoration: true,
  history,
  context: {
   authUser: null,
   authLoading: false
  }
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}