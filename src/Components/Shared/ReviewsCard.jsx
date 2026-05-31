import React, { useState, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { isValid } from "date-fns";

/**
 * ReviewsCard: Ultra-Premium Infinity Glassmorphic Edition
 * High-performance, pure, and syntactically robust.
 */
const ReviewsCard = ({ review = {} }) => {
  const [isHelpful, setIsHelpful] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Pure state initialization for mock stats
  const [helpfulCount] = useState(() => 
    Math.floor(Math.random() * 50) + 10
  );

  // Parallax Logic using Framer Motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [14, -14]);
  const rotateY = useTransform(x, [-100, 100], [-14, 14]);
  const glowX = useTransform(x, (val) => val + 200); 
  const glowY = useTransform(y, (val) => val + 130);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  // Data Extraction
  const comment = review?.comment || "Experience that transcends expectations.";
  const rawName = review?.reviewerName || "Md. Emran Hossain Khan";
  const reviewerName = typeof rawName === "string" ? rawName : "Elite Member";
  const reviewerImage = review?.reviewerImage || review?.userImage || review?.photoURL;
  const rating = Number(review?.rating) || 4.8;
  const mealName = review?.mealName || "Speciality Menu";
  const date = review?.date;

  // Tier Calculation
  const tier = useMemo(() => {
    if (rating >= 4.8) return "INFINITY";
    if (rating >= 4.0) return "PRESTIGE";
    return "ELITE";
  }, [rating]);

  // Expiry Date Logic
  const expiryDate = useMemo(() => {
    const d = date ? new Date(date) : new Date();
    if (!isValid(d)) return "12/28";
    return `${(d.getMonth() + 1).toString().padStart(2, '0')}/${(d.getFullYear() + 2).toString().slice(-2)}`;
  }, [date]);

  const initials = useMemo(() => {
    return reviewerName.split(" ").filter(Boolean).map(w => w[0]).join("").toUpperCase().slice(0, 2) || "?";
  }, [reviewerName]);

  const toggleHelpful = (e) => {
    e.stopPropagation();
    setIsHelpful(!isHelpful);
  };

  return (
    <div className="perspective-[1200px] w-full max-w-[460px] mx-auto group">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-full aspect-[1.7/1] rounded-[28px] p-6 md:p-7 overflow-hidden cursor-none flex flex-col justify-between shadow-2xl transition-transform duration-500 bg-[#0c081d]"
      >
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(18,10,38,0.97),rgba(8,8,28,0.99))]" />
        
        {/* Animated Shimmer Border - Refactored for stability */}
        <div 
          className="absolute inset-0 rounded-[28px] p-[1.5px] pointer-events-none z-0 before:content-[''] before:absolute before:inset-0 before:rounded-[28px] before:bg-[linear-gradient(135deg,rgba(150,100,255,0.8),rgba(240,80,160,0.5),rgba(80,100,255,0.7),rgba(150,100,255,0.8))] before:bg-[length:300%_300%] before:animate-[shimmer_5s_ease_infinite]" 
          style={{
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        />

        {/* Mouse-follow Glow */}
        <motion.div 
          className="absolute w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(130,80,255,0.45),transparent_70%)] blur-[40px] pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ left: glowX, top: glowY, transform: 'translate(-50%, -50%)' }}
        />

        {/* Ambient Orbs */}
        <div className="absolute -top-[50px] -right-[30px] w-[160px] h-[160px] rounded-full bg-[radial-gradient(circle,rgba(120,50,240,0.35),transparent)] blur-[55px] animate-[breathe_6s_ease-in-out_infinite]" />
        <div className="absolute -bottom-[35px] -left-[25px] w-[120px] h-[120px] rounded-full bg-[radial-gradient(circle,rgba(220,60,140,0.2),transparent)] blur-[55px] animate-[breathe_6s_ease-in-out_infinite] animate-delay-3s" />

        {/* Verified Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="absolute -top-3 -left-1 px-3 py-1.5 rounded-xl bg-white shadow-xl flex items-center gap-1.5 z-30 pointer-events-none"
            >
              <i className="ti ti-bolt text-yellow-500 text-sm" />
              <span className="text-[10px] font-extrabold text-[#1e1b4b] tracking-wider whitespace-nowrap uppercase">Verified Reviewer</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Container */}
        <div className="relative z-20 flex flex-col justify-between h-full">
          {/* TOP */}
          <div className="flex justify-between items-start [transform:translateZ(40px)]">
            <div>
              <div className="flex items-center gap-1.5 text-[9px] font-black tracking-[3.5px] uppercase text-white/30 mb-1">
                <i className="ti ti-shield-check text-[#818cf8]" />
                {mealName}
              </div>
              <div className="font-['Syne'] text-2xl md:text-3xl font-black italic tracking-tighter bg-[linear-gradient(120deg,#c4b5fd_0%,#f0abfc_50%,#818cf8_100%)] bg-clip-text text-transparent">
                {tier}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <i className="ti ti-wifi text-white/25 text-lg rotate-90" />
              <div className="w-[42px] h-[32px] rounded-md bg-gradient-to-br from-[#a16207] via-[#fef08a] to-[#ca8a04] relative overflow-hidden shadow-lg shadow-black/50">
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 gap-[2px] p-[3px] opacity-30">
                  {[1,2,3,4,5,6].map((i) => <div key={i} className="border-[0.5px] border-black rounded-[1.5px]" />)}
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE */}
          <div className="flex-1 flex flex-col justify-center py-2 [transform:translateZ(60px)]">
            <i className="ti ti-quote text-white/10 text-2xl mb-1" />
            <p className="text-xs md:text-sm text-white/80 leading-relaxed italic font-medium line-clamp-2">
              "{comment}"
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex gap-[3px]">
                {[1,2,3,4,5].map((i) => (
                  <i 
                    key={i} 
                    className={`text-[11px] ${i <= Math.round(rating) ? 'ti ti-star-filled text-yellow-400' : 'ti ti-star text-white/10'}`} 
                  />
                ))}
              </div>
              <div className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-white/40 tracking-widest uppercase">
                {rating.toFixed(1)} PTS
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="flex justify-between items-end [transform:translateZ(50px)]">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex-shrink-0">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-[3px] rounded-full bg-[conic-gradient(from_0deg,#7c3aed,#ec4899,#6366f1,#7c3aed)]"
                />
                {!imgError && reviewerImage ? (
                  <img 
                    src={reviewerImage} 
                    alt={reviewerName} 
                    onError={() => setImgError(true)}
                    className="absolute inset-[2px] w-[calc(100%-4px)] h-[calc(100%-4px)] rounded-full object-cover border-[1.5px] border-[#0a0819]"
                  />
                ) : (
                  <div className="absolute inset-[2px] w-[calc(100%-4px)] h-[calc(100%-4px)] rounded-full flex items-center justify-center bg-gradient-to-br from-[#7c3aed] to-[#6366f1] text-white font-bold text-sm border-[1.5px] border-[#0a0819]">
                    {initials}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black tracking-[2.5px] uppercase text-white/20 mb-1">Authentic Signature</span>
                <span className="font-['Dancing_Script'] text-base md:text-lg text-white/85 leading-none tracking-tight drop-shadow-md whitespace-nowrap">
                  {reviewerName}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.div 
                animate={{ rotateY: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center"
              >
                <i className="ti ti-qrcode text-white/30 text-base" />
              </motion.div>
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black tracking-[2px] uppercase text-white/20 mb-0.5">Exp Date</span>
                <span className="text-xs font-mono font-bold text-white/90 tracking-[3px] leading-none">{expiryDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Actions */}
        <div className={`absolute right-3.5 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3.5 pointer-events-none'}`}>
          <button 
            onClick={toggleHelpful}
            className={`w-[34px] h-[34px] rounded-xl flex flex-col items-center justify-center gap-0.5 border border-white/15 transition-all ${isHelpful ? 'bg-indigo-500/60 border-indigo-400/40 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
          >
            <i className="ti ti-thumb-up text-sm" />
            <span className="text-[7.5px] font-black">{isHelpful ? helpfulCount + 1 : helpfulCount}</span>
          </button>
          <button className="w-[34px] h-[34px] rounded-xl flex items-center justify-center bg-white/5 border border-white/15 text-white/60 hover:bg-white/10 transition-all">
            <i className="ti ti-share text-sm" />
          </button>
          <button className="w-[34px] h-[34px] rounded-xl flex items-center justify-center bg-white/5 border border-white/15 text-white/60 hover:bg-white/10 transition-all">
            <i className="ti ti-fingerprint text-sm" />
          </button>
        </div>

        {/* Noise Overlay */}
        <div className="absolute inset-0 rounded-[28px] opacity-[0.025] pointer-events-none z-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        .animate-delay-3s { animation-delay: -3s; }
      `}} />
    </div>
  );
};

export default ReviewsCard;
