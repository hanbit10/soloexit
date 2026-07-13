import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

type RoutineAddProps = {
  onSubmit?: (routine: Routine) => void;
};

type Routine = {
  name: string;
  category: string | null;
  time: ("am" | "pm")[];
};

export function RoutineAdd({ onSubmit }: RoutineAddProps) {
  const [routine, setRoutine] = useState<Routine>({
    name: "",
    category: "",
    time: [] as ("am" | "pm")[],
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit?.(routine);

    setRoutine({
      name: "",
      category: "",
      time: [],
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
            <Label htmlFor="name">Product Name</Label>

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

            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="am"
                  checked={routine.time.includes("am")}
                  onCheckedChange={(checked) => {
                    setRoutine({
                      ...routine,
                      time: checked ? [...routine.time, "am"] : routine.time.filter((t) => t !== "am"),
                    });
                  }}
                />
                <Label htmlFor="am">Morning</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pm"
                  checked={routine.time.includes("pm")}
                  onCheckedChange={(checked) => {
                    setRoutine({
                      ...routine,
                      time: checked ? [...routine.time, "pm"] : routine.time.filter((t) => t !== "pm"),
                    });
                  }}
                />
                <Label htmlFor="pm">Evening</Label>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Add Routine
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
