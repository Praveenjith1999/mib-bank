import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { motion } from "framer-motion";
import helpImage from "../assets/images/help.jpg"; 
import Navbar from "./navbar";
import Footer from "./footer";

export default function Help() {
  const faqs = [
    {
      question: "📘 I lost my passbook. What should I do?",
      answer: "Visit your branch with ID proof. A duplicate passbook will be issued after verification and a nominal fee."
    },
    {
      question: "📱 I changed/lost my mobile number. How to update it?",
      answer: "Submit a mobile update form at your nearest branch along with ID and address proof."
    },
    {
      question: "💼 I need advice on Fixed Deposits.",
      answer: "Visit our FD Advisory Desk or call 1800-8745-9854. We help you choose the best plan based on your income, goals, and duration."
    },
    {
      question: "💰 My deposit hasn’t reflected. What now?",
      answer: "Sometimes delays occur. If your transaction isn’t visible in 24 hours, contact support with reference number and timestamp."
    },
    {
      question: "🏧 I couldn't withdraw money. What are the reasons?",
      answer: "Check for sufficient balance, maintenance windows, or card expiration. Call 1800-XXX-XXX for instant support."
    },
    {
      question: "🛠️ I'm facing maintenance or app issues.",
      answer: "Clear cache, update the app, or try logging out and in. If it persists, report at mibsupport@mibworld.in."
    },
    {
      question: "🏦 I'm unhappy with bank service. What to do?",
      answer: "Register a complaint online or in-branch. Escalations are reviewed by the Grievance Officer within 5 days."
    },
    {
      question: "🕵️ Money is missing from my account!",
      answer: "Immediately freeze your account via mobile app or helpline. File a police complaint and notify your branch for investigation."
    }
  ];

  return (
    <>
    <Navbar/>
    <Box sx={{ p: 4, background: "linear-gradient(to right, #fff3e0, #e3f2fd)", minHeight: "100vh", fontFamily: "Poppins, sans-serif" }}>
   
      <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Typography variant="h3" align="center" sx={{ fontWeight: "bold", color: "#0d47a1", mb: 3 }}>
          🆘 Help & FAQ - MIB Bank
        </Typography>
        <Typography variant="h6" align="center" sx={{ color: "#555", mb: 4 }}>
          Common problems and their quick solutions.
        </Typography>
      </motion.div>


      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img src={helpImage} alt="Help Center" style={{ width: "500px", borderRadius: "20px", marginBottom: "30px", display:'flex',justifyContent:'center',alignItems:'center'}} />
      </motion.div>


      <Grid container spacing={3}>
        {faqs.map((faq, index) => (
          <Grid item xs={12} md={6} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Accordion sx={{ borderRadius: "15px", backgroundColor: "#fff" }}>
                <AccordionSummary expandIcon={<ExpandMore />} sx={{ backgroundColor: "#bbdefb" }}>
                  <Typography sx={{ fontWeight: "bold" }}>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Table of Support Channels */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" sx={{ mb: 2, color: "#0d47a1" }}>📞 Support Channels</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1e88e5" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>Support Type</TableCell>
                <TableCell sx={{ color: "#fff" }}>Contact Details</TableCell>
                <TableCell sx={{ color: "#fff" }}>Timings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                ["Customer Care", "1800-123-4567", "24x7"],
                ["Email Support", "support@mibworld.in", "9AM - 6PM"],
                ["Branch Helpdesk", "Visit any nearby branch", "Bank Working Hours"],
                ["SMS Support", "Send 'HELP' to 56161", "Instant Response"],
                ["WhatsApp Chat", "+91-8610908231", "24x7 Auto Assistant"]
              ].map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row[0]}</TableCell>
                  <TableCell>{row[1]}</TableCell>
                  <TableCell>{row[2]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
    <Footer/>
    </>
  );
}
