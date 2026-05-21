import React from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import Container from '../../Components/Shared/Container';
import { Helmet } from 'react-helmet-async';
import { FaCalendarAlt, FaUser, FaArrowRight, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import BlogOrchestrator from '../../Components/Dashboard/Blog/BlogOrchestrator';
import BlogDetailModal from '../../Components/UI/Primitives/BlogDetailModal';

const Blog = () => {
    const handleSubscribe = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        if (email) {
            toast.success(`Thank you! ${email} has been subscribed to our newsletter.`);
            e.target.reset();
        }
    };

    return (
        <BlogOrchestrator>
            {({ posts, selectedPost, viewPost, closePost, searchTerm, setSearchTerm }) => (
                <div className="min-h-screen bg-gray-50/50 py-12">
                    <Helmet>
                        <title>Blog | Local Chef Bazaar</title>
                    </Helmet>
                    
                    <Container>
                        {/* Header */}
                        <div className="text-center mb-16">
                            <Motion.h1 
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-6xl font-black text-slate-800 mb-4"
                            >
                                Culinary <span className="text-primary">Chronicles</span>
                            </Motion.h1>
                            <Motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-slate-500 text-lg max-w-2xl mx-auto"
                            >
                                Insights, recipes, and stories from the heart of local kitchens.
                            </Motion.p>
                        </div>

                        {/* Search Bar */}
                        <div className="max-w-xl mx-auto mb-12 relative group">
                            <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
                            <input 
                                type="text"
                                placeholder="Search stories or categories..."
                                className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-14 pr-6 shadow-sm focus:shadow-xl focus:border-primary outline-none transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Featured Post (Visual Mockup) */}
                        {!searchTerm && (
                            <Motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative rounded-[3rem] overflow-hidden h-[400px] mb-16 shadow-2xl group cursor-pointer"
                                onClick={() => viewPost(1)}
                            >
                                <img 
                                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070" 
                                    alt="Featured Post" 
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12 text-white">
                                    <span className="bg-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest w-fit mb-4">Featured Story</span>
                                    <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight max-w-3xl">
                                        Bridging Communities Through Home-Cooked Meals
                                    </h2>
                                    <p className="text-gray-200 text-lg max-w-xl mb-6 hidden md:block">
                                        How Local Chef Bazaar is empowering independent creators and bringing neighbors together around the table.
                                    </p>
                                    <div className="flex items-center gap-6 text-sm font-bold opacity-80">
                                        <span className="flex items-center gap-2"><FaUser className="text-primary" /> Admin Team</span>
                                        <span className="flex items-center gap-2"><FaCalendarAlt className="text-primary" /> May 20, 2024</span>
                                    </div>
                                </div>
                            </Motion.div>
                        )}

                        {/* Blog Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence mode='popLayout'>
                                {posts.map((post, idx) => (
                                    <Motion.div 
                                        key={post.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
                                    >
                                        <div className="h-56 overflow-hidden relative">
                                            <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                                            <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-primary uppercase">
                                                {post.category}
                                            </span>
                                        </div>
                                        <div className="p-8 flex flex-col flex-1">
                                            <div className="flex items-center gap-4 text-xs text-slate-400 font-bold mb-4 uppercase tracking-tighter">
                                                <span className="flex items-center gap-1.5"><FaUser className="text-primary" /> {post.author}</span>
                                                <span className="flex items-center gap-1.5"><FaCalendarAlt className="text-primary" /> {post.date}</span>
                                            </div>
                                            <h3 
                                                className="text-xl font-bold text-slate-800 mb-4 line-clamp-2 leading-tight hover:text-primary transition-colors cursor-pointer"
                                                onClick={() => viewPost(post.id)}
                                            >
                                                {post.title}
                                            </h3>
                                            <p className="text-slate-500 text-sm mb-6 line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                            <button 
                                                onClick={() => viewPost(post.id)}
                                                className="mt-auto flex items-center gap-2 text-primary font-black text-sm group uppercase tracking-widest"
                                            >
                                                Read More <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                                            </button>
                                        </div>
                                    </Motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Newsletter Subscription */}
                        <div className="mt-20 bg-slate-900 rounded-[3rem] p-12 text-center text-white">
                            <h2 className="text-3xl font-black mb-4">Never Miss a Bite</h2>
                            <p className="text-slate-400 mb-8 max-w-md mx-auto">Get the latest recipes and chef spotlights delivered straight to your inbox.</p>
                            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                                <input 
                                    name="email"
                                    type="email" 
                                    placeholder="your@email.com" 
                                    required
                                    className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-colors text-white"
                                />
                                <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-black px-8 py-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-primary/20">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </Container>

                    {/* Blog Detail Modal */}
                    <AnimatePresence>
                        {selectedPost && (
                            <BlogDetailModal 
                                post={selectedPost} 
                                onClose={closePost} 
                            />
                        )}
                    </AnimatePresence>
                </div>
            )}
        </BlogOrchestrator>
    );
};

export default Blog;
