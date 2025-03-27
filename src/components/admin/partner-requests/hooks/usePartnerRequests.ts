
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PartnerRequest } from "../types";
import { addFuneralHome } from "@/services/funeralHomeService";
import { createDefaultFuneralHome } from "@/services/funeralHomeUtils";

export const usePartnerRequests = () => {
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

  return {
    requests,
    loading,
    detailsOpen,
    selectedRequest,
    processingAction,
    setDetailsOpen,
    handleViewDetails,
    handleApprove,
    handleReject,
    formatDate
  };
};
