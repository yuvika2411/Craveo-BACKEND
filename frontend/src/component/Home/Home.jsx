import React, { useEffect } from 'react'
import Hero from "./Hero"
import Carousel from "./MenuCarousel"
import Restaurant from "../Restaurant/Restaurants"
import { useDispatch, useSelector } from 'react-redux'
import { getAllRestaurantsAction } from '../State/Restaurant/Action'

export const Home = () => {
    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt")
    
    useEffect(() => {
        dispatch(getAllRestaurantsAction(jwt))
    }, [dispatch, jwt])

    return (
        <div>
            <Hero />
            <Carousel />
            <Restaurant />
        </div>
    )
}
