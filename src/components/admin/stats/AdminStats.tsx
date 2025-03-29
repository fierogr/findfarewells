
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FuneralHome } from "@/types/funeralHome";

interface AdminStatsProps {
  funeralHomes: FuneralHome[] | undefined;
  isLoading: boolean;
}

const AdminStats = ({ funeralHomes, isLoading }: AdminStatsProps) => {
  // Calculate statistics
  const totalPartners = funeralHomes?.length || 0;
  const featuredPartners = funeralHomes?.filter(home => home.featured).length || 0;
  const partnersByState = funeralHomes?.reduce((acc, home) => {
    acc[home.state] = (acc[home.state] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-60">
        <p className="text-muted-foreground text-center">
          Φόρτωση στατιστικών...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg">
          <div className="text-2xl font-bold">{totalPartners}</div>
          <div className="text-sm text-muted-foreground">Συνολικοί Συνεργάτες</div>
        </div>
        <div className="p-4 border rounded-lg">
          <div className="text-2xl font-bold">{featuredPartners}</div>
          <div className="text-sm text-muted-foreground">Προβεβλημένοι Συνεργάτες</div>
        </div>
        <div className="p-4 border rounded-lg">
          <div className="text-2xl font-bold">{Object.keys(partnersByState).length}</div>
          <div className="text-sm text-muted-foreground">Νομοί με Συνεργάτες</div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Κατανομή ανά Περιοχή</h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Νομός</TableHead>
                <TableHead>Αριθμός Συνεργατών</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(partnersByState).length > 0 ? (
                Object.entries(partnersByState)
                  .sort((a, b) => b[1] - a[1])
                  .map(([state, count]) => (
                    <TableRow key={state}>
                      <TableCell>{state}</TableCell>
                      <TableCell>{count}</TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    Δεν υπάρχουν δεδομένα.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
