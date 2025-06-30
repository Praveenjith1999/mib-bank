// TransactionsHistory.jsx
import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Typography, Box, TextField, Autocomplete, Button
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import txn from "../assets/images/historytxn.png";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DownloadPdfButton from "../html_files/txnstatementpdf.jsx";
import Footer from "./footer.jsx";

export default function TransactionsHistory() {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [currentBalance, setCurrentBalance] = useState(0);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/MIB/openaccount/createbankaccount/")
      .then(res => setAccounts(res.data));
  }, []);

  useEffect(() => {
    if (selectedAccount) {
      axios.get(`http://127.0.0.1:8000/MIB/bankservice/transactions/${selectedAccount.bank_account_number}/`)
        .then((res) => {
          setTransactions(res.data);
          if (res.data.length > 0) {
            setCurrentBalance(res.data[0].total_balance);
          } else {
            setCurrentBalance(0);
          }
        })
        .catch(() => setTransactions([]));
    }
  }, [selectedAccount]);

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          my: 4,
          gap: 2
          
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976d2", display: "flex", alignItems: "center", gap: 1 }}>
            <ReceiptLongIcon color="primary" /> Transaction History
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "#555" }}>
            View all deposits and withdrawals sorted by date.
          </Typography>
        </Box>
       
      </Box>

      {/* Search Field */}
      <Autocomplete
        options={accounts}
        getOptionLabel={(option) => `${option.bank_account_number} - ${option.name}`}
        onChange={(e, value) => setSelectedAccount(value)}
        renderInput={(params) => (
          <TextField {...params} label="Search Account" fullWidth margin="normal" />
        )}
      />

      {/* Transaction Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ background: "linear-gradient(to right, #00c6ff, #0072ff)" }}>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>📅 Date</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>🔁 Type</TableCell>
              <TableCell align="right" sx={{ color: "#fff", fontWeight: "bold" }}>💰 Amount</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>📝 Purpose</TableCell>
              <TableCell align="right" sx={{ color: "#fff", fontWeight: "bold" }}>💼 Balance</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>🔐 Ref. No</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx, idx) => (
              <motion.tr
                key={tx.reference_number}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <TableCell>{new Date(tx.transaction_date).toLocaleString()}</TableCell>
                <TableCell sx={{ color: tx.transaction_type === "deposit" ? "green" : "red" }}>
                  {tx.transaction_type.toUpperCase()}
                </TableCell>
                <TableCell align="right">₹{tx.transaction_amount}</TableCell>
                <TableCell>{tx.purpose}</TableCell>
                <TableCell align="right">₹{tx.total_balance}</TableCell>
                <TableCell>{tx.reference_number}</TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Current Balance */}
      <Typography variant="h6" sx={{ mt: 2, color: "#2e7d32" }}>
        🧮 Current Balance: ₹{currentBalance}
      </Typography>

      {/* PDF Download Button */}
      <Box mt={3} display="flex" justifyContent="flex-end">
        <DownloadPdfButton selectedAccount={selectedAccount} transactions={transactions} />
      </Box>
    </motion.div>
    <Footer/>
    </>
  );
}
