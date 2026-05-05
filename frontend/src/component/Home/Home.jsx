import React, { useEffect } from 'react'
import Hero from "./Hero"
import Carousel from "./MenuCarousel"
import Restaurant from "../Restaurant/Restaurants"
import { useDispatch } from 'react-redux'
import { getAllRestaurantsAction } from '../State/Restaurant/Action'

export const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllRestaurantsAction())  
    }, [dispatch])

    return (
        <div>
            <Hero />
            <Carousel />
            <Restaurant />
        </div>
    )
}