import React, { useState, useMemo } from 'react';

const blogPosts = [
    {
        id: 1,
        title: "The Art of Sourdough: Tips from Local Bakers",
        excerpt: "Discover the secrets behind the perfect crust and airy crumb from our neighborhood's master bakers.",
        content: "Sourdough baking is a journey, not a destination. Our local bakers emphasize that patience is the most important ingredient. From cultivating your own starter to mastering the stretch-and-fold technique, every step contributes to the final masterpiece. Learn why the water temperature matters and how the ambient humidity in our coastal region affects your dough's rise.",
        image: "https://images.unsplash.com/photo-1585478259715-876a6a81b084?auto=format&fit=crop&q=80&w=800",
        author: "Chef Sarah",
        date: "May 15, 2024",
        category: "Baking"
    },
    {
        id: 2,
        title: "Seasonal Vegetable Spotlight: Spring Harvest",
        excerpt: "Learn how to make the most of this season's freshest greens and vibrant roots in your home kitchen.",
        content: "Spring brings a vibrant palette of flavors to our local markets. Asparagus, ramps, and peas are at their peak right now. Chef Mike shares his secret for perfectly blanched greens that retain their crunch and color. We also explore the humble radish and how roasting it transforms its spicy bite into a mellow, buttery delight that pairs perfectly with spring lamb.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
        author: "Chef Mike",
        date: "May 10, 2024",
        category: "Healthy Eating"
    },
    {
        id: 3,
        title: "5 Spices Every Home Cook Should Master",
        excerpt: "Unlock a world of flavor with these essential spices that will transform your daily meals into gourmet experiences.",
        content: "Cumin, smoked paprika, turmeric, cardamom, and coriander. These five spices form the backbone of global cuisines. Chef David demonstrates how to toast whole seeds to release their aromatic oils and why freshly grinding your spices makes a world of difference. We'll also provide a guide on how to store spices to maintain their potency for up to six months.",
        image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=800",
        author: "Chef David",
        date: "May 05, 2024",
        category: "Culinary Tips"
    }
];

const BlogOrchestrator = ({ children }) => {
    const [posts] = useState(blogPosts);
    const [selectedPost, setSelectedPost] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPosts = useMemo(() => {
        return posts.filter(post => 
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [posts, searchTerm]);

    const viewPost = (id) => {
        const post = posts.find(p => p.id === id);
        setSelectedPost(post);
    };

    const closePost = () => setSelectedPost(null);

    return children({
        posts: filteredPosts,
        selectedPost,
        viewPost,
        closePost,
        searchTerm,
        setSearchTerm
    });
};

export default BlogOrchestrator;
