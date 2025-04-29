import { createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!, // We'll set this via context
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
