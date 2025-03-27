
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import { toast } from "sonner";
import { createDefaultFuneralHome } from "@/services/funeralHomeUtils";
import { addFuneralHome } from "@/services/funeralHomeService";

interface PartnerRequest {
  id: string;
  business_name: string;
  owner_name: string;
  email: string;
  phone: string;
  city: string;
  status: string;
  created_at: string;
  description: string;
  address: string;
  postal_code: string;
  website: string | null;
  services: string | null;
  regions: string[] | null;
}

const PartnerRequests = () => {
  const [requests, setRequests] = useState<PartnerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<PartnerRequest | null>(null);
  const [processingAction, setProcessingAction] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('new_partners')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching partner requests:', error);
      toast.error('Σφάλμα κατά τη φόρτωση αιτήσεων');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleViewDetails = (request: PartnerRequest) => {
    setSelectedRequest(request);
    setDetailsOpen(true);
  };

  const handleApprove = async (request: PartnerRequest) => {
    setProcessingAction(true);
    try {
      // 1. Create partner in the partners table
      // Generate a random numeric ID instead of using UUID
      const newPartner = createDefaultFuneralHome({
        // Don't use request.id which is a UUID
        // Let Supabase generate a numeric ID for us
        name: request.business_name,
        address: request.address,
        city: request.city,
        state: '', // No state in the request form
        zip: request.postal_code,
        phone: request.phone,
        email: request.email,
        website: request.website || '',
        description: request.description,
        services: request.services ? request.services.split(',').map(s => s.trim()) : [],
        regions: request.regions || []
      });
      
      await addFuneralHome(newPartner);
      
      // 2. Update request status
      const { error } = await supabase
        .from('new_partners')
        .update({ status: 'approved' })
        .eq('id', request.id);
      
      if (error) throw error;
      
      toast.success('Η αίτηση εγκρίθηκε με επιτυχία');
      fetchRequests();
      setDetailsOpen(false);
    } catch (error) {
      console.error('Error approving request:', error);
      toast.error('Σφάλμα κατά την έγκριση της αίτησης');
    } finally {
      setProcessingAction(false);
    }
  };

  const handleReject = async (request: PartnerRequest) => {
    setProcessingAction(true);
    try {
      const { error } = await supabase
        .from('new_partners')
        .update({ status: 'rejected' })
        .eq('id', request.id);
      
      if (error) throw error;
      
      toast.success('Η αίτηση απορρίφθηκε');
      fetchRequests();
      setDetailsOpen(false);
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast.error('Σφάλμα κατά την απόρριψη της αίτησης');
    } finally {
      setProcessingAction(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('el-GR');
  };

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
    <div className="space-y-4">
      {loading ? (
        <div className="text-center py-4">Φόρτωση αιτήσεων...</div>
      ) : (
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
                          onClick={() => handleViewDetails(request)}
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
                              onClick={() => handleApprove(request)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              <span className="sr-only md:not-sr-only md:inline-block">Έγκριση</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center h-8 text-red-600"
                              onClick={() => handleReject(request)}
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
      )}

      {selectedRequest && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Λεπτομέρειες Αίτησης</DialogTitle>
              <DialogDescription>
                Υποβλήθηκε στις {formatDate(selectedRequest.created_at)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <h3 className="font-medium">Στοιχεία Επιχείρησης</h3>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Επωνυμία:</span>
                    <span className="font-medium">{selectedRequest.business_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ιδιοκτήτης:</span>
                    <span>{selectedRequest.owner_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span>{selectedRequest.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Τηλέφωνο:</span>
                    <span>{selectedRequest.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ιστοσελίδα:</span>
                    <span>{selectedRequest.website || '-'}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Διεύθυνση</h3>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Οδός:</span>
                    <span>{selectedRequest.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Πόλη:</span>
                    <span>{selectedRequest.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Τ.Κ.:</span>
                    <span>{selectedRequest.postal_code}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 col-span-1 md:col-span-2">
                <h3 className="font-medium">Περιγραφή</h3>
                <p className="text-sm">{selectedRequest.description}</p>
              </div>
              
              {selectedRequest.services && (
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <h3 className="font-medium">Υπηρεσίες</h3>
                  <p className="text-sm">{selectedRequest.services}</p>
                </div>
              )}
              
              {selectedRequest.regions && selectedRequest.regions.length > 0 && (
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <h3 className="font-medium">Περιοχές Εξυπηρέτησης</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedRequest.regions.map((region, index) => (
                      <Badge key={index} variant="outline">
                        {region}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter>
              {selectedRequest.status === 'pending' ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => setDetailsOpen(false)}
                    disabled={processingAction}
                  >
                    Άκυρο
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={() => handleReject(selectedRequest)}
                    disabled={processingAction}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Απόρριψη
                  </Button>
                  <Button 
                    onClick={() => handleApprove(selectedRequest)} 
                    className="bg-green-600 hover:bg-green-700"
                    disabled={processingAction}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Έγκριση
                  </Button>
                </>
              ) : (
                <Button onClick={() => setDetailsOpen(false)}>Κλείσιμο</Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PartnerRequests;
