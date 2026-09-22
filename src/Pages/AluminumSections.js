import React, { useState, useEffect } from "react";
//===== import css ========//
import "../App.css";
import "../styles/AluminumSections.css";
import ProjectCard from "../components/common/projectCard";
import ExhibitionsButtons from "../components/common/ExhibitionsButtons";
import { fetchAPI, ENDPOINTS } from "../API";
import { Link, useSearchParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function AluminumSections() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const initialGalleryId = searchParams.get('gallery_id');
  const [selectedGalleryId] = useState(initialGalleryId ? Number(initialGalleryId) : null);
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');

  useEffect(() => {
    const loadItems = async () => {
      setIsLoading(true);
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

        // Add a small minimum loading delay to ensure the spinner is visibly turning
        const [response] = await Promise.all([
          fetchAPI(url),
          new Promise(resolve => setTimeout(resolve, 800))
        ]);

        const data = response.data || response;
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {

      } finally {
        setIsLoading(false);
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
           
          <h3>   سجل النماذج والأعمال  </h3>
          <hr />
          <p className="SectionsP">  تصفح أحدث مشاريعنا   وتعرف على جودة تفاصيلنا  </p>
          <Link to="/exhibitions" className="backToExhibitionsBtn">
            العودة إلى كل المعارض
            <ArrowBackIcon sx={{ fontSize: 24, paddingBottom: "2px" }} />
          </Link>
        </div>
        <div className="AluminumSectionsCards">
          <div className="AluminumSectionsButtons">

            {selectedGalleryId && (
              <ExhibitionsButtons
                galleryId={selectedGalleryId}
                onSelectCategory={(categoryId) => setSelectedCategoryId(categoryId)}
              />
            )}
            <div className="AluminumSectionsCardsAllCards">
              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '30vh' }}>
                  <CircularProgress />
                </Box>
              ) : items.length > 0 ? (
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
