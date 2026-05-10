import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../Config/api';
import RestaurantCard from '../Restaurant/RestaurantCard';

// hello
// ufeh
const Search = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');
    
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query) {
            setLoading(true);
            const jwt = localStorage.getItem("jwt");
            api.get(`/api/restaurants/search?keyword=${query}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }).then(res => {
                setResults(res.data);
            }).catch(err => {
                console.error("Search error", err);
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [query]);

    return (
        <div className="font-[Poppins] pt-28 px-5 lg:px-20 min-h-screen bg-[#0f0f0f] text-white">
            <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
            
            {loading ? (
                <div className="text-gray-400">Loading...</div>
            ) : results.length > 0 ? (
                <div className="flex flex-wrap items-center gap-5">
                    {results.map((item) => (
                        <RestaurantCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <div className="text-gray-400 mt-10 text-xl">
                    No restaurants found matching your search.
                </div>
            )}
        </div>
    );
};

export default Search;
