import './App.css'
import { Routes, Route } from "react-router-dom";

import HeaderSection from './components/header/headerSection'
import ShowingListing from './components/showingData/showingListing'
import HotelDetails from './components/detailsSection/HotelDetails';
import AuthPage from './components/login/AuthPage';
import OrderHistory from './components/orderhistory/OrderHistory';
function App() {
  return (
    <>
      <HeaderSection />

      <Routes>
        <Route path="/" element={<ShowingListing />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/auth" element={<AuthPage />} /> 
        <Route path='/orderHistory' element={<OrderHistory/>}/>
      </Routes>
    </>
  )
}

export default App
