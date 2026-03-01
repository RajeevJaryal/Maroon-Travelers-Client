import './App.css'
import { Routes, Route } from "react-router-dom";

import HeaderSection from './components/header/headerSection'
import ShowingListing from './components/showingData/showingListing'
import HotelDetails from './components/detailsSection/HotelDetails';
import AuthPage from './components/login/AuthPage';
import OrderHistory from './components/orderhistory/OrderHistory';
import HomePage from './components/home/HomePage';

function App() {
  return (
    <>
      <HeaderSection />

      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path="/listings" element={<ShowingListing />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/login" element={<AuthPage />} /> 
        <Route path='/my-bookings' element={<OrderHistory/>}/>
        
      </Routes>
    </>
  )
}

export default App
