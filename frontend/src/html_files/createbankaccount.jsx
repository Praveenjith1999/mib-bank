import { useState, useEffect } from "react";
import {
  Box, TextField, Button, Typography, Paper, MenuItem, Select,
  InputLabel, FormControl
} from "@mui/material";

import axios from "axios";
import Navbar from "./navbar";
import { motion } from "framer-motion";
import article from "../assets/images/article.png";
import { useNavigate } from "react-router-dom";
import { ClassNames } from "@emotion/react";

export default function CreateBankAccount() {
  const [formData, setFormData] = useState({
    user_reference: "",
    name: "",
    address: "",
    mobile_number: "",
    bank_account_number: "",
    ifsc_code: "MIB0010242",
    account_type: ""
  });

  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/MIB/openaccount/createcustomer/")
      .then(res => setCustomers(res.data))
      .catch(err => alert("Error fetching customer list"));
  }, []);

  const handleUserSelect = (e) => {
    const selectedId = e.target.value;
    const selectedCustomer = customers.find(c => c.id === parseInt(selectedId));

    if (selectedCustomer) {
      setFormData({
        user_reference: selectedCustomer.id,
        name: selectedCustomer.name,
        address: selectedCustomer.address,
        mobile_number: selectedCustomer.mobile_number,
        account_type: selectedCustomer.account_type,
        bank_account_number: "",
        ifsc_code: "MIB0010242"
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.user_reference) {
      alert("Please select a customer.");
      return;
    }

    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/MIB/openaccount/createbankaccount/${formData.user_reference}/`
      );

      alert("🎉 Bank Account Created Successfully!");
      navigate("/bankaccountsuccess", {
        state: {
          ...formData,
          bank_account_number: res.data.account_number
        }
      });

    } catch (err) {
      console.error("Error submitting data:", err.response?.data || err.message);
      alert("❌ Error submitting data: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  return (
    < >
      <Navbar />
      <Box   sx={{ p: 4, maxWidth: "1200px", mx: "auto", mt: 5, display: "flex", gap: 5, flexDirection: { xs: "column", md: "row" } }}>
        
        {/* Left Section - Illustration & Description */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ flex: 1 }}
        >
          <img
            src={article}
            alt="Bank illustration"
            style={{ width: "100%", borderRadius: "16px" }}
          />
          <Typography variant="h6" mt={3} color="#37474f" textAlign="center">
            💡 <b>Why Open a Bank Account with Us?</b>
          </Typography>
          <Typography variant="body1" mt={1} color="text.secondary">
            A bank account not only ensures the safety of your money but also empowers you to save, invest, and plan your financial future. MIB Digital Bank provides secure and reliable services with instant mobile alerts, zero balance facilities, and seamless online access to your finances anytime, anywhere.
          </Typography>
        </motion.div>

        {/* Right Section - Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ flex: 1 }}
        >
          <Paper elevation={6} sx={{
            p: 4, borderRadius: 4,
            background: "linear-gradient(135deg, #e3f2fd, #fce4ec)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
          }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ color: "#2e7d32", fontWeight: 'bold' }}>
              Create Bank Account
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal">
                <InputLabel>User Reference (Customer)</InputLabel>
                <Select
                  value={formData.user_reference}
                  onChange={handleUserSelect}
                  label="User Reference (Customer)"
                  required
                >
                  {customers.map((cust) => (
                    <MenuItem key={cust.id} value={cust.id}>
                      {cust.name} - (Aadhar: {cust.adhaar_number})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField label="Name" fullWidth margin="normal" value={formData.name} disabled />
              <TextField label="Address" fullWidth margin="normal" value={formData.address} disabled />
              <TextField label="Mobile Number" fullWidth margin="normal" value={formData.mobile_number} disabled />
              <TextField label="Account Type" fullWidth margin="normal" value={formData.account_type} disabled />
              <TextField label="IFSC Code" fullWidth margin="normal" value={formData.ifsc_code} disabled />

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 3,
                    backgroundColor: "#2e7d32",
                    "&:hover": {
                      backgroundColor: "#1b5e20"
                    },
                    fontWeight: "bold",
                    fontSize: "16px"
                  }}
                >
                  Submit
                </Button>
              </motion.div>
            </Box>
          </Paper>
        </motion.div>
      </Box>
    </>
  );
}
