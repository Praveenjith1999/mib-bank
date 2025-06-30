import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
// Commented out because file not found
// import '../css/setuserpassword.css';

// Replace this import with working component or comment out if unavailable
// import Navbar from "./navbar";

import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

export default function SetUserAndPassword() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    user_reference: "",
    username: "",
    password: "",
    confirm_password: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    fetchEmployees();
    fetchUsers();
  }, []);

  const fetchEmployees = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/MIB/registeremployee/");
      setEmployees(data);
    } catch (err) {
      setError("Unable to load employees");
    }
  };
  const [showTable, setShowTable] = useState(false);

  const handleClick = () => {
    setShowTable(true);
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/MIB/loginlogout/");
      setUsers(data);
    } catch (err) {
      setError("Unable to load users");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      if (editId) {
        await axios.put(`http://127.0.0.1:8000/MIB/loginlogout/${editId}/`, formData);
      } else {
        await axios.post("http://127.0.0.1:8000/MIB/loginlogout/", formData);
      }
      setSuccess(true);
      setFormData({ user_reference: "", username: "", password: "", confirm_password: "" });
      setEditId(null);
      fetchUsers();
    } catch (err) {
      setError("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      user_reference: user.user_reference,
      username: user.username,
      password: "",
      confirm_password: ""
    });
    setEditId(user.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/MIB/loginlogout/${id}/`);
      fetchUsers();
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  return (
    <>

      <Navbar/>
      <div className="container py-5 bg-light">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body">
                <h2 className="text-center text-success mb-4">{editId ? "Edit User" : "Set Username & Password"}</h2>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">Success!</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label>Select Employee</label>
                    <select
                      name="user_reference"
                      className="form-select"
                      value={formData.user_reference}
                      onChange={handleChange}
                      required
                      disabled={!!editId}
                    >
                      <option value="">-- Select Employee --</option>
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>
                          {emp.emp_name} ({emp.emp_id})({emp.designation})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="confirm_password"
                      className="form-control"
                      value={formData.confirm_password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="d-grid">
                    <Button variant="contained" type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? "Saving..." : editId ? "Update" : "Submit"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
<br /><br /><br />

            <Button variant="contained" color="success" onClick={handleClick} disabled={showTable}>
              View Existing user list
            </Button>

            {showTable && (<div className="mt-5">
              <h4 className="text-center">User List</h4>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>
                        <Button variant="outlined" disabled={isDisabled} onClick={() => handleEdit(user)}>Edit</Button>{' '}
                        <Button variant="outlined" color="error" onClick={() => handleDelete(user.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          
            </div>

            )}</div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
