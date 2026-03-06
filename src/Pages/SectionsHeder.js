import React, { useState, useEffect } from "react";
import "../styles/ExhibitionsHeader.css";
import "../styles/Familys.css";
import "../styles/SectionsHeder.css";
import CallIcon from '@mui/icons-material/Call';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import bgImg from "../assets/images/ExhibitionsHeader.jpg";
import { useContact } from "../context/ContactContext";
import { fetchAPI, ENDPOINTS, BASE_URL } from "../API";
import { useSearchParams } from "react-router-dom";

export default function SectionsHeder() {
    const [searchParams] = useSearchParams();
    const galleryId = searchParams.get('gallery_id');

    const [galleryData, setGalleryData] = useState(null);

    const [contactData, setContactData] = useState({
        phone: "+966000000000",
        label: "تواصل معنا"
    });

    const { openContact } = useContact();

    // Fetch contact data
    useEffect(() => {
        fetchAPI(ENDPOINTS.getSettings)
            .then(response => {
                const settings = response.data || response;
                // Try phone, or first phone from array if available
                const firstPhone = settings.phones && settings.phones[0];
                const parsedPhone = firstPhone
                    ? (typeof firstPhone === 'object' ? (firstPhone.number || firstPhone.phone) : firstPhone)
                    : null;

                const phoneSetting = settings.phone || parsedPhone || contactData.phone;
                setContactData({
                    phone: phoneSetting,
                    label: settings.label || "تواصل معنا"
                });
            })
            .catch(err => {});
        // eslint-disable-next-line
    }, []);

    // Fetch gallery data
    useEffect(() => {
        if (galleryId && galleryId !== 'all') {
            fetchAPI(ENDPOINTS.getGalleryById(galleryId))
                .then(response => {
                    const data = response.data || response;
                    setGalleryData(data);
                })
                .catch(err => {});
        } else {
            setGalleryData(null);
        }
    }, [galleryId]);

    const title = galleryData?.name || "سجل النماذج والأعمال";
    const description = galleryData?.description || "تصفح أحدث مشاريعنا   وتعرف على جودة تفاصيلنا";

    // Determine the background image URL
    const bgUrl = galleryData?.image ? `${BASE_URL}${galleryData.image}` : bgImg;

    return (
        <section
            className="exhibitions-header-container"
            style={{ backgroundImage: `url(${bgUrl})` }}
        >
            <div className="exh-fade-overlay">
                <div className="exh-content-wrapper">

                    {/* التاج العلوي */}
                    <div className="exh-badge animate__fadeInLeft">
                        إتقان في كل تفصيل <span>✦</span> خبرة تتجاوز التوقعات
                    </div>

                    {/* العنوان الرئيسي */}
                    <h1 className="exh-main-title animate__backInRight">
                        <span className="exh-title-navy exh-title-orange-navy">   معرفة المزيد عن أعمالنا    </span>
                        <span className="exh-title-orange">معرض {title}</span>
                    </h1>

                    {/* الوصف */}
                    <p className="exh-description animate__backInLeft">
                        {description}
                    </p>

                    {/* أزرار الإجراء */}
                    <div className="exh-actions animate__fadeInLeft">
                        <button onClick={openContact} className="exh-btn-contact" style={{ border: 'none', cursor: 'pointer' }}>
                            {contactData.label}
                            {/* أيقونة الهاتف */}
                            <CallIcon />
                        </button>

                        <button
                            className="exh-btn-browse"
                            onClick={() => {
                                const el = document.getElementById("aluminum-sections-gallery");
                                if (el) {
                                    el.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                        >
                            تصفح أعمالنا
                            <ArrowDownwardIcon />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
