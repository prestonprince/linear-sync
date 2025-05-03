import { authClient } from "@/lib/authClient";
import type { User } from "@/types/auth.types";
import { Button } from "@radix-ui/themes";
import {
  createFileRoute,
  redirect,
  Link,
  Outlet,
  useRouter,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    const { data } = await authClient.getSession();
    if (!data || !data?.user) {
      throw redirect({
        to: "/",
      });
    }

    return {
      user: data.user as User,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const navigate = Route.useNavigate();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.invalidate();
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
