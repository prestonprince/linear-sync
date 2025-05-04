import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { handleRedirect } from "@/lib/linear";
import { Text } from "@radix-ui/themes";

const searchSchema = z.object({
  code: z.string(),
  state: z.string(),
});

export const Route = createFileRoute("/callback")({
  validateSearch: zodValidator(searchSchema),
  beforeLoad: async ({ search }) => {
    const isConnected = await handleRedirect({
      code: search.code,
      state: search.state,
    });

    return {
      isConnected,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const context = Route.useRouteContext();
  if (context.isConnected) {
    return (
      <div>
        <Text>Linear Connected!</Text>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    );
  }
  return <div>Hello "/callback"!</div>;
}
