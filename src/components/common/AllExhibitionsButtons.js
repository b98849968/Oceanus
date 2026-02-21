import React, { useState } from 'react';
import './style/AllExhibitionsButtons.css';

const AllExhibitionsButtons = ({ categories, onCategorySelect }) => {
    // للتحكم بالزر النشط حالياً
    const [activeCategory, setActiveCategory] = useState(
        categories && categories.length > 0 ? categories[0].id : 'all'
    );

    // قائمة افتراضية في حال لم يتم تمرير بيانات من الـ API
    const defaultCategories = [
        { id: 'all', name: 'جميع المعارض' },
        { id: 'wood', name: 'الخشب' },
        { id: 'aluminum', name: 'الألمنيوم' },
    ];

    const dataToRender = categories || defaultCategories;

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
        // إرسال الـ id للـ Parent Component في حال تم تمرير الدالة
        if (onCategorySelect) {
            onCategorySelect(categoryId);
        }
    };

    return (
        <div className="exhibitions-buttons-container">
            {dataToRender.map((category) => (
                <button
                    key={category.id}
                    className={`exhibition-btn ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(category.id)}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
};

export default AllExhibitionsButtons;
