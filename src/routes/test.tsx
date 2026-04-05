import { createFileRoute } from '@tanstack/react-router';
import { Button } from '#/components/ui/8bit/button';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2>Test route</h2>
      <Button variant="outline">Click here!</Button>
    </div>
  );
}
