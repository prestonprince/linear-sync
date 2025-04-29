import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button, Flex, TextField } from "@radix-ui/themes";

import { authClient } from "@/lib/authClient";

export const Route = createFileRoute("/signUp")({
  component: SignUpComponent,
});

function SignUpComponent() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = Route.useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await authClient.signUp.email({
      name,
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
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Button type="submit">Sign Up</Button>
      </Flex>
    </form>
  );
}
