import {
  createIssue,
  IssuePriorityValues,
  IssueStatusValues,
  type CreateIssue,
} from "@/lib/issue";
import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

export function CreateIssueModal() {
  const [createIssueData, setCreateIssueData] = useState<CreateIssue>({
    title: "",
    description: "",
    status: "backlog",
    priority: "medium",
  });
  const router = useRouter();

  const handleChange = <K extends keyof CreateIssue>(
    key: K,
    val: CreateIssue[K],
  ) => {
    setCreateIssueData((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleSubmit = async () => {
    try {
      await createIssue(createIssueData);
      await router.invalidate({ sync: true });
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Create New Issue</Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Create Issue</Dialog.Title>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Title
            </Text>
            <TextField.Root
              placeholder="Issue Title"
              type="text"
              value={createIssueData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Description
            </Text>
            <TextField.Root
              placeholder="Issue Description"
              type="text"
              value={createIssueData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Status
            </Text>
            <Select.Root
              defaultValue={createIssueData.status}
              onValueChange={(val: CreateIssue["status"]) =>
                handleChange("status", val)
              }
            >
              <Select.Trigger />
              <Select.Content>
                {IssueStatusValues.map((status) => (
                  <Select.Item key={status} value={status}>
                    {status}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Priority
            </Text>
            <Select.Root
              defaultValue={createIssueData.priority}
              onValueChange={(val: CreateIssue["priority"]) =>
                handleChange("priority", val)
              }
            >
              <Select.Trigger />
              <Select.Content>
                {IssuePriorityValues.map((priority) => (
                  <Select.Item key={priority} value={priority}>
                    {priority}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </label>
        </Flex>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleSubmit}>Create</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
