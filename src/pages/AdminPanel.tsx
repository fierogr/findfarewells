
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useFuneralHomes } from "@/hooks/useFuneralHomes";
import { useAuth } from "@/contexts/AuthContext";
import PartnerDetails from "@/components/admin/PartnerDetails";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminTabs from "@/components/admin/tabs/AdminTabs";

const AdminPanel = () => {
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const { data: funeralHomes, error: dataError } = useFuneralHomes();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handlePartnerSelect = (partnerId: string) => {
    setSelectedPartnerId(partnerId);
  };

  const handleBackToList = () => {
    setSelectedPartnerId(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin-login");
  };

  return (
    <div className="container py-8">
      <AdminHeader onLogout={handleLogout} />

      {dataError && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-destructive">Σφάλμα κατά τη φόρτωση δεδομένων. Παρακαλώ προσπαθήστε ξανά αργότερα.</p>
          </CardContent>
        </Card>
      )}

      {selectedPartnerId ? (
        <PartnerDetails partnerId={selectedPartnerId} onBack={handleBackToList} />
      ) : (
        <AdminTabs 
          onPartnerSelect={handlePartnerSelect} 
          funeralHomes={funeralHomes} 
          dataError={dataError}
        />
      )}
    </div>
  );
};

export default AdminPanel;
