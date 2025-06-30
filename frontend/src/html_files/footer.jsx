import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CopyrightIcon from "@mui/icons-material/Copyright";

export default function Footer() {
  return (
    <Box
      component={motion.footer}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      sx={{
        background: "linear-gradient(to right, #001f3f, #003366)",
        color: "#fff",
        px: { xs: 2, md: 6 },
        py: 4,
        fontFamily: "'Poppins', sans-serif",
        mt: 8
      }}
    >
      {/* Intro Article */}
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
        🏦 Welcome to MIB Digital Bank
      </Typography>
      <Typography variant="body2" sx={{ maxWidth: 900 }}>
        MIB Bank is built on the vision of providing reliable, secure and innovative financial services. From zero-balance accounts to instant mobile banking, we ensure seamless and accessible banking for every Indian citizen.
      </Typography>

      <Divider sx={{ my: 3, backgroundColor: "#1976d2" }} />

      {/* Horizontal Info Row */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 2,
          mb: 2
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <MailOutlineIcon />
          <Typography variant="body2">info@mibworld.in</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PhoneAndroidIcon />
          <Typography variant="body2">8610908231</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocationOnIcon />
          <Typography variant="body2">Madurai, Tamil Nadu, India</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CopyrightIcon />
          <Typography variant="body2">2025@copyrights mbibank-reserved</Typography> 

          <span className="fw-bold text-successt">RBI-REG-NUM : RBIBK-MIB-2025MIB2232QWEAZ321 </span>
        </Box>
      </Box>
    </Box>
  );
}
