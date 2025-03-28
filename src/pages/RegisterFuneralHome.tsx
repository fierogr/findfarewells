import React from "react";
import { RegisterForm } from "@/components/funeral-homes/RegisterForm";
const RegisterFuneralHome = () => {
  return <div className="container py-10 max-w-3xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Εγγραφή Γραφείου Τελετών</h1>
          <p className="text-muted-foreground mt-2">Συμπληρώστε τη φόρμα παρακάτω για να εγγραφείτε στην πλατφόρμα μας. Θα σας καλέσουμε το συντομότερο για τις λεπτομέρειες ώστε να εμφανίζεστε στα αποτελέσματα αναζήτησης.</p>
        </div>

        <RegisterForm />
      </div>
    </div>;
};
export default RegisterFuneralHome;