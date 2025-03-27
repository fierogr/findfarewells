
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileUp } from "lucide-react";
import { FileUploadProps } from "./types";

const FileUpload = ({ file, setFile }: FileUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-500 mb-2">
          Επιλέξτε ένα αρχείο CSV ή μεταφέρετε το εδώ
        </p>
        <Input
          id="file-upload"
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button asChild variant="outline" className="mt-2">
          <label htmlFor="file-upload" className="cursor-pointer">
            <FileUp className="h-4 w-4 mr-2" />
            Επιλογή Αρχείου
          </label>
        </Button>
      </div>

      {file && (
        <Alert>
          <AlertDescription className="flex items-center justify-between">
            <span>{file.name}</span>
            <Button size="sm" onClick={() => setFile(null)} variant="ghost">
              Αλλαγή
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default FileUpload;
