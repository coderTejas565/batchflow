import type { TeacherDTO } from "@/modules/teacher";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

type TeacherCardProps = {
  teacher: TeacherDTO;
};

export function TeacherCard({ teacher }: TeacherCardProps) {
  const initials = teacher.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card>
      <CardContent className="flex items-center justify-between py-5">
        <div className="flex items-center gap-4">
          <Avatar className="size-11">
            <AvatarImage src={teacher.image ?? undefined} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <h3 className="font-medium leading-none">{teacher.name}</h3>

            <p className="text-sm text-muted-foreground">{teacher.email}</p>

            <p className="text-xs text-muted-foreground">
              Joined {teacher.joinedAt.toLocaleDateString()}
            </p>
          </div>
        </div>

        <Badge variant="secondary">{teacher.role}</Badge>
      </CardContent>
    </Card>
  );
}
