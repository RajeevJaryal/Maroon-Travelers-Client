import './App.css'
import { Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";

import HeaderSection from './components/header/headerSection';
const HomePage = lazy(() => import('./components/home/HomePage'));
const ShowingListing = lazy(() => import('./components/showingData/showingListing'));
const HotelDetails = lazy(() => import('./components/detailsSection/HotelDetails'));
const AuthPage = lazy(() => import('./components/login/AuthPage'));
const OrderHistory = lazy(() => import('./components/orderhistory/OrderHistory'));

function App() {
  return (
    <>
      <HeaderSection />

      <Suspense fallback={<div className="page-loader">Loading...</div>}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/listings" element={<ShowingListing />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/login" element={<AuthPage />} /> 
          <Route path='/my-bookings' element={<OrderHistory />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
