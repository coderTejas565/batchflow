import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CreateInstituteForm } from "./create-institute-form";

export function CreateInstituteCard() {
  return (
    <Card className="w-full max-w-lg shadow-lg">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">Welcome to BatchFlow 👋</CardTitle>

        <CardDescription>
          Create your first institute to start managing teachers, students, batches and courses.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <CreateInstituteForm />
      </CardContent>
    </Card>
  );
}
