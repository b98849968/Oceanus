import React from 'react';
import './style/ExhibitionsButtons.css';

/**
 * ExhibitionsButtons component
 * 
 * @param {Array} categories - Array of categories. Can be strings ['الكل', 'أبواب', ...] or objects [{id: 1, name: 'الكل'}, ...]
 * @param {string|number|object} selectedCategory - The currently selected category
 * @param {function} onSelectCategory - Function to call when a category is clicked
 */
const ExhibitionsButtons = ({
    categories = ["أبواب", "شبابيك", "واجهات", "مطابخ"],
    selectedCategory,
    onSelectCategory
}) => {
    // Ensure "الكل" (All) is always present as the first option
    const displayCategories = [...categories];
    const hasAll = displayCategories.some(cat =>
        (typeof cat === 'object' && cat.name === 'الكل') || cat === 'الكل'
    );

    if (!hasAll) {
        if (displayCategories.length > 0 && typeof displayCategories[0] === 'object') {
            // If using object format, keep consistent structure
            displayCategories.unshift({ id: 'all', name: 'الكل' });
        } else {
            // If using string array format
            displayCategories.unshift('الكل');
        }
    }

    return (
        <div className="exhibitions-buttons-container">
            {displayCategories.map((category, index) => {
                // Handle both string arrays and object arrays
                const itemValue = typeof category === 'object' ? category.id : category;
                const itemName = typeof category === 'object' ? category.name : category;
                const isSelected = selectedCategory === itemValue;

                return (
                    <button
                        key={itemValue || index}
                        className={`exhibition-button ${isSelected ? 'active' : ''}`}
                        onClick={() => onSelectCategory(itemValue)}
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
