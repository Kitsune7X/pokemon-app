import { Alert, AlertDescription, AlertTitle } from "./ui/8bit/alert";
import "#/components/ui/8bit/styles/retro.css";

export default function AppAlert({
  title,
  description,
}: {
  title: string;
  description?: string | null;
}) {
  return (
    <Alert className="retro">
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
}
