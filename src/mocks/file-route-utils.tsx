/**
 * https://tanstack.com/router/latest/docs/framework/react/how-to/test-file-based-routing
 */
import React from "react";
import { render, type RenderOptions } from "@testing-library/react";
import {
  createRouter,
  RouterProvider,
  createMemoryHistory,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import the generated route tree
import { routeTree } from "../routeTree.gen";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off to avoid test timeout
      retry: false,
    },
  },
});

// Create test router with generated route tree
export function createTestRouterFromFiles(initialLocation = "/") {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [initialLocation],
    }),
    context: {
      // Add any required context for your routes
      queryClient,
    },
    defaultPreload: "intent",
    // Since we're using React Query, we don't want loader calls to ever be stale
    // This will ensure that the loader is always called when the route is preloaded or visited
    defaultPreloadStaleTime: 0,
    scrollRestoration: true,
  });

  return router;
}

// Custom render function for file-based routes
interface RenderWithFileRoutesOptions extends Omit<RenderOptions, "wrapper"> {
  initialLocation?: string;
  routerContext?: any;
}

export function renderWithFileRoutes(
  ui: React.ReactElement,
  {
    initialLocation = "/",
    routerContext = {},
    ...renderOptions
  }: RenderWithFileRoutesOptions = {},
) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [initialLocation],
    }),
    context: routerContext,
  });

  function Wrapper() {
    return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    router,
  };
}

// Helper to test specific file routes
export function createMockFileRoute(
  path: string,
  component: React.ComponentType,
) {
  // This is useful for isolated testing when you don't want to use the full route tree
  return {
    path,
    component,
    // Add other common route properties as needed
  };
}
