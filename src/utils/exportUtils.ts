
import { FuneralHome } from "@/types/funeralHome";

export const exportToCSV = (data: FuneralHome[], filename: string) => {
  // Define the CSV header row
  const headers = [
    "Name",
    "City",
    "State",
    "Address",
    "Zip",
    "Phone",
    "Email",
    "Website",
    "Status",
  ];

  // Map each funeral home object to a CSV row
  const rows = data.map((home) => [
    `"${home.name.replace(/"/g, '""')}"`,
    `"${home.city.replace(/"/g, '""')}"`,
    `"${home.state.replace(/"/g, '""')}"`,
    `"${home.address.replace(/"/g, '""')}"`,
    `"${home.zip.replace(/"/g, '""')}"`,
    `"${home.phone.replace(/"/g, '""')}"`,
    `"${home.email.replace(/"/g, '""')}"`,
    `"${home.website.replace(/"/g, '""')}"`,
    `"${home.featured ? "Προβεβλημένο" : "Κανονικό"}"`,
  ]);

  // Join headers and rows to create the CSV content
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  // Create a Blob and a download link
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
