import { CreateIssueModal } from "@/components/CreateIssueModal";
import { getIssues } from "@/lib/issue";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { Container } from "@radix-ui/themes/dist/cjs/index.js";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard")({
  beforeLoad: ({ context }) => {
    if (!context.user.team) {
      throw redirect({
        to: "/createTeam",
      });
    }
  },
  loader: async () => {
    const { issues } = await getIssues();
    return issues;
  },
  component: DashboardComponent,
});

function DashboardComponent() {
  const context = Route.useRouteContext();
  const issues = Route.useLoaderData();
  return (
    <Flex direction="column" gap="2">
      <Container width="100%">
        <Flex justify="between" align="center">
          <p>Team: {context.user.team?.name}</p>
          <CreateIssueModal />
        </Flex>
      </Container>
      <Container width="100%">
        <Flex direction="column" gap="3" justify="center">
          {issues.length
            ? issues.map((issue) => (
                <Box key={issue.id} maxWidth="75%">
                  <Card>
                    <Text>{issue.title}</Text>
                  </Card>
                </Box>
              ))
            : null}
        </Flex>
      </Container>
    </Flex>
  );
}
