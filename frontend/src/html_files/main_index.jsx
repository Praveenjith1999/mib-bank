import '../css/mainindex.css';
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grow, Paper, TextField, Button, Typography, Fade } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import maunui from '../assets/images/main-ui-img.jpg'
import Footer from './footer';
import banner5 from '../assets/images/banner5.avif'
import banner6 from '../assets/images/banner6.avif'
import banner7 from '../assets/images/banner7.avif'
import banner8 from '../assets/images/banner8.avif'
import banner9 from '../assets/images/banner9.avif'


export default function MainCotent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  let[error, setError] = useState(false);
    const dos = [
    "Always verify account number before sending money.",
    "Keep your passbook and account details confidential.",
    "Change your online banking passwords regularly.",
    "Notify the bank immediately in case of a lost card.",
    "Use strong passwords for digital banking platforms."
  ];

  const donts = [
    "Don’t share your OTP or PIN with anyone.",
    "Don’t click on suspicious links from unknown sources.",
    "Don’t write your passwords down in visible places.",
    "Don’t ignore SMS or email alerts from your bank.",
    "Don’t use public Wi-Fi for banking transactions."
  ];

  useEffect(() => {
    setChecked(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/MIB/login/', {
        username,
        password,
      });

      if (response.status === 200) {
       
        setError(false)
        navigate("/mibdashboard");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setError(true);
       
      } else {
       
        console.error(error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Fade in={checked} timeout={800}>
        <div className="container-fluid py-4 bg-light min-vh-100 d-flex flex-column align-items-center">
          <marquee className="text-success fw-bold my-2">
            Welcome to <span className="text-danger">MIB Bank</span> – India’s No. 1 Digital Bank. Access your account anytime, anywhere. Toll-Free: 1800-5547-3652
          </marquee>

          <Grow in={checked} timeout={1000}>
            <div className="row w-100 justify-content-center align-items-center">
              <div className="col-md-6 d-none d-md-block mainui">
                <img style={{ borderRadius: "25px"}} src={maunui} alt="Login Illustration" />
              </div>
              <div className="col-md-6 d-md-none">
                <img
                  src={maunui}
                  alt="Login Illustration"
                  className="img-fluid p-3"
                />
              </div>

              <div className="col-md-4">
                <Paper elevation={6} className="p-4 rounded-4 shadow">
                  <Typography variant="h5" className="text-center text-primary fw-bold mb-3">
                    <LoginIcon fontSize="large" /> User Login
                  </Typography>

                  <form onSubmit={handleLogin}>
                    <TextField
                      label="Username"
                      fullWidth
                      margin="normal"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <TextField
                      label="Password"
                      type="password"
                      fullWidth
                      margin="normal"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <div className="d-grid mt-4">
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{ borderRadius: "25px" }}
                      >
                        Login
                      </Button>
                    </div>
                   
                    <p style={{color: "red"}}>{error? "*Invalid username or password":""}</p>
                  </form>

                 
                </Paper>
              </div>
            </div>
          </Grow>
        </div>
     
      </Fade> 

        <div className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-4" style={{ fontFamily: "serif", color: "#2c3e50" }}>
           <h1 className='text-success text-center'> 💡 Bank Features – Do’s and Don’ts</h1>
        </h2>

        <Row>
          <Col md={6}>
            <h4 className="text-success">✅ Do’s</h4>
            <ul className="list-group list-group-flush">
              {dos.map((item, index) => (
                <li key={index} className="list-group-item bg-light">
                  {item}
                </li>
              ))}
            </ul>
          </Col>

          <Col md={6}>
            <h4 className="text-danger">🚫 Don’ts</h4>
            <ul className="list-group list-group-flush">
              {donts.map((item, index) => (
                <li key={index} className="list-group-item bg-light">
                  {item}
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
     



<div id="myCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">

  <div class="carousel-indicators ">
    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active"></button>
    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1"></button>
    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2"></button>
    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="3"></button>
    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="4"></button>
  </div>


  <div class="carousel-inner  carousel slide" data-bs-ride="carousel" data-bs-interval="6000">
    <div class="carousel-item active text-center">
      <img src={banner5} style={{height:'350px',width:'95%'}} />
    </div>
    <div class="carousel-item">
      <img src={banner6} />
    </div>
    <div class="carousel-item">
      <img src={banner7}/>
    </div>
    <div class="carousel-item">
      <img src={banner8}/>
    </div>
    <div class="carousel-item">
      <img src={banner9} />
    </div>
  </div>


  <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon"></span>
  </button>
</div>

      <Footer/>
    </>
  );
}
