import { authClient } from "@/lib/authClient";
import { Button } from "@radix-ui/themes";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    const { data } = await authClient.getSession();
    console.log({ data });
    if (!data || !data?.user) {
      throw redirect({
        to: "/logIn",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const handleSignOut = async () => {
    await authClient.signOut();
    navigate({ to: "/" });
  };

  return (
    <div>
      <h1>Hello protected "/dashboard"!</h1>
      <Button color="tomato" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
}
