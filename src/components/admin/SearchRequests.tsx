
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { el } from "date-fns/locale";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface SearchRequest {
  id: string;
  location: string | null;
  prefecture: string | null;
  services: string[] | null;
  phone_number: string;
  created_at: string;
}

const SearchRequests = () => {
  const [searchRequests, setSearchRequests] = useState<SearchRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchSearchRequests();
  }, []);

  const fetchSearchRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('search_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setSearchRequests(data || []);
    } catch (err) {
      console.error('Error fetching search requests:', err);
      setError('Σφάλμα κατά τη φόρτωση των αιτημάτων αναζήτησης');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRequest = async () => {
    if (!requestToDelete) return;
    
    try {
      const { error } = await supabase
        .from('search_requests')
        .delete()
        .eq('id', requestToDelete);
      
      if (error) throw error;
      
      setSearchRequests(prev => prev.filter(request => request.id !== requestToDelete));
      toast.success('Το αίτημα αναζήτησης διαγράφηκε επιτυχώς');
    } catch (err) {
      console.error('Error deleting search request:', err);
      toast.error('Σφάλμα κατά τη διαγραφή του αιτήματος αναζήτησης');
    } finally {
      setRequestToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "d MMMM yyyy, HH:mm", { locale: el });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Τηλέφωνο</TableHead>
              <TableHead>Περιοχή</TableHead>
              <TableHead>Νομός</TableHead>
              <TableHead>Υπηρεσίες</TableHead>
              <TableHead>Ημερομηνία</TableHead>
              <TableHead className="w-[100px]">Ενέργειες</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  Φόρτωση αιτημάτων αναζήτησης...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-destructive py-10">
                  {error}
                </TableCell>
              </TableRow>
            ) : searchRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  Δεν υπάρχουν αιτήματα αναζήτησης
                </TableCell>
              </TableRow>
            ) : (
              searchRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.phone_number}</TableCell>
                  <TableCell>{request.location || "—"}</TableCell>
                  <TableCell>{request.prefecture || "—"}</TableCell>
                  <TableCell>
                    {request.services && request.services.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {request.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="whitespace-nowrap">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>{formatDate(request.created_at)}</TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setRequestToDelete(request.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Διαγραφή αιτήματος</AlertDialogTitle>
                          <AlertDialogDescription>
                            Είστε βέβαιοι ότι θέλετε να διαγράψετε οριστικά αυτό το αίτημα αναζήτησης;
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setRequestToDelete(null)}>
                            Άκυρο
                          </AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteRequest} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Διαγραφή
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SearchRequests;
