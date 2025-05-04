import { authClient } from "@/lib/authClient";
import { connectLinear } from "@/lib/linear";
import type { User } from "@/types/auth.types";
import { Button, Container, Flex } from "@radix-ui/themes";
import {
  createFileRoute,
  redirect,
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
  const context = Route.useRouteContext();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.invalidate();
    navigate({ to: "/" });
  };

  return (
    <Container width="100%">
      <Flex width="100%" justify="end" align="center">
        {context.user.team?.isLinearConnected ? null : (
          <Button
            onClick={() => {
              connectLinear();
            }}
          >
            Connect Linear
          </Button>
        )}
        <Button color="tomato" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Flex>
      <Outlet />
    </Container>
  );
}
