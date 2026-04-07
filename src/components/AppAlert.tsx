import { Alert, AlertDescription, AlertTitle } from "./ui/8bit/alert";

export default function AppAlert({
  title,
  description,
}: {
  title: string;
  description?: string | null;
}) {
  return (
    <Alert>
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
}
