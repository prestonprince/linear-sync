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
      <Container width="100%" mt="6">
        <Flex justify="between" align="center">
          <Text size="6" weight="bold">
            Team: {context.user.team?.name}
          </Text>
          <CreateIssueModal />
        </Flex>
      </Container>
      <Container width="100%">
        <Flex direction="column" gap="3" justify="center">
          {issues.length
            ? issues.map((issue) => (
                <Box key={issue.id} maxWidth="75%">
                  <Card>
                    <Flex direction="column" gap="2">
                      <Text size="5" weight="medium">
                        {issue.title}
                      </Text>
                      <Text size="4">{issue.description}</Text>
                      <Flex align="center" gap="3">
                        <Text size="2">{issue.status}</Text>
                        <Text size="2">{issue.priority}</Text>
                      </Flex>
                      <Text size="1" color="gray" mt="2">
                        ID: {issue.id}
                      </Text>
                    </Flex>
                  </Card>
                </Box>
              ))
            : null}
        </Flex>
      </Container>
    </Flex>
  );
}
