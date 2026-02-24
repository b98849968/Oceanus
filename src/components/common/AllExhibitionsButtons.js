import React, { useState, useEffect } from 'react';
import './style/AllExhibitionsButtons.css';
import { fetchAPI, ENDPOINTS } from '../../API';

const AllExhibitionsButtons = ({ onCategorySelect }) => {
    const [activeCategory, setActiveCategory] = useState(null);
    const [galleries, setGalleries] = useState([]);

    useEffect(() => {
        const loadGalleries = async () => {
            try {
                const response = await fetchAPI(ENDPOINTS.getBasicGalleries);
                const data = response.data || response;
                const fetchedGalleries = Array.isArray(data) ? data : [];
                setGalleries(fetchedGalleries);

                if (fetchedGalleries.length > 0) {
                    setActiveCategory(fetchedGalleries[0].id);
                    if (onCategorySelect) {
                        onCategorySelect(fetchedGalleries[0].id);
                    }
                }
            } catch (err) {
                console.error("Failed to load galleries:", err);
            }
        };
        loadGalleries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
        if (onCategorySelect) {
            onCategorySelect(categoryId);
        }
    };

    return (
        <div className="exhibitions-buttons-container">
            {galleries.map((gallery) => (
                <button
                    key={gallery.id}
                    className={`exhibition-btn ${activeCategory === gallery.id ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(gallery.id)}
                >
                    {gallery.name}
                </button>
            ))}
        </div>
    );
};

export default AllExhibitionsButtons;
