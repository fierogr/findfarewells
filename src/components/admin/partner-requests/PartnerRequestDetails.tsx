
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, XCircle } from "lucide-react";
import { PartnerRequest } from "./types";

interface PartnerRequestDetailsProps {
  request: PartnerRequest;
  processingAction: boolean;
  formatDate: (date: string) => string;
  onClose: () => void;
  onApprove: (request: PartnerRequest) => void;
  onReject: (request: PartnerRequest) => void;
}

const PartnerRequestDetails = ({
  request,
  processingAction,
  formatDate,
  onClose,
  onApprove,
  onReject
}: PartnerRequestDetailsProps) => {
  return (
    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Λεπτομέρειες Αίτησης</DialogTitle>
        <DialogDescription>
          Υποβλήθηκε στις {formatDate(request.created_at)}
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
        <div className="space-y-2">
          <h3 className="font-medium">Στοιχεία Επιχείρησης</h3>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Επωνυμία:</span>
              <span className="font-medium">{request.business_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ιδιοκτήτης:</span>
              <span>{request.owner_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span>{request.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Τηλέφωνο:</span>
              <span>{request.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ιστοσελίδα:</span>
              <span>{request.website || '-'}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Διεύθυνση</h3>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Οδός:</span>
              <span>{request.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Πόλη:</span>
              <span>{request.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Τ.Κ.:</span>
              <span>{request.postal_code}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 col-span-1 md:col-span-2">
          <h3 className="font-medium">Περιγραφή</h3>
          <p className="text-sm">{request.description}</p>
        </div>
        
        {request.services && (
          <div className="space-y-2 col-span-1 md:col-span-2">
            <h3 className="font-medium">Υπηρεσίες</h3>
            <p className="text-sm">{request.services}</p>
          </div>
        )}
        
        {request.regions && request.regions.length > 0 && (
          <div className="space-y-2 col-span-1 md:col-span-2">
            <h3 className="font-medium">Περιοχές Εξυπηρέτησης</h3>
            <div className="flex flex-wrap gap-2">
              {request.regions.map((region, index) => (
                <Badge key={index} variant="outline">
                  {region}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <DialogFooter>
        {request.status === 'pending' ? (
          <>
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={processingAction}
            >
              Άκυρο
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => onReject(request)}
              disabled={processingAction}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Απόρριψη
            </Button>
            <Button 
              onClick={() => onApprove(request)} 
              className="bg-green-600 hover:bg-green-700"
              disabled={processingAction}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Έγκριση
            </Button>
          </>
        ) : (
          <Button onClick={onClose}>Κλείσιμο</Button>
        )}
      </DialogFooter>
    </DialogContent>
  );
};

export default PartnerRequestDetails;
