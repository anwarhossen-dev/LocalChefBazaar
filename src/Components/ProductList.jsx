// d:/B12-assigment-11/LocalChefBazaar/src/components/ProductList.jsx

import React, { useState, useEffect, useRef, useContext, forwardRef } from 'react';
import { collection, getDocs, query, orderBy, limit, startAfter, where } from 'firebase/firestore';
import { db } from '../firebase'; // Import the initialized Firestore instance
import { useInfiniteQuery } from '@tanstack/react-query';
import { motion as Motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { CartContext } from '../providers/CartContext';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function ProductList() {
  const [category, setCategory] = useState('All');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { addToCart } = useContext(CartContext);
  
  const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Bakery'];
  const observerTarget = useRef(null);

  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isLoading, 
    isError, 
    error 
  } = useInfiniteQuery({
    queryKey: ['products', category],
    queryFn: async ({ pageParam = null }) => {
      const productsCollectionRef = collection(db, 'products');
      
      let constraints = [orderBy('name'), limit(8)];
      
      if (category !== 'All') {
        constraints.unshift(where('category', '==', category));
      }
      
      if (pageParam) {
        constraints.push(startAfter(pageParam));
      }

      const q = query(productsCollectionRef, ...constraints);
      const querySnapshot = await getDocs(q);
      
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return {
        products,
        lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1] || null
      };
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.lastVisible || undefined,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  const allProducts = data?.pages.flatMap(page => page.products) ?? [];

  if (isError) {
    return <div className="text-center p-4 text-red-500">{error?.message || "Failed to load products"}</div>;
  }

  if (!isLoading && allProducts.length === 0) {
    return <div className="text-center p-4">No products found.</div>;
  }

  const ProductSkeleton = forwardRef((props, ref) => (
    <div ref={ref} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
      <div className="skeleton h-64 w-full rounded-none" />
      <div className="p-6 space-y-4">
        <div className="skeleton h-3 w-20" />
        <div className="skeleton h-6 w-3/4" />
        <div className="space-y-2">
          <div className="skeleton h-3 w-full" />
          <div className="skeleton h-3 w-5/6" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="skeleton h-8 w-16" />
          <div className="skeleton h-10 w-10 rounded-xl" />
        </div>
      </div>
    </div>
  ));

  ProductSkeleton.displayName = 'ProductSkeleton';

  const heroSlides = [
    { id: 1, title: "Fresh from Local Farms", sub: "Up to 30% Off", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop", color: "bg-green-900/40" },
    { id: 2, title: "Homemade Chef Specials", sub: "Daily New Menus", img: "https://images.unsplash.com/photo-1556910103-1c02745a30d5?q=80&w=2070&auto=format&fit=crop", color: "bg-orange-900/40" },
    { id: 3, title: "Organic Bakery Delights", sub: "Freshly Baked Every Morning", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop", color: "bg-yellow-900/40" },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Motion.div className="fixed top-0 left-0 right-0 h-1 bg-green-600 origin-left z-[200]" style={{ scaleX }} />

      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          navigation={true}
          loop={true}
          className="h-full w-full"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full w-full group">
                <img src={slide.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms] group-hover:scale-110" alt={slide.title} />
                <div className={`absolute inset-0 ${slide.color} backdrop-blur-[2px] flex items-center justify-center`}>
                  <Motion.div 
                    initial={{ y: 30, opacity: 0 }} 
                    whileInView={{ y: 0, opacity: 1 }}
                    className="text-center text-white px-4"
                  >
                    <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase mb-4 inline-block">{slide.sub}</span>
                    <h1 className="text-4xl md:text-7xl font-black mb-6 drop-shadow-2xl">{slide.title}</h1>
                    <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-green-600 hover:text-white transition-all transform active:scale-95 shadow-xl">Shop Now</button>
                  </Motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <div className="container mx-auto py-12 max-w-7xl px-4 sm:px-6">
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Motion.h2 
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="text-4xl font-black text-gray-900 tracking-tight"
              >
                Today's Fresh Picks
              </Motion.h2>
              <p className="text-gray-500 mt-2 italic">Sourced directly from local sustainable farms to your table.</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {isLoading ? (
                [1, 2, 3, 4].map(i => <div key={i} className="skeleton h-10 w-24 rounded-full"></div>)
              ) : (
                categories.map((cat, idx) => (
                  <Motion.button 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-6 py-2 rounded-full border-2 transition-all duration-300 font-bold text-sm ${
                      category === cat 
                      ? 'bg-green-600 text-white border-green-600 shadow-xl shadow-green-200 -translate-y-1' 
                      : 'bg-white text-gray-600 border-gray-100 hover:border-green-400 hover:text-green-600 shadow-sm'
                    }`}
                  >
                    {cat}
                  </Motion.button>
                ))
              )}
            </div>
        </div>
      </header>

      <Motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <AnimatePresence mode='popLayout'>
          {isLoading ? (
            [...Array(8)].map((_, i) => <ProductSkeleton key={i} />)
          ) : (
            allProducts.map(product => (
              <Motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id} 
                className="group border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden bg-white"
              >
                <div className="relative overflow-hidden aspect-square bg-gray-50">
                  <div className="relative group/img">
                    <img 
                      src={product.imageUrl || 'https://via.placeholder.com/300'} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>
                  {product.stock < 10 && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] px-2 py-1 rounded-md uppercase font-bold tracking-wider">Low Stock</span>
                  )}
                </div>
                <div className="p-6">
                  <span className="text-green-600 text-xs font-bold uppercase tracking-widest">{product.category}</span>
                  <h3 className="text-lg font-bold mb-1 text-gray-800 group-hover:text-green-700 transition-colors">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[40px] leading-relaxed">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-2xl font-black text-gray-900">${product.price.toFixed(2)}</p>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-gray-900 text-white p-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg active:scale-95"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Motion.div>
            ))
          )}
        </AnimatePresence>
      </Motion.div>

      {hasNextPage && (
        <div className="mt-12 text-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 font-bold rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-300 disabled:opacity-50"
          >
            {isFetchingNextPage ? (
              <span className="flex items-center gap-2">
                <span className="loading loading-spinner loading-xs"></span>
                Loading more...
              </span>
            ) : (
              "Load More Products"
            )}
          </button>
        </div>
      )}
    </div>
    </div>
  );
}

export default ProductList;