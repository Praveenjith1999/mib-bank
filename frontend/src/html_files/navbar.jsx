import '../css/navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo-.png';

export default function Navbar() {
  // Navigation menu items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashbord', path: '/mibdashboard' },
    { name: 'About', path: '/aboutmib' },
    { name: 'Contact', path: '/contact' },
    { name: 'Help', path: '/help' }
  ];

  return (
    <>
      {/* Navbar */}
      <motion.nav
        className="navbar d-flex justify-content-between align-items-center px-4 py-2 bg-light "
        style={{
          background: "linear-gradient(90deg,rgb(95, 145, 219), #1976d2)",
          color: "white",
        
         
        }}
      
       
        transition={{ duration: 0.6 }}
      >
        {/* Logo + Bank Name */}
        <div className="d-flex align-items-center">
          <img
            src={logo}
            alt="MIB Logo"
            style={{ width: 50, height: 50, marginRight: 12 }}
          />
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 'bold',
              color: '#fff',
            }}
          >
            <h1 style={{ fontFamily: 'sans-serif', fontWeight: 'bold', color: '#fff' }}>
              MIB Bank
            </h1>
          </Typography>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links d-flex gap-4 m-0 list-unstyled">
          {navItems.map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.15, y: -2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link
                to={item.path}
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  transition: 'all 0.3s ease',
                }}
              >
                {item.name}
              </Link>
            </motion.li>
          ))}
        </ul>
      </motion.nav>

      {/* Banner Section */}
      <div className="container mt-5 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h4"
            align="center"
            className="text-primary mb-3"
            sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
          >
            Welcome to the Future of Digital Banking
          </Typography>

          {/* Scrolling Welcome Banner */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
            className="bg-warning p-3 rounded shadow-sm text-center"
          >
            <Typography
              variant="body1"
              sx={{ fontSize: '1rem', fontWeight: 500, fontFamily: 'Poppins, sans-serif' }}
            >
              🚀 Welcome to <span style={{ color: 'red' }}>MIB Bank</span> – India's No.1 Digital Bank.
              Deposit and withdraw anytime, anywhere. Toll-Free: <strong>1800-5547-3652</strong>
            </Typography>
          </motion.div>
        </motion.div>
      </div>
      <br />
    </>
  );
}
