import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

export default function DownloadPdfButton({ selectedAccount, transactions }) {
  const handleDownload = () => {
    const doc = new jsPDF();

    const today = new Date().toLocaleDateString();

    // MIB Header
    doc.setFontSize(18);
    doc.text("MIB Bank", 14, 20);
    doc.setFontSize(12);
    doc.text("Madurai, Tamil Nadu", 14, 28);

    // Account Info
    doc.text(`Name: ${selectedAccount?.name}`, 14, 40);
    doc.text(`Account No: ${selectedAccount?.bank_account_number}`, 14, 48);
    doc.text(`Account Type: ${selectedAccount?.account_type}`, 14, 56);
    doc.text(`Date: ${today}`, 14, 64);

    // Transaction Table
    autoTable(doc, {
      startY: 75,
      head: [["Date", "Type", "Amount", "Purpose", "Balance", "Ref No"]],
      body: transactions.map(tx => [
        new Date(tx.transaction_date).toLocaleString(),
        tx.transaction_type.toUpperCase(),
        `₹${tx.transaction_amount}`,
        tx.purpose,
        `₹${tx.total_balance}`,
        tx.reference_number
      ]),
    });

    // Save the PDF
    doc.save(`MIB_Transactions_${selectedAccount?.bank_account_number}.pdf`);
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<DownloadIcon />}
      onClick={handleDownload}
      sx={{ mt: 3 }}
      disabled={!transactions?.length}
    >
      Download PDF
    </Button>
  );
}
