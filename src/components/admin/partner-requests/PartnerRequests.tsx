
import React from "react";
import { Dialog } from "@/components/ui/dialog";
import { usePartnerRequests } from "./hooks/usePartnerRequests";
import PartnerRequestsTable from "./PartnerRequestsTable";
import PartnerRequestDetails from "./PartnerRequestDetails";

const PartnerRequests = () => {
  const {
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
  } = usePartnerRequests();

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="text-center py-4">Φόρτωση αιτήσεων...</div>
      ) : (
        <PartnerRequestsTable 
          requests={requests}
          formatDate={formatDate}
          onViewDetails={handleViewDetails}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}

      {selectedRequest && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <PartnerRequestDetails
            request={selectedRequest}
            processingAction={processingAction}
            formatDate={formatDate}
            onClose={() => setDetailsOpen(false)}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </Dialog>
      )}
    </div>
  );
};

export default PartnerRequests;
