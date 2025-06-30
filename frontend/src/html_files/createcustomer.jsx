import {
  Box, Button, Checkbox, FormControl, FormControlLabel,
  InputLabel, MenuItem, Select, TextField, Typography
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import '../css/createcustomer.css';
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function CreateCustomer() {
  const [formData, setFormData] = useState({
    name: "", age: "", date_of_birth: "", gender: "",
    mobile_number: "", email: "", address: "", state: "", district: "",
    pan_number: "", adhaar_number: "", nominee_name: "", nominee_relation: "",
    nominee_aadhar_number: "", account_type: "", aggre: false
  });
  const navigate = useNavigate();

  const genderOptions = ["Male", "Female"];
  const stateOptions = [
    "Tamil nadu", "Kerala", "Andra pradesh", "Telengana", "Karnataka", "Pondichery"
  ];
  const districtOptions = [
    "Madurai", "Sivagangi", "Melur", "Coimbatore", "Chennai",
    "Erode", "Salem", "Nilagiri", "Ramanathapuram", "Jaffana"
  ];
  const relationOptions = [
    "Mother", "Father", "Wife", "Husbend", "Blood-brother",
    "Blood-sister", "Relation", "others"
  ];
  const accountTypeOptions = [
    "Saving Account", "Current Account", "Salary Account",
    "NRI Account", "NRE Account", "Employee Account"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.aggre) {
      alert("❗ You must agree to continue.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/MIB/openaccount/createcustomer/", formData);
      alert("✅ Customer registered successfully!");

      // Reset form
      setFormData({
        name: "", age: "", date_of_birth: "", gender: "",
        mobile_number: "", email: "", address: "", state: "", district: "",
        pan_number: "", adhaar_number: "", nominee_name: "", nominee_relation: "",
        nominee_aadhar_number: "", account_type: "", aggre: false
      
      })
      navigate('/createbankaccount');
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("❌ Registration failed.");
    }
  };

  return (
    <>
      <Navbar />
      <Box className="registration-page bg-light">
        <Box className="registration-form">
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "green" }}>
            Account Opening Registration Form
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* Basic Fields */}
            {[
              { label: "Name", name: "name" },
              { label: "Age", name: "age", type: "number" },
              { label: "Date of Birth", name: "date_of_birth", type: "date" },
              { label: "Mobile Number", name: "mobile_number" },
              { label: "Email", name: "email", type: "email" },
              { label: "Address", name: "address" },
              { label: "PAN Number", name: "pan_number" },
              { label: "Aadhar Number", name: "adhaar_number" },
              { label: "Nominee Name", name: "nominee_name" },
              { label: "Nominee Aadhar", name: "nominee_aadhar_number" },
            ].map(({ label, name, type = "text" }) => (
              <TextField
                key={name}
                label={label}
                name={name}
                type={type}
                fullWidth
                value={formData[name]}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            ))}

            {/* Dropdowns */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Gender</InputLabel>
              <Select name="gender" value={formData.gender} onChange={handleChange}>
                {genderOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>State</InputLabel>
              <Select name="state" value={formData.state} onChange={handleChange}>
                {stateOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>District</InputLabel>
              <Select name="distric" value={formData.district} onChange={handleChange}>
                {districtOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Nominee Relation</InputLabel>
              <Select name="nominee_relation" value={formData.nominee_relation} onChange={handleChange}>
                {relationOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Account Type</InputLabel>
              <Select name="account_type" value={formData.account_type} onChange={handleChange}>
                {accountTypeOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Agreement Checkbox */}
            <FormControlLabel
              control={<Checkbox checked={formData.aggre} onChange={handleChange} name="aggre" />}
              label="I agree to the terms and conditions"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, fontWeight: "bold" }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Box>

      <br /><br />
       <Link className="text-center d-flex justify-content-center" to="/allcustomer" style={{ textDecoration: 'none' }}>
                      <Button variant="contained" color="success" className="px-4">View all Customer</Button>
                    </Link>
    </>
  );
}
