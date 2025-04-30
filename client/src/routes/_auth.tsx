import { authClient } from "@/lib/authClient";
import { Button } from "@radix-ui/themes";
import {
  createFileRoute,
  redirect,
  Link,
  Outlet,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    const { data } = await authClient.getSession();
    if (!data || !data?.user) {
      throw redirect({
        to: "/logIn",
        search: {
          redirect: location.href,
        },
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
      <Link to="/dashboard">Dashboard</Link>
      <Button color="tomato" onClick={handleSignOut}>
        Sign Out
      </Button>
      <Outlet />
    </div>
  );
}
