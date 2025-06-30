import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Typography,
  Skeleton
} from "@mui/material";
import axios from "axios";
import Navbar from "./navbar";
import { Link } from "react-router-dom";  // ✅ Correct import

export default function AllBankCustomer() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    setLoading(true);
    axios.get(`http://127.0.0.1:8000/MIB/openaccount/createbankaccount/`)
      .then(res => {
        setCustomers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch customers", err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      axios.delete(`http://127.0.0.1:8000/MIB/openaccount/createbankaccount/${id}/`)
        .then(() => {
          setCustomers(customers.filter(customer => customer.id !== id));
        })
        .catch(err => console.error("Failed to delete customer", err));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4 bg-light">
        <Typography variant="h4" align="center" gutterBottom>
          All Bank Customers
        </Typography>

        <TableContainer component={Paper} elevation={4}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>ID</TableCell>
                <TableCell sx={{ color: "#fff" }}>Name</TableCell>
                <TableCell sx={{ color: "#fff" }}>User reference ID</TableCell>
                <TableCell sx={{ color: "#fff" }}>Account No.</TableCell>
                <TableCell sx={{ color: "#fff" }}>Address</TableCell>
                <TableCell sx={{ color: "#fff" }}>Account Open date</TableCell>
                <TableCell sx={{ color: "#fff" }}>Acc.Type.</TableCell>
                <TableCell sx={{ color: "#fff" }}>Mobile No.</TableCell>
                <TableCell sx={{ color: "#fff" }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      {Array.from({ length: 9 }).map((__, i) => (
                        <TableCell key={i}>
                          <Skeleton variant="text" width="100%" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>{customer.id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.user_reference}</TableCell>
                      <TableCell>{customer.bank_account_number}</TableCell>
                      <TableCell>{customer.address}</TableCell>
                      <TableCell>{customer.account_oppening_date}</TableCell>
                      <TableCell>{customer.account_type}</TableCell>
                      <TableCell>{customer.mobile_number}</TableCell>
                      <TableCell align="center">
                        <Link to={`/CustomerDetailsViewer/${customer.user_reference}`} style={{ textDecoration: 'none' }}>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            style={{ marginRight: '8px' }}
                          >
                            View More
                          </Button>
                        </Link>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleDelete(customer.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
