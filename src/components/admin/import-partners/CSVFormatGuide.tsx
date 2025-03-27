
import React from "react";

const CSVFormatGuide = () => {
  return (
    <div className="bg-muted p-3 rounded-md text-sm">
      <p className="font-medium mb-2">Το CSV πρέπει να περιέχει τις εξής στήλες:</p>
      <ul className="list-disc pl-5 text-muted-foreground space-y-1">
        <li>Name - Επωνυμία συνεργάτη</li>
        <li>City - Πόλη</li>
        <li>State - Νομός</li>
        <li>Address - Διεύθυνση</li>
        <li>Zip - Ταχυδρομικός κώδικας</li>
        <li>Phone - Τηλέφωνο</li>
        <li>Email - Email</li>
        <li>Website - Ιστοσελίδα</li>
        <li>Description - Περιγραφή</li>
        <li>Services - Υπηρεσίες (διαχωρισμένες με ';')</li>
      </ul>
    </div>
  );
};

export default CSVFormatGuide;
