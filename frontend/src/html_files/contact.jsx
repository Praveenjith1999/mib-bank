import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FaxIcon from "@mui/icons-material/Print";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Navbar from "./navbar";
import Footer from "./footer";

export default function Contact() {
  const contactItems = [
    {
      icon: <LocationOnIcon fontSize="large" color="error" />,
      title: "Address",
      content: "MIB Bank HQ, 1st Floor, MG Road, Madurai, Tamil Nadu, India - 625001"
    },
    {
      icon: <PhoneIcon fontSize="large" color="success" />,
      title: "Mobile",
      content: "+91 86109 08231"
    },
    {
      icon: <EmailIcon fontSize="large" color="primary" />,
      title: "Email",
      content: "info@mibworld.in"
    },
    {
      icon: <FaxIcon fontSize="large" sx={{ color: "#8e24aa" }} />,
      title: "Fax",
      content: "+91 452 123 4567"
    },
    {
      icon: <ContactMailIcon fontSize="large" sx={{ color: "#ff6f00" }} />,
      title: "Postal",
      content: "P.O. Box 625001, Madurai Branch"
    }
  ];

  return (
    <>
    <Navbar/>
    <Box
      sx={{
        p: 4,
        background: "linear-gradient(to right, #e3f2fd, #fff3e0)",
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif"
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 5,
            color: "#0d47a1",
            fontWeight: "bold",
            textShadow: "1px 1px 1px #bbb"
          }}
        >
          📞 Contact MIB Bank
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        {contactItems.map((item, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Paper
                elevation={6}
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  background: "#ffffff",
                  textAlign: "center",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    backgroundColor: "#e3f2fd"
                  }
                }}
              >
                <Box sx={{ mb: 2 }}>{item.icon}</Box>
                <Typography variant="h6" sx={{ color: "#0d47a1", fontWeight: "bold" }}>
                  {item.title}
                </Typography>
                <Typography variant="body1" sx={{ color: "#444", mt: 1 }}>
                  {item.content}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
    <Box sx={{ mt: 6 }}>
  <iframe
    title="MIB Bank Location"
    width="100%"
    height="350"
    frameBorder="0"
    style={{ borderRadius: "20px" }}
    src="https://maps.google.com/maps?q=Madurai%20Tamilnadu%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
    allowFullScreen
  ></iframe>
  <Footer/>
</Box>

</>
  );
}
