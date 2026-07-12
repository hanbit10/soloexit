import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Product } from "@/types";
import React from "react";

export function RoutineCheckbox({ products }: { products: Product[] }) {
  const [morningRows, setMorningRows] = React.useState<Set<string>>(new Set());
  const [nightRows, setNightRows] = React.useState<Set<string>>(new Set());
  const morningSelectAll = morningRows.size === products.length;
  const handleMorningSelectAll = (checked: boolean) => {
    if (checked) {
      setMorningRows(new Set(products.map((row) => row.id)));
    } else {
      setMorningRows(new Set());
    }
  };
  const handleMorningRow = (id: string, checked: boolean) => {
    const next = new Set(morningRows);

    if (checked) next.add(id);
    else next.delete(id);

    setMorningRows(next);
  };

  const nightSelectAll = nightRows.size === products.length;

  const handleNightSelectAll = (checked: boolean) => {
    if (checked) {
      setNightRows(new Set(products.map((p) => p.id)));
    } else {
      setNightRows(new Set());
    }
  };

  const handleNightRow = (id: string, checked: boolean) => {
    const next = new Set(nightRows);

    if (checked) next.add(id);
    else next.delete(id);

    setNightRows(next);
  };
  return (
    <div className="space-y-4 grid-rows-2">
      <div className="flex gap-4 justify-center">
        <Card>
          <CardHeader>Morning Routine</CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8">
                    <Checkbox
                      id="morning-routine-checkbox"
                      name="morning-routine-checkbox"
                      checked={morningSelectAll}
                      onCheckedChange={handleMorningSelectAll}
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((row) => (
                  <TableRow key={row.id} data-state={morningRows.has(row.id) ? "selected" : undefined}>
                    <TableCell>
                      <Checkbox
                        id={`row-${row.id}-checkbox`}
                        name={`row-${row.id}-checkbox`}
                        checked={morningRows.has(row.id)}
                        onCheckedChange={(checked) => handleMorningRow(row.id, checked === true)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardContent>Evening Routine</CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8">
                  <Checkbox id="night-routine-checkbox" name="night-routine-checkbox" checked={nightSelectAll} onCheckedChange={handleNightSelectAll} />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((row) => (
                <TableRow key={row.id} data-state={nightRows.has(row.id) ? "selected" : undefined}>
                  <TableCell>
                    <Checkbox
                      id={`row-${row.id}-checkbox`}
                      name={`row-${row.id}-checkbox`}
                      checked={nightRows.has(row.id)}
                      onCheckedChange={(checked) => handleNightRow(row.id, checked === true)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
