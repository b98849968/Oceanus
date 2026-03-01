import React, { useState, useEffect } from 'react';
import '../styles/CommunicationLocation .css';
import '../styles/Familys.css';
import { fetchAPI, ENDPOINTS } from '../API';


// ========= ايقونات mui ===============//
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useContact } from '../context/ContactContext';
import { useInView } from "react-intersection-observer";

const CommunicationLocation = () => {
    const { openContact, openWhatsApp } = useContact();
    const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: contentRef, inView: contentInView } = useInView({ triggerOnce: true, threshold: 0.1 });

    const [contactData, setContactData] = useState({
        whatsapp: '',
        phone: '',
        email: '',
        address: '',
        workingHours1: '',
        workingHours2: '',
        mapUrl: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // محاكاة جلب البيانات الخاصة بأرقام التواصل والموقع
        // يمكن استبدال هذا الجزء بطلب API حقيقي (مثل axios.get أو fetch)
        const fetchContactData = async () => {
            try {
                const response = await fetchAPI(ENDPOINTS.getSettings);
                // The API typically wraps data in 'data' object, or returns it directly
                const settings = response.data || response;

                // The API provides coordinates
                let parsedMapUrl = '';
                if (settings.latitude && settings.longitude) {
                    parsedMapUrl = `https://maps.google.com/maps?q=${settings.latitude},${settings.longitude}&hl=ar&z=15&output=embed`;
                } else if (settings.map_url || settings.map) {
                    const mapRaw = settings.map_url || settings.map;
                    parsedMapUrl = mapRaw.includes('<iframe') && mapRaw.includes('src="')
                        ? (mapRaw.match(/src="([^"]+)"/)?.[1] || mapRaw)
                        : mapRaw;
                }

                const newContactData = {
                    email: settings.email || '',
                    address: settings.address || settings.location || '',
                    mapUrl: parsedMapUrl
                };

                setContactData(newContactData);
                setLoading(false);

            } catch (error) {
                console.error('Error fetching contact data:', error);
                setLoading(false);
            }
        };

        fetchContactData();
    }, []);

    return (
        <div className="communication-page" id="contact-location">
            {/* قسم العنوان (Header) */}
            <div ref={headerRef} className={`communication-header ${headerInView ? 'animate__zoomInDown' : 'hidden-anim'}`}>
                <div className="header-content">
                    <h1 className='text-white'>تواصل معنا</h1>
                    <p className='p-white'>
                        نحن هنا لتحويل رؤيتك إلى واقع. زوروا معرضنا أو تواصلوا معنا لمناقشة مشروعكم القادم في عالم الألمنيوم والديكور.
                    </p>
                </div>
            </div>

            {/* قسم المحتوى الرئيسي */}
            <div ref={contentRef} className={`communication-container ${contentInView ? 'animate__fadeInUp' : 'hidden-anim'}`}>

                {/* قسم البطاقات (اليمين) */}
                <div className="contact-cards-section">

                    <div className="top-action-cards">
                        {/* بطاقة واتساب */}
                        <div className="action-card whatsapp-cards">
                            <div className="card-top">
                                <span className="card-subtitle">محادثة فورية</span>
                                <div className="icon-circle whatsapp-icon">
                                    <WhatsAppIcon />
                                </div>
                            </div>
                            <div className="card-body">
                                <h3>واتساب</h3>
                                <p>رد سريع للاستفسارات</p>
                                <button onClick={() => openWhatsApp()} className="btn whatsapp-btn" style={{ border: 'none', cursor: 'pointer', fontFamily: 'Regular', fontSize: 'inherit' }}>
                                    ابدأ المحادثة
                                </button>
                            </div>
                        </div>

                        {/* بطاقة الاتصال */}
                        <div className="action-card phone-card">
                            <div className="card-top">
                                <span className="card-subtitle">خدمة العملاء</span>
                                <div className="icon-circle phone-icon">
                                    <PhoneIcon />
                                </div>
                            </div>
                            <div className="card-body">
                                <h3>اتصل بنا</h3>
                                <p>متواجدون طوال أيام الأسبوع</p>
                                <button onClick={openContact} className="btn phone-btn" dir="ltr" style={{ border: 'none', cursor: 'pointer', fontFamily: 'Regular', fontSize: 'inherit' }}>
                                    اتصل بنا
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* بطاقة معلومات المعرض */}
                    <div className="info-card">
                        <h3 className="info-card-title">معلومات المعرض</h3>

                        <div className="info-list">
                            <div className="info-item">
                                <div className="info-icon-wrapper">
                                    <LocationOnIcon />
                                </div>
                                <div className="info-text">
                                    <h4>الموقع الرئيسي</h4>
                                    <p>
                                        {loading ? '...' : contactData.address.split('\n').map((line, i) => (
                                            <React.Fragment key={i}>
                                                {line}<br />
                                            </React.Fragment>
                                        ))}
                                    </p>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-icon-wrapper">
                                    <EmailIcon />
                                </div>
                                <div className="info-text">
                                    <h4>البريد الإلكتروني</h4>
                                    <p>{loading ? '...' : contactData.email}</p>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>

                {/* قسم الخريطة (اليسار) */}
                <div className="map-section">
                    {loading ? (
                        <div className="map-skeleton">جاري تحميل الخريطة... </div>
                    ) : (
                        <iframe
                            title="موقع المعرض"
                            src={contactData.mapUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    )}
                </div>

            </div>
        </div>
    );
};

export default CommunicationLocation;
