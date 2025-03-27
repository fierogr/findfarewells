
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import { PartnerRequest } from "./types";

interface PartnerRequestsTableProps {
  requests: PartnerRequest[];
  formatDate: (date: string) => string;
  onViewDetails: (request: PartnerRequest) => void;
  onApprove: (request: PartnerRequest) => void;
  onReject: (request: PartnerRequest) => void;
}

const PartnerRequestsTable = ({
  requests,
  formatDate,
  onViewDetails,
  onApprove,
  onReject
}: PartnerRequestsTableProps) => {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge variant="success">Εγκρίθηκε</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Απορρίφθηκε</Badge>;
      default:
        return <Badge>Εκκρεμεί</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Επωνυμία</TableHead>
            <TableHead>Επικοινωνία</TableHead>
            <TableHead>Τοποθεσία</TableHead>
            <TableHead>Ημερομηνία</TableHead>
            <TableHead>Κατάσταση</TableHead>
            <TableHead>Ενέργειες</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                Δεν υπάρχουν αιτήσεις προς έγκριση
              </TableCell>
            </TableRow>
          ) : (
            requests.map((request) => (
              <TableRow key={request.id} className="group">
                <TableCell>
                  <div>{request.business_name}</div>
                  <div className="text-xs text-muted-foreground">{request.owner_name}</div>
                </TableCell>
                <TableCell>
                  <div>{request.email}</div>
                  <div className="text-xs text-muted-foreground">{request.phone}</div>
                </TableCell>
                <TableCell>{request.city}</TableCell>
                <TableCell>{formatDate(request.created_at)}</TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center h-8"
                      onClick={() => onViewDetails(request)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      <span className="sr-only md:not-sr-only md:inline-block">Προβολή</span>
                    </Button>
                    {request.status === 'pending' && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center h-8 text-green-600"
                          onClick={() => onApprove(request)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          <span className="sr-only md:not-sr-only md:inline-block">Έγκριση</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center h-8 text-red-600"
                          onClick={() => onReject(request)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          <span className="sr-only md:not-sr-only md:inline-block">Απόρριψη</span>
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PartnerRequestsTable;
