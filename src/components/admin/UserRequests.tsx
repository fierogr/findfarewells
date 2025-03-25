
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

// Example mock data for user requests
const mockRequests = [
  {
    id: "1",
    name: "Γιώργος Παπαδόπουλος",
    email: "gpapad@example.com",
    phone: "6945678901",
    type: "Πληροφορίες",
    status: "pending",
    date: "2023-10-15",
    message: "Θα ήθελα περισσότερες πληροφορίες για τις υπηρεσίες σας."
  },
  {
    id: "2",
    name: "Μαρία Κωνσταντίνου",
    email: "mkonstant@example.com",
    phone: "6978901234",
    type: "Ραντεβού",
    status: "completed",
    date: "2023-10-12",
    message: "Επιθυμώ ένα ραντεβού για προγραμματισμό κηδείας συγγενή."
  },
  {
    id: "3",
    name: "Δημήτρης Αντωνίου",
    email: "danton@example.com",
    phone: "6912345678",
    type: "Παράπονο",
    status: "pending",
    date: "2023-10-14",
    message: "Δεν είμαι ικανοποιημένος με την εξυπηρέτηση από το γραφείο τελετών Χ."
  }
];

const UserRequests = () => {
  const handleApprove = (id: string) => {
    console.log("Approved request", id);
    // Implementation for approving request
  };

  const handleReject = (id: string) => {
    console.log("Rejected request", id);
    // Implementation for rejecting request
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Όνομα</TableHead>
              <TableHead>Επικοινωνία</TableHead>
              <TableHead>Τύπος</TableHead>
              <TableHead>Ημερομηνία</TableHead>
              <TableHead>Κατάσταση</TableHead>
              <TableHead>Ενέργειες</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRequests.map((request) => (
              <TableRow key={request.id} className="group">
                <TableCell>{request.name}</TableCell>
                <TableCell>
                  <div>{request.email}</div>
                  <div className="text-xs text-muted-foreground">{request.phone}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{request.type}</Badge>
                </TableCell>
                <TableCell>{request.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={request.status === "completed" ? "secondary" : "default"}
                  >
                    {request.status === "completed" ? "Ολοκληρώθηκε" : "Εκκρεμεί"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hidden group-hover:flex items-center h-8 text-green-600"
                      onClick={() => handleApprove(request.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="sr-only">Έγκριση</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hidden group-hover:flex items-center h-8 text-red-600"
                      onClick={() => handleReject(request.id)}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      <span className="sr-only">Απόρριψη</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserRequests;
