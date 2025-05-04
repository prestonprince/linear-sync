import { createTeam } from "@/lib/team";
import { Button, TextField } from "@radix-ui/themes";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_auth/createTeam")({
  beforeLoad: ({ context }) => {
    if (context.user.team) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [teamName, setTeamName] = useState("");
  const navigate = Route.useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName) {
      return;
    }
    await createTeam(teamName);
    navigate({ to: "/dashboard" });
    setTeamName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField.Root
        placeholder="team name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />
      <Button type="submit">Create Team</Button>
    </form>
  );
}
