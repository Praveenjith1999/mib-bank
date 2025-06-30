import React from "react";
import { motion } from "framer-motion";
import { Box, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import bannerImg from "../assets/images/banner7.avif";
import trustImg from "../assets/images/trustimg.jpg";
import missionImg from "../assets/images/mission.jpg";
import bankInterior from "../assets/images/banner9.avif";
import Footer from "./footer";
import Navbar from "./navbar";

const AboutMIBBank = () => {
  return (
    <>
    <Navbar/>
    <Box sx={{ p: 4, backgroundColor: "#f7f9fc", fontFamily: "'Poppins', sans-serif" }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={bannerImg} alt="MIB Bank Banner" style={{ width: "100%", borderRadius: "20px", height:'200px' }} />
        <Typography variant="h3" sx={{ mb: 3, color: "#1a237e", fontWeight: "bold" }} align="center">
          Welcome to MIB Bank
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "18px", color: "#333" }}>
          At MIB Bank, we believe in innovation, inclusivity, and integrity. Our journey began with a single vision — to build a better financial future for every Indian. With over a decade of experience, cutting-edge technology, and customer-first service, we’re proud to serve millions across the nation.
        </Typography>
      </motion.div>

      {/* Mission and Values Section */}
      <Grid container spacing={4} sx={{ mt: 5 }}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src={missionImg} alt="Mission" style={{ width: "100%", borderRadius: "15px" }} />
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h4" sx={{ mb: 2, color: "#0d47a1" }}>
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "17px", color: "#444" }}>
              MIB Bank strives to deliver modern banking solutions while upholding traditional values. Our mission is to empower individuals and businesses through smart, secure, and accessible financial services.
              <br /><br />
              We focus on:
              <ul>
                <li>Customer-centric services</li>
                <li>Technological excellence</li>
                <li>Ethical banking</li>
              </ul>
            </Typography>
          </motion.div>
        </Grid>
      </Grid>

      {/* Key Features Table */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" sx={{ mb: 2, color: "#0d47a1" }}>
          Our Key Features
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1e88e5" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>Feature</TableCell>
                <TableCell sx={{ color: "#fff" }}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                ["24/7 Digital Banking", "Access your accounts anytime, anywhere with our secure app."],
                ["Nationwide Branches", "More than 200 branches across India for in-person service."],
                ["Loan & Credit Facilities", "Tailored personal, education, and business loans with flexible EMIs."],
                ["Secure Online Banking", "Two-factor authentication and fraud monitoring 24/7."],
              ].map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row[0]}</TableCell>
                  <TableCell>{row[1]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Trust and Security */}
      <Grid container spacing={4} sx={{ mt: 6 }}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h4" sx={{ mb: 2, color: "#0d47a1" }}>
              Trust & Transparency
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "17px" }}>
              We value the trust you place in us. That’s why we’re transparent in all our operations — from transaction tracking to interest calculations.
              <br /><br />
              Security is our top priority, with end-to-end encryption, AI-based fraud detection, and continuous audits.
            </Typography>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src={trustImg} alt="Trust" style={{ width: "100%", borderRadius: "15px" }} />
        </Grid>
      </Grid>

      {/* Marquee Section */}
      <Box sx={{ my: 5 }}>
        <marquee behavior="scroll" direction="left" scrollamount="8" style={{ fontSize: "20px", color: "#1a237e", fontWeight: "bold" }}>
          💰 Deposit | 🏦 Fixed Deposit | 🔄 Withdraw | 📈 Financial Planning | 📱 UPI Payments | 🌐 Net Banking | 👩‍💼 Relationship Manager Support
        </marquee>
      </Box>

      {/* Additional Bank Interior Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img src={bankInterior} alt="Bank Interior" style={{ width: "98%", borderRadius: "15px", marginBottom: "20px",  height: '300px'}} />
      </motion.div>

      {/* Placeholder for Huge Text Content */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1" sx={{ fontSize: "16px", color: "#444", lineHeight: "1.8" }}>
          {/* Use a large lorem ipsum generator or manually add 50,000 words here in paragraphs */}
          {Array.from({ length: 1 }).map((_, i) => (
            <p key={i}>
              MIB Bank is committed to transforming the financial ecosystem of India by bringing forward technology-driven services, personalized banking experiences, and community-focused initiatives.
              Our teams work relentlessly to ensure every customer — from rural to urban — receives the respect, trust, and reliability they deserve from a modern banking partner.

              <br />Assumptions on the oil price
Forecasting where it will be in a day or week, let alone in a month or a year, is difficult. But economic forecasts underlying monetary policy decisions need to incorporate some view. The Reserve Bank generally assumes the oil price stays at its current level in the short term. It then uses the price in forward contracts as a basis for its forecasts beyond that.

A sustained jump in oil prices would have posed quite a dilemma for the Reserve Bank.

Generally a shock that adds to inflation would lead to the bank raising interest rates. In contrast, a shock that weakens economic activity would lead to the Bank lowering rates.

But a surge in oil prices would likely both increase inflation (by pushing up petrol prices) and weaken activity (by disrupting world trade and eroding consumers’ purchasing power).

If the oil price surge was expected to be short-lived, it is unlikely to get baked into inflationary expectations. The bank would then probably disregard it. But assessing the longevity of disruptions to the global oil market is not easy.

Monthly inflation drops to 2.1%
On Wednesday, the monthly consumer price index (CPI) fell to 2.1% in May from 2.4% in April. This is the equal lowest level since March 2001.

But the monthly reading will probably not impress RBA Governor Michele Bullock. In her most recent press conference, she commented that “we get four readings on inflation a year”, referring to the quarterly inflation reports. She was dismissive of what she termed “the monthly indicator which is very volatile”.

In taking its decisions, the bank often relies on an underlying inflation measure called the “trimmed mean”. This excludes items with the largest price movements up or down, so it removes petrol prices when they move by large amounts. This measure was 2.4% in the monthly report.

Petrol prices are also a significant contributor to the volatility of the monthly CPI.

Further cuts are likely
Both headline and underlying inflation are now within the central bank’s 2–3% target range. In its most recent outlook, the Reserve Bank forecast underlying inflation would remain in the target band, even if it made another two cuts in rates this year.

So a further interest rate cut remains likely. If it doesn’t cut in July, the bank could wait for the next quarterly inflation report on July 30, and then cut at the August 12 meeting.

Treasurer Jim Chalmers described the global economy as being “in a pretty dangerous place right now”.

“There’s a lot of volatility, unpredictability, uncertainty in the global economy,” he said. That is one thing that is not uncertain.

Oil
Economy
Reserve Bank of Australia
Inflation
Interest rates
Iran
Crude oil
Oil price
Iran nuclear deal
Consumer price index (CPI)
Before you go …
90,000 experts have written for The Conversation. Because our only agenda is to rebuild trust and serve the public by making knowledge available to everyone rather than a select few.

Now, you can receive a curated list of articles in your inbox twice a week. Give it a go?

Get our newsletter

Avatar
Jo Adetunji
Editor, The Conversation UK
Events
More events
Jobs

Head of School of Communication

Professor – Director Northern Institute

Laboratory Head (multiple positions)

Academic Lead, Educational Programs
More jobs
Editorial Policies
Community standards
Republishing guidelines
Analytics
Our feeds
Get newsletter
Who we are
Our charter
Our team
Partners and funders
Resource for media
Contact us
​
​
​
​
Privacy policy
Terms and conditions
Corrections
Copyright © 2010–2025, The Conversation
            </p>
          ))}
        </Typography>
      </Box>
    </Box>
    <Footer/>
    </>
  );
};

export default AboutMIBBank;
