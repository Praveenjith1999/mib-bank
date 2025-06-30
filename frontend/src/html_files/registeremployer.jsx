import {
  Box, Button, FormControl, InputLabel, MenuItem, Paper,
  Select, TextField, Grow
} from "@mui/material";
import Navbar from './navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import '../css/registeremployee.css';


export default function BankDetails() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [checked, setChecked] = useState(false);

  const [saveuser, setSaveuser] = useState({
    emp_id: "", emp_name: "", gender: "", email: "", phone: "",
    designation: "", age: "", qualification: "", branch: "",
    address: "", city: "", joining_date: "", pf_number: "",
    aadhaar_number: "", pan_number: "", bank_name: "",
    bank_branch: "", bank_account_number: "", ifsc_code: ""
  });

  useEffect(() => {
    setChecked(true);
    if (state?.employee) {
      setSaveuser(state.employee);
    } else if (id) {
      axios.get(`http://127.0.0.1:8000/MIB/registeremployee/${id}/`)
        .then(res => setSaveuser(res.data))
        .catch(err => console.error("Failed to fetch employee", err));
    }
  }, [state, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSaveuser({ ...saveuser, [name]: value });
  };

  const Savedata = async () => {
    try {
      if (id) {
        await axios.put(`http://127.0.0.1:8000/MIB/registeremployee/${id}/`, saveuser);
        alert("Data updated successfully");
      } else {
        await axios.post("http://127.0.0.1:8000/MIB/registeremployee/", saveuser);
        alert("Data saved successfully");
      }
      navigate("/allemployees");
    } catch (err) {
      console.error("Save error:", err);
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        alert("Unknown error occurred.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <Grow in={checked} timeout={600}>
        <div className="container mt-4 mb-5 bg-light">
          <form onSubmit={(e) => { e.preventDefault(); Savedata(); }}>
            <Paper elevation={6} className="p-4 rounded-4 shadow-sm border border-primary-subtle">
              <h2 className="text-center text-primary fw-bold mb-4">
                {id ? "Edit Employer Details" : "Register Employer Details"}
              </h2>
              <div className="row gy-4">
                {/* Left Column */}
                <div className="col-md-6">
                  <TextField fullWidth label="Employee ID" name="emp_id" value={saveuser.emp_id} onChange={handleChange} required />
                  <TextField fullWidth label="Employee Name" name="emp_name" value={saveuser.emp_name} onChange={handleChange} className="mt-3" required />
                  <FormControl fullWidth className="mt-3">
                    <InputLabel>Gender</InputLabel>
                    <Select name="gender" value={saveuser.gender} onChange={handleChange} required>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField fullWidth label="E-mail" type="email" name="email" value={saveuser.email} onChange={handleChange} className="mt-3" required />
                  <TextField fullWidth label="Mobile Number" type="tel" name="phone" value={saveuser.phone} onChange={handleChange} className="mt-3" required />
                  <TextField fullWidth label="Age" type="number" name="age" value={saveuser.age} onChange={handleChange} className="mt-3" required />
                  <FormControl fullWidth className="mt-3">
                    <InputLabel>Designation</InputLabel>
                    <Select name="designation" value={saveuser.designation} onChange={handleChange} required>
                      <MenuItem value="Manager">Manager</MenuItem>
                      <MenuItem value="Asst.Manager">Asst. Manager</MenuItem>
                      <MenuItem value="Accountant">Accountant</MenuItem>
                      <MenuItem value="Cashier">Cashier</MenuItem>
                      <MenuItem value="Loan-Section">Loan Section</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField fullWidth label="Branch Name" name="branch" value={saveuser.branch} onChange={handleChange} className="mt-3" required />
                  <TextField fullWidth label="Address" name="address" value={saveuser.address} onChange={handleChange} className="mt-3" required />
                </div>

                {/* Right Column */}
                <div className="col-md-6">
                  <TextField fullWidth label="Educational Qualification" name="qualification" value={saveuser.qualification} onChange={handleChange} required />
                  <TextField fullWidth label="City" name="city" value={saveuser.city} onChange={handleChange} className="mt-3" required />
                  <TextField fullWidth type="date" label="Joining Date" name="joining_date" value={saveuser.joining_date} onChange={handleChange} className="mt-3" InputLabelProps={{ shrink: true }} required />
                  <TextField fullWidth label="PF Number" name="pf_number" value={saveuser.pf_number} onChange={handleChange} className="mt-3" required />
                  <TextField fullWidth label="Aadhaar Number" name="aadhaar_number" value={saveuser.aadhaar_number} onChange={handleChange} className="mt-3" required />
                  <TextField fullWidth label="PAN Number" name="pan_number" value={saveuser.pan_number} onChange={handleChange} className="mt-3" required />
                  <TextField fullWidth label="Bank Name" name="bank_name" value={saveuser.bank_name} onChange={handleChange} className="mt-3" required />
                  <TextField fullWidth label="Bank A/C No." name="bank_account_number" value={saveuser.bank_account_number} onChange={handleChange} className="mt-3" required />
                  <TextField fullWidth label="IFSC Code" name="ifsc_code" value={saveuser.ifsc_code} onChange={handleChange} className="mt-3" required />
                  <TextField fullWidth label="Bank Branch" name="bank_branch" value={saveuser.bank_branch} onChange={handleChange} className="mt-3" required />
                </div>
              </div>

              <div className="text-center mt-4">
                <Button type="submit" variant="contained" color="primary" size="large" className="px-4">
                  {id ? "Update" : "Register"}
                </Button>
              </div>
            </Paper>

            {/* Navigation Buttons */}
            <div className="d-flex justify-content-around mt-4 flex-wrap gap-3">
              <Link to="/allemployees" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="success" className="px-4">View All Employees</Button>
              </Link>
              <Link to="/setuserandpassword" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="error" className="px-4">Set User ID & Password</Button>
              </Link>
            </div>
          </form>
        </div>
      </Grow>
     
    </>
  );
}
