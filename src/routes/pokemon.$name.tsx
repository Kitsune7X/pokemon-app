import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pokemon/$name")({
  component: RouteComponent,
});

function RouteComponent() {
  const name = Route.useParams().name;
  console.log(name);
  return <div>{`Hello ${name}`}</div>;
}
