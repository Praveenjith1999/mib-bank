import React, { useState, useEffect } from "react";
import {
  Card, CardContent, Typography, Button, Box, Grid, Paper
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "./navbar";
import { useParams } from "react-router-dom";

export default function CustomerDetailsViewer() {
  const { id } = useParams(); 
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/MIB/openaccount/createcustomer/${id}/`)
      .then(res => setCustomer(res.data))
      .catch(err => console.error("Error loading customer data", err));
  }, [id]);

  return (
    <>
      <Navbar />
      <Box className="container mt-4 bg-light">
        <Typography variant="h4" align="center" gutterBottom>
          Customer Details
        </Typography>

        {/* If customer data is available, show details */}
        {customer ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card elevation={6} sx={{ mt: 5, backgroundColor: "#e3f2fd", p: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Customer Details
                </Typography>
                <Grid container spacing={2}>
                  {[
                    ["Name", customer.name],
                    ["Age", customer.age],
                    ["Date of Birth", customer.date_of_birth],
                    ["Gender", customer.gender],
                    ["Mobile Number", customer.mobile_number],
                    ["Email", customer.email],
                    ["Address", customer.address],
                    ["District", customer.district],
                    ["State", customer.state],
                    ["PAN Number", customer.pan_number],
                    ["Aadhaar Number", customer.adhaar_number],
                    ["Nominee Name", customer.nominee_name],
                    ["Nominee Relation", customer.nominee_relation],
                    ["Nominee Aadhaar Number", customer.nominee_aadhar_number],
                    ["Account Type", customer.account_type],
                  ].map(([label, value]) => (
                    <Grid item xs={12} sm={6} key={label}>
                      <Typography variant="body1">
                        <strong>{label}:</strong> {value || "N/A"}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <Typography variant="body1" align="center" sx={{ mt: 4 }}>
            Loading customer data...
          </Typography>
        )}
      </Box>
    </>
  );
}
