import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TextField, Button, Flex } from "@radix-ui/themes";
import { authClient } from "@/lib/authClient";

export const Route = createFileRoute("/logIn")({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = Route.useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await authClient.signIn.email({
      email,
      password,
    });
    if (res.error) {
      return window.alert(res.error.message);
    }

    navigate({ to: "/dashboard" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="3">
        <TextField.Root
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <TextField.Root
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button type="submit">Sign In</Button>
      </Flex>
    </form>
  );
}
