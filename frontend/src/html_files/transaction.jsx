import React, { useState, useEffect } from "react";
import {
  Box, TextField, Button, Typography, Paper, Autocomplete,
  Snackbar, Alert, CircularProgress, ToggleButton, ToggleButtonGroup
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import transactionImg from "../assets/images/deposite.webp"; // Use your preferred image
import Navbar from "./navbar";


import depositImg from "../assets/images/dsp.jpg";
import withdrawImg from "../assets/images/wit.jpg";
import interestImg from "../assets/images/int.jpg";
import Footer from "./footer";

export default function TransactionForm() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [transactionType, setTransactionType] = useState("deposit");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/MIB/openaccount/createbankaccount/")
      .then((res) => {
        setAccounts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setSnackbar({ open: true, message: "Failed to load accounts", severity: "error" });
        setLoading(false);
      });
  }, []);

  const handleAccountSelect = (event, value) => {
    setSelectedAccount(value);
  };

  const handleTransactionTypeChange = (event, newType) => {
    if (newType) {
      setTransactionType(newType);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAccount) {
      setSnackbar({ open: true, message: "Please select an account", severity: "error" });
      return;
    }

    const payload = {
      bank_account_number: selectedAccount.bank_account_number,
      transaction_amount: amount,
      purpose: purpose,
      transaction_type: transactionType
    };

    try {
      const res = await axios.post("http://127.0.0.1:8000/MIB/bankservice/transaction/", payload);
      setSnackbar({
        open: true,
        message: `✅ ${transactionType.toUpperCase()} Success (Ref: ${res.data.reference_number})`,
        severity: "success"
      });
      setAmount("");
      setPurpose("");
    } catch (err) {
      const error = err.response?.data?.error || "Unknown error";
      setSnackbar({ open: true, message: `❌ Failed: ${error}`, severity: "error" });
    }
  };

  return (
    <>
      <Navbar />
      <Box className="bg-light"
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          maxWidth: 1200,
          mx: "auto",
          px: 2,
          py: 4
        }}
      >
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{ flex: 1 }}
        >
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3, backgroundColor: "#fffbea" }}>
            <Box textAlign="center">
              <img
                src={transactionImg}
                alt="Transaction"
                style={{
                  maxWidth: "100%",
                  height: "350px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  filter: "brightness(0.85)",
                  marginBottom: "16px"
                }}
              />
              <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: "bold", mb: 1 }}>
                {transactionType === "deposit" ? "💰 Deposit Funds Easily" : "🏧 Withdraw Securely"}
              </Typography>
              <Typography variant="body2" sx={{ color: "#444" }}>
                {transactionType === "deposit"
                  ? "Add funds to your account instantly."
                  : "Withdraw cash from your account safely."}
              </Typography>
            </Box>
          </Paper>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          style={{ flex: 1 }}
        >
          <Paper elevation={4} sx={{ p: 4, borderRadius: 3, backgroundColor: "#f0faff" }}>
            <Typography variant="h5" fontWeight="bold" sx={{ color: "#1976d2", mb: 3 }}>
              {transactionType === "deposit" ? "💳 Make a Deposit" : "🏧 Withdraw Money"}
            </Typography>

            <ToggleButtonGroup
              value={transactionType}
              exclusive
              onChange={handleTransactionTypeChange}
              fullWidth
              sx={{ mb: 3 }}
            >
              <ToggleButton value="deposit" color="success">
                ➕ Deposit
              </ToggleButton>
              <ToggleButton value="withdraw" color="error">
                ➖ Withdraw
              </ToggleButton>
            </ToggleButtonGroup>

            {loading ? (
              <CircularProgress />
            ) : (
              <Autocomplete
                options={accounts}
                getOptionLabel={(option) => `${option.bank_account_number} - ${option.name}`}
                onChange={handleAccountSelect}
                renderInput={(params) => (
                  <TextField {...params} label="Select Account" fullWidth margin="normal" />
                )}
              />
            )}

            <TextField
              label={transactionType === "deposit" ? "Deposit Amount" : "Withdraw Amount"}
              type="number"
              fullWidth
              margin="normal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <TextField
              label="Purpose"
              multiline
              rows={3}
              fullWidth
              margin="normal"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                fontWeight: "bold",
                fontSize: "16px",
                background: transactionType === "deposit"
                  ? "linear-gradient(to right, #00b09b, #96c93d)"
                  : "linear-gradient(to right, #ff416c, #ff4b2b)"
              }}
              onClick={handleSubmit}
            >
              {transactionType === "deposit" ? "➕ Submit Deposit" : "🏧 Confirm Withdrawal"}
            </Button>
          </Paper>
        </motion.div>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
        <div className="container py-5">
      <marquee behavior="scroll" direction="left" className="mb-4 text-primary fs-4">
        Welcome to MIB Bank – Your Trusted Partner in Secure and Smart Banking
      </marquee>

      {/* Title */}
      <motion.h1
        className="text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        The Complete Guide to Bank Deposits and Withdrawals at MIB Bank
      </motion.h1>

      {/* Intro Paragraph */}
      <motion.p
        className="lead text-justify"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        Banking plays a pivotal role in our lives today. Whether it's saving money securely, withdrawing
        funds conveniently, or investing in future goals, banking services like deposits and withdrawals
        are essential tools that help us manage our financial lives with confidence and ease. At MIB Bank,
        we are committed to offering simple, secure, and sophisticated banking experiences tailored to
        your needs.
      </motion.p>

      {/* Deposit Section */}
      <motion.div
        className="row align-items-center my-5"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="col-md-6">
          <img src={depositImg} className="img-fluid rounded shadow" alt="Deposit" />
        </div>
        <div className="col-md-6">
          <h2 className="text-success">Understanding Deposits</h2>
          <p>
            A deposit is when you add money to your bank account. At MIB Bank, we offer multiple ways
            to deposit money: cash deposits at branches and ATMs, online transfers, cheque deposits,
            and mobile banking deposits. The moment you deposit money, it's reflected instantly in your
            account and can be used for any financial requirement.
          </p>
          <ul>
            <li>Cash Deposit via ATMs or Branch Counters</li>
            <li>Online Transfer via IMPS, NEFT, RTGS</li>
            <li>Cheque Deposits through Drop Boxes</li>
            <li>Mobile Banking QR or UPI Transfers</li>
          </ul>
        </div>
      </motion.div>

      {/* Withdraw Section */}
      <motion.div
        className="row align-items-center my-5 flex-md-row-reverse"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="col-md-6">
          <img src={withdrawImg} className="img-fluid rounded shadow" alt="Withdraw" />
        </div>
        <div className="col-md-6">
          <h2 className="text-danger">Withdrawing Your Money</h2>
          <p>
            Withdrawing funds from your account is just as easy as depositing. MIB Bank supports
            withdrawals via ATMs, branch visits, and online transfers. Whether you need cash in hand or
            want to transfer it to another bank, we make it effortless and safe.
          </p>
          <ul>
            <li>ATM Cash Withdrawal with Daily Limits</li>
            <li>Instant Transfers to Other Banks</li>
            <li>UPI/QR Code Payments</li>
            <li>Withdraw via Cheque or Branch Requests</li>
          </ul>
        </div>
      </motion.div>

      {/* Table Section */}
      <motion.div className="my-5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
        <h3 className="text-center">Comparison Table – Deposit vs Withdrawal</h3>
        <table className="table table-bordered mt-4">
          <thead className="table-dark">
            <tr>
              <th>Feature</th>
              <th>Deposit</th>
              <th>Withdrawal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Availability</td>
              <td>24x7 (ATM/Online)</td>
              <td>24x7 (ATM/Online)</td>
            </tr>
            <tr>
              <td>Transaction Limit</td>
              <td>Up to ₹2,00,000/day</td>
              <td>Up to ₹50,000/day</td>
            </tr>
            <tr>
              <td>Security</td>
              <td>OTP + Authentication</td>
              <td>PIN + OTP Verification</td>
            </tr>
            <tr>
              <td>Processing Time</td>
              <td>Instant</td>
              <td>Instant</td>
            </tr>
          </tbody>
        </table>
      </motion.div>

      {/* Fixed Deposit Section */}
      <motion.div className="row align-items-center my-5" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <div className="col-md-6">
          <img src={interestImg} className="img-fluid rounded shadow" alt="Fixed Deposit" />
        </div>
        <div className="col-md-6">
          <h2 className="text-primary">Fixed Deposits – Grow Your Savings</h2>
          <p>
            Fixed Deposits (FDs) are a smart way to earn guaranteed returns over time. MIB Bank offers
            highly competitive interest rates on FDs, with flexible tenure options. Whether you're saving
            for retirement, a major purchase, or just securing extra income, an FD is a trusted instrument.
          </p>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Tenure</th>
                <th>Interest Rate</th>
                <th>Minimum Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>6 Months</td>
                <td>5.50%</td>
                <td>₹5,000</td>
              </tr>
              <tr>
                <td>1 Year</td>
                <td>6.25%</td>
                <td>₹10,000</td>
              </tr>
              <tr>
                <td>5 Years</td>
                <td>7.10%</td>
                <td>₹25,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Conclusion */}
      <motion.div className="mt-5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
        <h4 className="text-center">Why Choose MIB Bank?</h4>
        <p>
          At MIB Bank, customer trust and satisfaction are our highest priorities. Our seamless deposit,
          withdrawal, and investment features are designed to offer a frictionless experience that combines
          traditional reliability with modern digital convenience. Whether you’re a student saving for the
          future, a professional managing your salary, or a senior citizen seeking investment safety, MIB
          Bank is your ideal partner.
        </p>
        <p className="text-muted">
          For more details, visit your nearest MIB branch or log in to our internet banking portal.
        </p>
      </motion.div>
    </div>
    <Footer/>
    </>

  );
}
