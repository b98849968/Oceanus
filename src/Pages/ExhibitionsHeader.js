import React, { useState, useEffect } from "react";
import "../styles/ExhibitionsHeader.css";
import "../styles/Familys.css";

// ملاحظة: تأكد من إضافة مسار الصورة المرسلة كخلفية هنا
// قمت بوضع خلفية افتراضية كمثال، يمكنك تغييرها بكل بساطة.
// ==============  import icoms   ====================//
import CallIcon from '@mui/icons-material/Call';
 import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
 import bgImg from "../assets/images/ExhibitionsHeader.jpg";
export default function ExhibitionsHeader({ contactApiEndpoint }) {
    // تعريف State زر التواصل
    const [contactData, setContactData] = useState({
        phone: "+966000000000",
        label: "تواصل معنا"
    });

    // جلب بيانات الاتصال من API إذا وُجد
    useEffect(() => {
        if (contactApiEndpoint) {
            fetch(contactApiEndpoint)
                .then(res => res.json())
                .then(data => {
                    if (data && data.phone) {
                        setContactData({
                            phone: data.phone,
                            label: data.label || "تواصل معنا"
                        });
                    }
                })
                .catch(err => console.error("Error fetching contact data:", err));
        }
    }, [contactApiEndpoint]);

    return (
        <section
            className="exhibitions-header-container"
        style={{ backgroundImage: `url(${bgImg})` }}
        >
            <div className="exh-fade-overlay">
                <div className="exh-content-wrapper">
        
                    {/* التاج العلوي */}
                    <div className="exh-badge">
                        إتقان في كل تفصيلة <span>✦</span> خبرة تتجاوز التوقعات
                    </div>

                    {/* العنوان الرئيسي */}
                    <h1 className="exh-main-title">
                        <span className="exh-title-navy">نصنع الجمال في</span>
                        <br />
                        <span className="exh-title-orange"> الديكور  والألمنيوم</span>
                    </h1>

                    {/* الوصف */}
                    <p className="exh-description">
                        اكتشف مجموعة واسعة من الأبواب، المطابخ، والنوافذ المصممة بأعلى معايير الجودة
                        لتناسب ذوقك وتلبي احتياجات مساحتك السكنية أو التجارية.
                    </p>

                    {/* أزرار الإجراء */}
                    <div className="exh-actions">
                        <a href={`tel:${contactData.phone}`} className="exh-btn-contact">
                            {contactData.label}
                            {/* أيقونة الهاتف (تعتمد على مشروعك إذا تستخدم FontAwesome) */}
                            <CallIcon />
                        </a>

                        <button className="exh-btn-browse">
                            تصفح أعمالنا
                            {/* أيقونة السهم للأسفل */}
                            {/* <i className="fa fa-arrow-down"></i> */}
                            <ArrowDownwardIcon />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
