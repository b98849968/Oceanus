import React, { useState, useEffect } from "react";
//===== import css ========//
import "../App.css";
import "../styles/AluminumSections.css";
import DepartmentsCard from "../components/common/DepartmentCard";
import ProjectCard from "../components/common/projectCard";
import AllExhibitionsButtons from "../components/common/AllExhibitionsButtons";
import ExhibitionsButtons from "../components/common/ExhibitionsButtons";
import { fetchAPI, ENDPOINTS } from "../API";

export default function AluminumSections() {
  const [items, setItems] = useState([]);
  const [selectedGalleryId, setSelectedGalleryId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');

  useEffect(() => {
    const loadItems = async () => {
      try {
        let url = ENDPOINTS.getAllItems;
        const params = new URLSearchParams();

        if (selectedGalleryId && selectedGalleryId !== 'all') {
          params.append('gallery_id', selectedGalleryId);
        }

        if (selectedCategoryId && selectedCategoryId !== 'all') {
          params.append('category_id', selectedCategoryId);
        }

        const queryString = params.toString();
        if (queryString) {
          url += `?${queryString}`;
        }

        const response = await fetchAPI(url);
        const data = response.data || response;
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load items:", err);
      }
    };

    // Refresh items whenever gallery or category changes
    loadItems();
  }, [selectedGalleryId, selectedCategoryId]);

  // Reset category to 'all' whenever gallery changes
  useEffect(() => {
    setSelectedCategoryId('all');
  }, [selectedGalleryId]);

  return (
    <>
      <div className="AluminumSections" id="aluminum-sections-gallery">
        {/* =========== title Aluminum Sections =========== */}

        <div className="SectionsTitle">
          {/* <p className="Services">خدماتنا</p> */}
          <h3>   سجل النماذج والأعمال  </h3>
          <hr />
          <p className="SectionsP">  تصفح أحدث مشاريعنا المنفذة وتعرف على جودة تفاصيلنا  </p>
        </div>
        <div className="AluminumSectionsCards">
          <div className="AluminumSectionsButtons">
            <AllExhibitionsButtons onCategorySelect={(id) => setSelectedGalleryId(id)} />

            {selectedGalleryId && (
              <ExhibitionsButtons
                galleryId={selectedGalleryId}
                onSelectCategory={(categoryId) => setSelectedCategoryId(categoryId)}
              />
            )}
            <div className="AluminumSectionsCardsAllCards">
              {items.length > 0 ? (
                items.map(item => (
                  <ProjectCard key={item.id} project={item} />
                ))
              ) : (
                <p>لا توجد مشاريع</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
