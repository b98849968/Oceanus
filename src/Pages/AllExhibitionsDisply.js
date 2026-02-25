import React, { useRef, useState, useEffect } from "react";
//===== import css ========//
import "../App.css";
import "../styles/AllExhibitionsDisply.css";
import DepartmentsCard from "../components/common/DepartmentCard";
import ProjectCard from "../components/common/projectCard";
import AllExhibitionsButtons from "../components/common/AllExhibitionsButtons";
import ExhibitionsButtons from "../components/common/ExhibitionsButtons";
import { useSearchParams } from "react-router-dom";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { fetchAPI, ENDPOINTS } from "../API";

export default function AllExhibitionsDisply() {
    const scrollContainerRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);
    const [galleries, setGalleries] = useState([]);
    const [selectedGalleryId, setSelectedGalleryId] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleCardClick = (id) => {
        setSearchParams({ gallery_id: id });
        setTimeout(() => {
            const section = document.getElementById('aluminum-sections-gallery');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    // Fetch galleries
    useEffect(() => {
        const loadGalleries = async () => {
            try {
                const response = await fetchAPI(ENDPOINTS.getBasicGalleries);
                const data = response.data || response;
                // Assuming data is an array of galleries
                setGalleries(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to load galleries:", err);
            }
        };
        loadGalleries();
    }, []);

    // Drag to scroll state
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeftPos, setScrollLeftPos] = useState(0);

    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            // For RTL, `scrollLeft` might be negative or from 0 to negative
            // depending on the browser. Assuming standards where 0 is rightmost.
            // A more universal check:
            const isScrollable = scrollWidth > clientWidth;

            // In standard RTL browsers (like Chrome), scrollLeft is 0 at the start (right side)
            // and goes negative as you scroll left. 
            // In some older browsers it might go positive. 
            // Math.abs helps normalize.
            const scrolledAmount = Math.abs(scrollLeft);
            const maxScroll = scrollWidth - clientWidth;

            // Show right button (to scroll back to start) if we've scrolled away from 0
            setShowRight(isScrollable && scrolledAmount > 0);

            // Show left button (to scroll towards the end) if we haven't reached the end
            setShowLeft(isScrollable && scrolledAmount < maxScroll - 1); // -1 for sub-pixel rounding
        }
    };

    useEffect(() => {
        checkScrollPosition();
        window.addEventListener('resize', checkScrollPosition);
        return () => window.removeEventListener('resize', checkScrollPosition);
    }, []);

    // Drag to scroll handlers
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeftPos(scrollContainerRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        scrollContainerRef.current.scrollLeft = scrollLeftPos - walk;
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            // For RTL, scrolling "left" means going into the negative direction (unseen content on the left)
            // Different browsers handle RTL scroll differently, but scrollBy left: -ve usually scrolls viewport to the left.
            // Adjust the jump amount as needed (e.g. 400px)
            scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
        }
    };
    return (
        <>
            <div className="AluminumSections" id="exhibitions-gallery" style={{ borderTop: "none" }}>
                {/* =========== title Aluminum Sections =========== */}

                <div className="SectionsTitle">
                    {/* <p className="Services">خدماتنا</p> */}
                    <h3>   معارضنا المتخصصة </h3>
                    <hr />
                    <p className="SectionsP">  نقدم لك أفضل الحلول المتكاملة عبر معارضنا المتخصصة، حيث يتم تصميم وتنفيذ كل عمل بعناية فائقة. </p>
                </div>

                <div className="AluminumSectionsCards" style={{ position: 'relative' }}>

                    {showRight && (
                        <button className="scroll-btn scroll-btn-right" onClick={scrollRight}>
                            <ArrowForwardIosIcon fontSize="small" />
                        </button>
                    )}

                    <div
                        className={`AllExhibitionsDisplyCard ${isDragging ? 'dragging' : ''}`}
                        ref={scrollContainerRef}
                        onScroll={checkScrollPosition}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                    >
                        {galleries.length > 0 ? (
                            galleries.map((gallery) => (
                                <DepartmentsCard key={gallery.id} gallery={gallery} onClick={() => handleCardClick(gallery.id)} />
                            ))
                        ) : (
                            <>

                            </>
                        )}
                    </div>

                    {showLeft && (
                        <button className="scroll-btn scroll-btn-left" onClick={scrollLeft}>
                            <ArrowBackIosNewIcon fontSize="small" />
                        </button>
                    )}

                </div>
            </div >
        </>
    );
}
