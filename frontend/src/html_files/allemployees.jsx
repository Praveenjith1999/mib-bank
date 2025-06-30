import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button'

import {
  
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from './navbar';
import { Link } from 'react-router-dom';


export default function AllEmployees() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/MIB/registeremployee/");
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch employee data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  

  return (
    <>
      <Navbar />
      <div className="mt-5 pt-4 container bg-light">
        

        {/* Loading State */}
        {loading && (
          <div className="text-center mt-5">
            <CircularProgress />
            <Typography variant="body1" className="mt-2">Loading...</Typography>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="alert alert-danger text-center mt-3">{error}</div>
        )}

        {/* Employee Table */}
        {!loading && !error && (
          <TableContainer component={Paper} className="shadow-sm" style={{width: '100%', margin: '0 auto'}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Employee Name</strong></TableCell>
                  <TableCell><strong>Employee ID</strong></TableCell>
                  <TableCell><strong>Designation</strong></TableCell>
                  <TableCell><strong>Branch</strong></TableCell>
                  <TableCell><strong>Joining Date</strong></TableCell>
                  <TableCell><strong>Phone</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Address</strong></TableCell>
                  <TableCell><strong>More Details</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.emp_name}</TableCell>
                    <TableCell>{item.emp_id}</TableCell>
                    <TableCell>{item.designation}</TableCell>
                    <TableCell>{item.branch}</TableCell>
                    <TableCell>{item.joining_date}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell><Button variant="contained"><Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/viewemployeebyid/${item.id}`}>View Full Details</Link></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  );
}
