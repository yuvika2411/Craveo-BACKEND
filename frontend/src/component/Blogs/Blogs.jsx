import React, { useEffect, useState } from 'react';
import { api } from '../Config/api';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const jwt = localStorage.getItem("jwt");
                const res = await api.get('/api/blogs', {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
                setBlogs(res.data);
            } catch (error) {
                console.error("Failed to fetch blogs", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="font-[Poppins] pt-28 px-5 lg:px-20 min-h-screen bg-[#0f0f0f] text-white">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-[#ea580c] mb-10 text-center">Our Latest Blogs</h1>
                
                {loading ? (
                    <div className="text-center text-gray-400 text-xl py-10">Loading blogs...</div>
                ) : blogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map(blog => (
                            <div key={blog.id} className="bg-[#151515] rounded-2xl overflow-hidden border border-white/5 shadow-2xl hover:border-[#ea580c]/50 transition duration-300 group">
                                <img src={blog.imageUrl || "https://images.unsplash.com/photo-1490818321205-fecb62bb6f6f"} alt={blog.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="p-6">
                                    <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
                                        <span>{blog.author || "Admin"}</span>
                                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-100 mb-3 line-clamp-2 group-hover:text-[#ea580c] transition-colors">{blog.title}</h2>
                                    <p className="text-gray-400 text-sm line-clamp-3 mb-4">{blog.content}</p>
                                    <button className="text-[#ea580c] font-semibold hover:underline">Read More</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-400 mt-10 text-xl border border-dashed border-white/20 p-10 rounded-2xl">
                        No blogs available at the moment. Stay tuned!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blogs;
