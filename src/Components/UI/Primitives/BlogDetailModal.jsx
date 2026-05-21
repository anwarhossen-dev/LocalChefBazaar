import React from 'react';
import { motion as Motion } from 'framer-motion';
import { FaTimes, FaUser, FaCalendarAlt, FaQuoteLeft } from 'react-icons/fa';

const BlogDetailModal = ({ post, onClose }) => {
    if (!post) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <Motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            ></Motion.div>

            {/* Modal Content */}
            <Motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center shadow-lg"
                >
                    <FaTimes size={20} />
                </button>

                {/* Left: Image (Visual Side) */}
                <div className="md:w-1/2 h-64 md:h-auto relative">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                </div>

                {/* Right: Content (Info Side) */}
                <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white flex flex-col">
                    <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest w-fit mb-6">
                        {post.category}
                    </span>
                    
                    <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-6 leading-tight">
                        {post.title}
                    </h2>

                    <div className="flex items-center gap-6 text-sm font-bold text-slate-400 mb-8 border-b border-slate-100 pb-8">
                        <span className="flex items-center gap-2 text-slate-600"><FaUser className="text-primary" /> {post.author}</span>
                        <span className="flex items-center gap-2"><FaCalendarAlt className="text-primary" /> {post.date}</span>
                    </div>

                    <div className="prose prose-slate max-w-none mb-8">
                        <FaQuoteLeft className="text-primary/20 text-4xl mb-4" />
                        <p className="text-slate-600 text-lg leading-relaxed font-medium italic">
                            {post.excerpt}
                        </p>
                        <p className="text-slate-600 text-base leading-relaxed mt-6">
                            {post.content}
                        </p>
                    </div>

                    <button 
                        onClick={onClose}
                        className="mt-auto w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-4 rounded-2xl transition-all active:scale-95 shadow-lg"
                    >
                        Back to Chronicles
                    </button>
                </div>
            </Motion.div>
        </div>
    );
};

export default BlogDetailModal;
