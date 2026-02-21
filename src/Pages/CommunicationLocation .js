import React, { useState, useEffect } from 'react';
import '../styles/CommunicationLocation .css';
import '../styles/Familys.css';


// ========= ايقونات mui ===============//
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
const CommunicationLocation = () => {
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
                // const response = await fetch('https://api.example.com/contact');
                // const data = await response.json();

                // بيانات تجريبية مطابقة للتصميم
                const mockData = {
                    whatsapp: 'https://wa.me/967772825734',
                    phone: '+967 772825734',
                    email: 'b98849968@gmail.com',
                    address: 'طريق الملك فهد، حي العليا\nالرياض، المملكة العربية السعودية',

                    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.6367746961445!2d46.66679541500336!3d24.704604584126485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2z2KfZhNix2YrYp9i2!5e0!3m2!1sar!2s!4v1710000000000!5m2!1sar!2s'
                };

                // محاكاة تأخير الشبكة لتوضيح حالة التحميل
                setTimeout(() => {
                    setContactData(mockData);
                    setLoading(false);
                }, 800);

            } catch (error) {
                console.error('Error fetching contact data:', error);
                setLoading(false);
            }
        };

        fetchContactData();
    }, []);

    return (
        <div className="communication-page">
            {/* قسم العنوان (Header) */}
            <div className="communication-header">
                <div className="header-content">
                    <h1>تواصل معنا</h1>
                    <p>
                        نحن هنا لتحويل رؤيتك إلى واقع. زوروا معرضنا أو تواصلوا معنا لمناقشة مشروعكم القادم في عالم الألمنيوم والديكور.
                    </p>
                </div>
            </div>

            {/* قسم المحتوى الرئيسي */}
            <div className="communication-container">

                {/* قسم البطاقات (اليمين) */}
                <div className="contact-cards-section">

                    <div className="top-action-cards">
                        {/* بطاقة واتساب */}
                        <div className="action-card whatsapp-card">
                            <div className="card-top">
                                <span className="card-subtitle">محادثة فورية</span>
                                <div className="icon-circle whatsapp-icon">
                                    <WhatsAppIcon />
                                </div>
                            </div>
                            <div className="card-body">
                                <h3>واتساب</h3>
                                <p>رد سريع للاستفسارات</p>
                                <a href={contactData.whatsapp} target="_blank" rel="noopener noreferrer" className="btn whatsapp-btn">
                                    ابدأ المحادثة
                                </a>
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
                                <a href={`tel:${contactData.phone.replace(/\s+/g, '')}`} className="btn phone-btn" dir="ltr">
                                    {loading ? '...' : contactData.phone}
                                </a>
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
                        <div className="map-skeleton">جاري تحميل الخريطة...</div>
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
