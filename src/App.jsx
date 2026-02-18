import './App.css'
import { Routes, Route } from "react-router-dom";

import HeaderSection from './components/header/headerSection'
import ShowingListing from './components/showingData/showingListing'
import HotelDetails from './components/detailsSection/HotelDetails';
function App() {
  return (
    <>
      <HeaderSection />

      <Routes>
        <Route path="/" element={<ShowingListing />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
      </Routes>
    </>
  )
}

export default App
