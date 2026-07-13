import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

type RoutineAddProps = {
  onSubmit?: (routine: Routine) => void;
};

type Routine = {
  name: string;
  category: string | null;
  time: string | null;
};

export function RoutineAdd({ onSubmit }: RoutineAddProps) {
  const [routine, setRoutine] = useState<Routine>({
    name: "",
    category: "",
    time: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit?.(routine);

    setRoutine({
      name: "",
      category: "",
      time: "",
    });
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add Routine</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Routine Name</Label>

            <Input
              id="name"
              placeholder="e.g. Morning Skincare"
              value={routine.name}
              onChange={(e) =>
                setRoutine({
                  ...routine,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>

            <Select
              value={routine.category}
              onValueChange={(value) =>
                setRoutine({
                  ...routine,
                  category: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="cleanser">Cleanser</SelectItem>

                <SelectItem value="serum">Serum</SelectItem>

                <SelectItem value="moisturizer">Moisturizer</SelectItem>

                <SelectItem value="sunscreen">Sunscreen</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Time</Label>

            <Select
              value={routine.time}
              onValueChange={(value) =>
                setRoutine({
                  ...routine,
                  time: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="AM / PM" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="am">Morning</SelectItem>

                <SelectItem value="pm">Evening</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Add Routine
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
