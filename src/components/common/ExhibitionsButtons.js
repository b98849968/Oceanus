import React, { useState, useEffect } from 'react';
import './style/ExhibitionsButtons.css';
import { fetchAPI, ENDPOINTS } from '../../API';

const ExhibitionsButtons = ({ galleryId, onSelectCategory }) => {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');

    useEffect(() => {
        const fetchCategories = async () => {
            if (!galleryId && galleryId !== 0) {
                setCategories([]);
                return;
            }
            try {
                // Fetch specific gallery which includes categories
                const response = await fetchAPI(ENDPOINTS.getGalleryById(galleryId));
                const data = response.data || response;
                if (data && data.categories) {
                    setCategories(data.categories);
                } else {
                    setCategories([]);
                }
            } catch (error) {
                
                setCategories([]);
            }
        };

        fetchCategories();
        setActiveCategory('all');
    }, [galleryId]);

    const handleCategoryClick = (id) => {
        setActiveCategory(id);
        if (onSelectCategory) {
            onSelectCategory(id);
        }
    };

    const displayCategories = [...categories];
    // Add "All" option at the beginning
    displayCategories.unshift({ id: 'all', name: 'الكل' });

    return (
        <div className="exhibitions-buttons-container">
            {displayCategories.map((category, index) => {
                const itemValue = category.id;
                const itemName = category.name;
                const isSelected = activeCategory === itemValue;

                return (
                    <button
                        key={itemValue || index}
                        className={`exhibition-button ${isSelected ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(itemValue)}
                        style={{ fontFamily: 'Bolds' }}
                    >
                        {itemName}
                    </button>

                );
            })}
        </div>
    );
};

export default ExhibitionsButtons;
