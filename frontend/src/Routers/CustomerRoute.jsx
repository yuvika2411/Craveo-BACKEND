import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Navbar from '../component/Navbar/NavBar'
import { Home } from '../component/Home/Home'
import RestaurantDetails from '../component/Restaurant/RestaurantDetails'
import Cart from '../component/Cart/Cart'
import Profile from '../component/Profile/Profile'
import Auth from '../component/Auth/Auth'
import Search from '../component/Search/Search'
import About from '../component/About/About'

export const CustomerRoute = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/account/:register' element={<Home />} />
                <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/my-profile/*' element={<Profile />} />
                <Route path='/search' element={<Search />} />
                <Route path='/about' element={<About />} />
                {/* Fallback for unknown routes to prevent blank screen */}
                <Route path='*' element={<Navigate to="/" replace />} />
            </Routes>
            <Auth />
        </div>
    )
}
