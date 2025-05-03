import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Flex, Text } from "@radix-ui/themes";
import { authClient } from "@/lib/authClient";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const { data } = await authClient.getSession();
    if (data && data.user) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  component: App,
});

function App() {
  return (
    <Flex direction="column" gap="3">
      <Text>Landing Page</Text>
      <Link to="/signUp">Sign Up</Link>
      <Link to="/logIn">Sign In</Link>
    </Flex>
  );
}
