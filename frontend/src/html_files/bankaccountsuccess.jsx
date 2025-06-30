import { useLocation } from "react-router-dom";
import {
  Box, Typography, Card, CardContent, Button
} from "@mui/material";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import Navbar from "./navbar";

export default function AccountSuccessCard() {
  const { state } = useLocation();

  if (!state) return <Typography>Invalid Access</Typography>;

  const {
    user_reference,
    name,
    bank_account_number,
    ifsc_code,
    mobile_number,
    address
  } = state;

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("MIB Bank - Account Details", 20, 20);
    doc.setFontSize(12);
    doc.text(`Reference Number: ${user_reference}`, 20, 40);
    doc.text(`Account Holder Name: ${name}`, 20, 50);
    doc.text(`Account Number: ${bank_account_number}`, 20, 60);
    doc.text(`IFSC Code: ${ifsc_code}`, 20, 70);
    doc.text(`Mobile Number: ${mobile_number}`, 20, 80);
    doc.text(`Address: ${address}`, 20, 90);
    doc.save("MIB_Bank_Account_Details.pdf");
  };

  return (
    <>
      <Navbar />
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          maxWidth: 500,
          mx: "auto",
          mt: 5,
          textAlign: "center",
          p: 2,
        }}
      >
        <Typography variant="h4" gutterBottom color="green">
          🎉 Congratulations!
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Your bank account was successfully created. Your account details are below.
        </Typography>

        <Card
          component={motion.div}
          whileHover={{ scale: 1.02 }}
          sx={{
            background: "linear-gradient(135deg, #b3e5fc, #e1bee7)",
            boxShadow: 6,
            borderRadius: 4,
          }}
        >
          <CardContent>
            <Typography><strong>Reference Number:</strong> {user_reference}</Typography>
            <Typography><strong>Account Holder Name:</strong> {name}</Typography>
            <Typography><strong>Account Number:</strong> {bank_account_number}</Typography>
            <Typography><strong>IFSC Code:</strong> {ifsc_code}</Typography>
            <Typography><strong>Mobile Number:</strong> {mobile_number}</Typography>
            <Typography><strong>Address:</strong> {address}</Typography>
          </CardContent>
        </Card>

        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 3, fontWeight: "bold", borderRadius: 3 }}
          onClick={handleDownload}
        >
          ⬇️ Download Details
        </Button>
      </Box>
    </>
  );
}
