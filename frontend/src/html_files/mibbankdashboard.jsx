import { Button, Grow } from "@mui/material";
import Navbar from "./navbar";
import { Link } from 'react-router-dom';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useState, useEffect } from "react";
import '../css/mainindex.css';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { motion } from "framer-motion";
import depositImg from "../assets/images/depositart.jpg" 
import withdrawImg from "../assets/images/withdraw.jpg";
import fdImg from "../assets/images/fd.jpg";
import Footer from "./footer";
import '../css/mibdashbord.css';
export default function MibBankdashboard() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  const buttons = [
    {
      label: "Register New Bank Employee",
      to: "/registeremployee",
      color: "success",
    },
    {
      label: "Show All Bank Employee",
      to: "/allemployees",
      color: "primary",
    },
    {
      label: "Create New Customer",
      to: "/createcustomer",
      color: "error",
    },
    {
      label: "View All Customers",
      to: "/allcustomer",
      color: "secondary",
    },
    {
      label:"Create New Bank account",
      to: "/createbankaccount",
      color: "warning",
    }
  ];


  
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row g-4 justify-content-center">
          {buttons.map((btn, index) => (
            <div className="col-12 col-md-6" key={btn.to}>
              <Grow in={checked} timeout={500 + index * 200}>
                <Link to={btn.to} style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    color={btn.color}
                    fullWidth
                    className="p-3 d-flex align-items-center justify-content-center gap-2 shadow-sm dashboard-btn"
                    sx={{ borderRadius: 3, fontWeight: 'bold', fontSize: '1rem' }}
                  >
                    <DoubleArrowIcon />
                    {btn.label}
                  </Button>
                </Link>
              </Grow>
            </div>



          ))}
        </div>
      </div><br /><br /><br />

        <div className="d-flex justify-content-center gap-5">
          <Button style={{padding:'20px'}} size='large'   variant="contained" color="success"> {<KeyboardDoubleArrowUpIcon style={{fontWeight :'bold'}} />}
  <Link style={{ color: 'white', textDecoration: 'none'}} to={'/transaction'}> <h3 className="fw-bold">Deposite / Withdraw </h3></Link>
</Button> 
          <Button style={{padding:'20px'}} size='large'   variant="contained" color="error"> {<KeyboardDoubleArrowUpIcon style={{fontWeight :'bold'}} />}
  <Link style={{ color: 'white', textDecoration: 'none'}} to={'/transactionhistory'}> <h3 className="fw-bold">Transaction history</h3></Link>
</Button> 

          
        </div>

            <div className="container py-5">

      {/* Title */}
      <motion.h2
        className="text-center mb-5"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ color: "#2c3e50", fontFamily: "serif" }}
      >
        💰 MIB Bank – Banking Services Overview
      </motion.h2>

      {/* Section: Deposit */}
      <motion.div
        className="row align-items-center mb-5"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="col-md-6">
          <img src={depositImg} alt="Deposit" className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-6">
          <h4>🏦 Money Deposit</h4>
          <p>
            Depositing money into your MIB Bank account is safe, fast, and secure.
            Funds are available immediately for your transactions or savings goals.
          </p>
          <ul>
            <li>No deposit charges</li>
            <li>Instant SMS/email confirmation</li>
            <li>24x7 ATM cash deposit machines available</li>
          </ul>
        </div>
      </motion.div>

      {/* Section: Withdraw */}
      <motion.div
        className="row align-items-center mb-5 flex-md-row-reverse"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="col-md-6">
          <img src={withdrawImg} alt="Withdraw" className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-6">
          <h4>💸 Money Withdrawal</h4>
          <p>
            Withdraw your money anytime using our wide network of ATMs or visit a branch.
            Online transfers (NEFT/IMPS/RTGS) are also available.
          </p>
          <ul>
            <li>Daily limit: ₹50,000 (ATM)</li>
            <li>NEFT/IMPS supported 24x7</li>
            <li>Secure OTP-based authentication</li>
          </ul>
        </div>
      </motion.div>

      {/* Section: Fixed Deposit */}
      <motion.div
        className="row align-items-center mb-5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="col-md-6">
          <img src={fdImg} alt="Fixed Deposit" className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-6">
          <h4>🔐 Fixed Deposit (FD)</h4>
          <p>
            Lock in your money and earn high-interest returns with our flexible FD schemes.
            Choose tenure from 6 months to 10 years.
          </p>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Tenure</th>
                <th>Interest Rate</th>
                <th>Min Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>6 Months</td>
                <td>5.5%</td>
                <td>₹5,000</td>
              </tr>
              <tr>
                <td>1 Year</td>
                <td>6.25%</td>
                <td>₹5,000</td>
              </tr>
              <tr>
                <td>5 Years</td>
                <td>7.1%</td>
                <td>₹10,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Terms & Conditions */}
      <motion.div
        className="mt-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h5 className="text-center text-muted">📜 Terms & Conditions</h5>
        <ul className="text-muted small">
          <li>Interest rates are subject to change as per RBI guidelines.</li>
          <li>Premature withdrawal of FD may reduce the interest rate.</li>
          <li>Maintain minimum balance to avoid penalties.</li>
          <li>Always verify transaction details before confirming.</li>
        </ul>
      </motion.div>

    </div>
    <Footer/>
    </>
  );
}
