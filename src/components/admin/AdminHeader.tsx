
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface AdminHeaderProps {
  onLogout: () => void;
}

const AdminHeader = ({ onLogout }: AdminHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Πίνακας Διαχείρισης</h1>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onLogout}
        className="flex items-center gap-2"
      >
        <LogOut className="h-4 w-4" />
        Αποσύνδεση
      </Button>
    </div>
  );
};

export default AdminHeader;
