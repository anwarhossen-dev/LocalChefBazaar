import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const KitchenOrchestrator = ({ children }) => {
    const axiosPublic = useAxiosPublic();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedArea, setSelectedArea] = useState('all');

    const { data: kitchens = [], isLoading, isError } = useQuery({
        queryKey: ['all-kitchens'],
        queryFn: async () => {
            // Ideally this would be /chefs or /kitchens
            const res = await axiosPublic.get('/meals'); 
            
            // Handle both array response and object with meals property
            const meals = Array.isArray(res.data) ? res.data : (res.data?.meals || []);
            
            // In a real app, we would group meals by chef to show kitchens
            // or fetch from a dedicated chefs endpoint.
            // For now, we'll simulate unique kitchens from the meals data.
            const uniqueChefs = [];
            const chefMap = new Map();

            meals.forEach(item => {
                // Ensure we have a chef identifier, fallback to chefName if chefId is missing
                const chefKey = item.chefId || item.chefName || "unknown";
                
                if (!chefMap.has(chefKey)) {
                    const kitchenObj = {
                        id: chefKey,
                        name: item.chefName || "Artisan Kitchen",
                        image: item.foodImage, // Fallback to a food image for now
                        rating: item.rating || "4.8",
                        deliveryArea: item.deliveryArea || "Local",
                        experience: item.chefExperience || "5",
                        description: `Authentic homemade meals crafted by ${item.chefName || 'our artisan chef'}. Specializing in local flavors and fresh ingredients.`
                    };
                    chefMap.set(chefKey, kitchenObj);
                    uniqueChefs.push(kitchenObj);
                }
            });
            return uniqueChefs;
        }
    });

    const filteredKitchens = useMemo(() => {
        return kitchens.filter(k => {
            const matchesSearch = k.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                k.deliveryArea.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesArea = selectedArea === 'all' || k.deliveryArea === selectedArea;
            return matchesSearch && matchesArea;
        });
    }, [kitchens, searchTerm, selectedArea]);

    const areas = useMemo(() => {
        const uniqueAreas = new Set(kitchens.map(k => k.deliveryArea));
        return ['all', ...Array.from(uniqueAreas)];
    }, [kitchens]);

    return children({
        kitchens: filteredKitchens,
        isLoading,
        isError,
        searchTerm,
        setSearchTerm,
        selectedArea,
        setSelectedArea,
        areas
    });
};

export default KitchenOrchestrator;
