
import './App.css'
import MainCotent from './/html_files/main_index.jsx';
import { BrowserRouter, Route,Routes } from 'react-router-dom';

import AllEmployees from './html_files/allemployees.jsx';
import ViewEmployeeById from './html_files/viewemployeebyid.jsx';
import BankDetails from './html_files/registeremployer.jsx';
import SetUserAndPassword from './html_files/setuserandpassword.jsx';

import MibBankdashboard from './html_files/mibbankdashboard.jsx';
import CreateCustomer from './html_files/createcustomer.jsx';
import AllBankCustomer from './html_files/allbankcustomer.jsx';
import CreateBankAccount from './html_files/createbankaccount.jsx';
import AccountSuccessCard from './html_files/bankaccountsuccess.jsx';
import CustomerDetailsViewer from './html_files/viewmorecustomer.jsx';

import TransactionForm from './html_files/transaction.jsx';
import TransactionsHistory from './html_files/transactionshistory.jsx';
import DownloadPdfButton from './html_files/txnstatementpdf.jsx';
import AboutMIBBank from './html_files/about.jsx';
import Contact from './html_files/contact.jsx';
import Help from './html_files/help.jsx';



function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainCotent />} />
          <Route path="/registeremployee" element={<BankDetails />} />
          <Route path="/allemployees" element={<AllEmployees />} />
          <Route path="/updateemployee/:id" element={<BankDetails />} />
          <Route path="/viewemployeebyid/:id" element={<ViewEmployeeById />} />
          <Route path="/setuserandpassword" element={<SetUserAndPassword/>} />
          <Route path="/setuserandpassword/:id" element={<SetUserAndPassword/>} />
          <Route path="/mibdashboard" element={<MibBankdashboard/>} />
          <Route path="/createcustomer" element={<CreateCustomer/>} />
          <Route path="/allcustomer" element={<AllBankCustomer/>} />
          <Route path="/createbankaccount" element={<CreateBankAccount/>} />
          <Route path="/bankaccountsuccess" element={<AccountSuccessCard/>} />
          <Route path="/CustomerDetailsViewer/:id" element={<CustomerDetailsViewer/>} />
          <Route path="/transaction" element={<TransactionForm/>} />
          <Route path="/transactionhistory" element={<TransactionsHistory/>} />
          <Route path="/txnpdf" element={<DownloadPdfButton/>} />
          <Route path="/aboutmib" element={<AboutMIBBank/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/help" element={<Help/>} />
          

          
        </Routes>

   </BrowserRouter>

   

  </>
  )
}

export default App
