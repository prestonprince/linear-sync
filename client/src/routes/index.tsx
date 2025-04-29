import { createFileRoute, Link } from "@tanstack/react-router";
import { Flex, Text } from "@radix-ui/themes";

export const Route = createFileRoute("/")({
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
