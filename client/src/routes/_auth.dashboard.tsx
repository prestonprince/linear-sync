import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard")({
  component: DashboardComponent,
});

function DashboardComponent() {
  return (
    <div>
      <h4>Hello protected "/dashboard"!</h4>
    </div>
  );
}
