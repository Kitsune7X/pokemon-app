import { createFileRoute } from "@tanstack/react-router";
import useApi from "#/hooks/useApi";

export const Route = createFileRoute("/pokemon")({
  component: RouteComponent,
});

function RouteComponent() {
  const pokemon = useApi();
  console.log(pokemon);
  return <div>Hello "/pokemon"!</div>;
}
