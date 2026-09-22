import React, { useState, useEffect } from "react";
import "../styles/ExhibitionsHeader.css";
import "../styles/Familys.css";

// ملاحظة: تأكد من إضافة مسار الصورة المرسلة كخلفية هنا
// قمت بوضع خلفية افتراضية كمثال، يمكنك تغييرها بكل بساطة.
// ==============  import icoms   ====================//
import CallIcon from '@mui/icons-material/Call';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import bgImg from "../assets/images/ExhibitionsHeader.jpg";
import { useContact } from "../context/ContactContext";
import { fetchAPI, ENDPOINTS } from "../API";

export default function ExhibitionsHeader() {
    // تعريف State زر التواصل
    const [contactData, setContactData] = useState({
        phone: "+966000000000",
        label: "تواصل معنا"
    });

    const { openContact } = useContact();

    // جلب بيانات الاتصال من API إذا وُجد
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

    return (
        <section
            className="exhibitions-header-container"
            style={{ backgroundImage: `url(${bgImg})` }}
        >
            <div className="exh-fade-overlay">
                <div className="exh-content-wrapper">

                    {/* التاج العلوي */}
                    <div className="exh-badge animate__fadeInLeft">
                        إتقان في كل تفصيل <span>✦</span> خبرة تتجاوز التوقعات
                    </div>

                    {/* العنوان الرئيسي */}
                    <h1 className="exh-main-title animate__backInRight">
                        <span className="exh-title-navy">نصنع الجمال في</span>
                        <br />
                        <span className="exh-title-orange"> الديكور  والألمنيوم</span>
                    </h1>

                    {/* الوصف */}
                    <p className="exh-description animate__backInLeft">
                        اكتشف مجموعة واسعة من الأبواب، المطابخ، والنوافذ المصممة بأعلى معايير الجودة
                        لتناسب ذوقك وتلبي احتياجات مساحتك السكنية أو التجارية.
                    </p>

                    {/* أزرار الإجراء */}
                    <div className="exh-actions animate__fadeInLeft">
                        <button onClick={openContact} className="exh-btn-contact" style={{ border: 'none', cursor: 'pointer' }}>
                            {contactData.label}
                            {/* أيقونة الهاتف (تعتمد على مشروعك إذا تستخدم FontAwesome) */}
                            <CallIcon />
                        </button>

                        <button
                            className="exh-btn-browse"
                            onClick={() => {
                                const el = document.getElementById("exhibitions-gallery");
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
