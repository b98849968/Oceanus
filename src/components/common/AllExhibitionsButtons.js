import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './style/AllExhibitionsButtons.css';
import { fetchAPI, ENDPOINTS } from '../../API';

const AllExhibitionsButtons = ({ onCategorySelect }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const urlGalleryId = searchParams.get('gallery_id');
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
                    const projectId = searchParams.get('project');

                    if (urlGalleryId) {
                        const initialId = Number(urlGalleryId);
                        setActiveCategory(initialId);
                        if (onCategorySelect) {
                            onCategorySelect(initialId);
                        }
                    } else if (!projectId) {
                        // إذا لم يكن هناك مشروع محدد في الرابط، قم باختيار المعرض الأول افتراضياً
                        const initialId = fetchedGalleries[0].id;
                        setActiveCategory(initialId);
                        if (onCategorySelect) {
                            onCategorySelect(initialId);
                        }
                    }
                }
            } catch (err) {
                console.error("Failed to load galleries:", err);
            }
        };
        loadGalleries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (urlGalleryId && galleries.length > 0) {
            const id = Number(urlGalleryId);
            setActiveCategory(id);
            if (onCategorySelect) {
                onCategorySelect(id);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlGalleryId, galleries]);

    const handleCategoryClick = (categoryId) => {
        setSearchParams({ gallery_id: categoryId });
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
