import { Card, CardContent, Divider, Slide, Typography, Button } from "@mui/material";
import Navbar from "./navbar";
import { motion } from 'framer-motion';
import { Box } from "@mui/system";
import { useState, useEffect } from "react"
import DeleteIcon from '@mui/icons-material/Delete';



import 'bootstrap/dist/css/bootstrap.min.css';

import axios from "axios";
import Field from "./Fields.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";
import Footer from "./footer.jsx";







export default function ViewEmployeeById() {
    let { id } = useParams();
    let [data, setData] = useState([]);
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

    const handleDeleteClick = (id) => {
        setSelectedEmployeeId(id);
        setShowPopup(true);
    };

    const confirmDelete = () => {
        DeleteEmployee(selectedEmployeeId); // your delete function
        setShowPopup(false);
    };

    const cancelDelete = () => {
        setShowPopup(false);
        setSelectedEmployeeId(null);
    };

    useEffect(() => {



        let fetchData = async () => {
            try {
                const result = await axios.get(`http://127.0.0.1:8000/MIB/registeremployee/${id}`);
                setData(Array.isArray(result.data) ? result.data : [result.data]);
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };
        if (id) fetchData();
    }, [id]);


    async function DeleteEmployee(id) {
        await axios.delete(`http://127.0.0.1:8000/MIB/registeremployee/${id}/`);
        alert("Employee deleted successfully");
        navigate("/allemployees");
    }














    return (
        <>
            <Navbar />

            <div className="mt-5 pt-4 container">
                
            </div>
            <div className="w-100 d-flex justify-content-center align-items-center bg-light">
                <Slide in timeout={100} direction="up">
                    <Box className="container">
                        {data.map((employee) => (
                            <Card elevation={3} className="shadow-sm" key={employee.id}>
                                <CardContent className="p-4">
                                    {/* Header */}
                                    <Typography variant="h3" align="center" className="text-primary mb-1">
                                        {employee.name}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        align="center"
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        <span><h1>Designation :{employee.designation}</h1></span>
                                    </Typography>

                                    <Divider className="mb-4" />

                                    <div className="row">
                                        <div className="col-md-6">
                                            <Field label="Employee ID" value={employee.emp_id} />
                                            <Field label="Employee Name" value={employee.emp_name} />
                                            <Field label="Gender" value={employee.gender} />
                                            <Field label="E-mail" value={employee.email} />
                                            <Field label="Mobile No." value={employee.phone} />
                                            <Field label="Age" value={employee.age} />
                                            <Field label="Qualification" value={employee.qualification} />
                                            <Field label="Designation" value={employee.designation} />
                                            <Field label="Address" value={employee.address} />
                                            <Field label="City" value={employee.city} />
                                        </div>
                                        <div className="col-md-6">
                                            <Field label="Branch" value={employee.branch} />
                                            <Field label="Joining Date" value={employee.joining_date} />
                                            <Field label="PF Number" value={employee.pf_number} />
                                            <Field label="Aadhaar Number" value={employee.aadhaar_number} />
                                            <Field label="PAN Number" value={employee.pan_number} />
                                            <Field label="Bank Name" value={employee.bank_name} />
                                            <Field label="Bank A/C No." value={employee.bank_account_number} />
                                            <Field label="IFSC Code" value={employee.ifsc_code} />
                                            <Field label="Bank Branch" value={employee.bank_branch} />
                                        </div>

                                        <div className="d-flex justify-content-center ">
                                            <Button  variant="outlined" className="bg-primary"  >
                                                <Link  style={{ textDecoration: 'none', color: 'white' }} to={`/updateemployee/${employee.id}`} onClick={(() => (employee.id, employee))}  >Edit</Link>
                                            </Button>
                                            <Button startIcon={<DeleteIcon style={{color:"white"}} />} variant="outlined" className="bg-danger mx-5">
                                                <span
                                                    style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}
                                                    onClick={() => handleDeleteClick(employee.id)}
                                                >
                                                    Delete Employee
                                                </span>
                                            </Button>

                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Slide>
            </div>
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button className="popup-close" onClick={cancelDelete}>× </button>
                        <h4>Confirm Delete</h4>
                        <p>Are you sure you want to delete this employee?</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <Button variant="contained" color="error" onClick={confirmDelete}>
                                Yes, Delete
                            </Button>
                            <Button variant="outlined" onClick={cancelDelete}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

<Footer/>

        </>
    );
}
