import React, { useState, useEffect } from 'react';
import './style/projectCardDisply.css';

import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DownloadIcon from '@mui/icons-material/Download';

export default function ProjectCardDisplay({
    isOpen,
    onClose,
    apiEndpoint, // استقبال رابط ال API لجلب الداتا مستقبلاً
    projectData // أو استقبال البيانات برمجياً كـ props إذا لم تكن من الـ API
}) {
    // حالة لتخزين بيانات المشروع
    const [data, setData] = useState({
        title: "باب داخلي بلوط كلاسيك",
        category: "معرض الخشب",
        subCategory: "أبواب",
        description: "باب داخلي مصنوع من خشب البلوط الطبيعي الصافي، معالج ضد الرطوبة والخدش. يتميز بتفاصيل محفورة كلاسيكية وإطار (فريم) صلب يتحمل الاستخدام الشاق. متوفر بعدة درجات لونية حسب طلب العميل ويتم تفصيله بالمقاسات الدقيقة لمساحتك.",
        images: [
            "https://oceanus.website/index17/files/upload/834241e0066d1f03f3938abef9f61b36-max.webp", // صورة مؤقتة كمثال
            "https://oceanus.website/index17/files/upload/ecb40a5a3a41bd2b40449bb1517ade6d-max.webp",
            "https://oceanus.website/index17/files/upload/3cb13e51cd08c8e14b600d89fd103859-max.webp"
        ],
        whatsappNumber: "+96600000000" // الرقم للتواصل
    });

    // حالة الصورة الرئيسية المعروضة
    const [mainImage, setMainImage] = useState("");

    // جلب البيانات من API إن وجد
    useEffect(() => {
        if (apiEndpoint) {
            fetch(apiEndpoint)
                .then(res => res.json())
                .then(apiData => {
                    setData(apiData);
                    if (apiData.images && apiData.images.length > 0) {
                        setMainImage(apiData.images[0]);
                    }
                })
                .catch(err => console.error("Error fetching project data: ", err));
        } else if (projectData) {
            setData(projectData);
            if (projectData.images && projectData.images.length > 0) {
                setMainImage(projectData.images[0]);
            }
        } else {
            // كقيمة افتراضية عند عدم تمرير بيانات
            setMainImage(data.images[0]);
        }
    }, [apiEndpoint, projectData]);

    // وظيفة تكبير/تنزيل الصورة (تفتح في نافذة جديدة)
    const handleDownloadZoom = (imgUrl) => {
        window.open(imgUrl, '_blank');
    };

    // وظيفة تنزيل الصورة فعلياً
    const handleDownload = async (imgUrl, e) => {
        if (e) e.stopPropagation();
        try {
            const response = await fetch(imgUrl);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = data.title ? `${data.title}.jpg` : "download.jpg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Error downloading image:", error);
            // خطة بديلة لو فشل الجلب (مثلاً بسبب CORS) يفتح الصورة في نافذة جديدة
            window.open(imgUrl, '_blank');
        }
    };

    if (!isOpen) return null;

    // رسالة الواتساب المجهزة مسبقاً
    const whatsappMessage = encodeURIComponent(`مرحباً، أود الاستفسار والتسعير عن هذا التصميم: ${data.title}`);

    return (
        <div className="pcd-modal-overlay">
            <div className="pcd-modal-container">
                {/* زر الإغلاق */}
                <button className="pcd-close-btn" onClick={onClose}>
                    <CloseIcon />
                </button>

                <div className="pcd-modal-content">
                    {/* القسم الأيمن: التفاصيل */}
                    <div className="pcd-details-section">
                        <div className="pcd-tags">
                            <span className="pcd-tag-category">{data.category}</span>
                            <span className="pcd-tag-sub">{data.subCategory}</span>
                        </div>

                        <h2 className="pcd-title">{data.title}</h2>
                        <p className="pcd-description">{data.description}</p>

                        <div className="pcd-contact-box">
                            <p>أعجبك هذا التصميم؟ تواصل معنا لتنفيذه أو تعديله لمساحتك</p>
                            <a
                                href={`https://wa.me/${data.whatsappNumber}?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pcd-btn-whatsapp"
                            >
                                اطلب التسعير عبر واتساب
                                <WhatsAppIcon />
                            </a>
                        </div>
                    </div>

                    {/* القسم الأيسر: الصور */}
                    <div className="pcd-image-section">
                        {/* الصورة الرئيسية */}
                        <div className="pcd-main-image-container">
                            <img
                                src={mainImage}
                                alt={data.title}
                                className="pcd-main-image"
                                onClick={() => handleDownloadZoom(mainImage)}
                                title="انقر لتكبير الصورة"
                            />
                            {/* زر التنزيل */}
                            <button
                                className="pcd-download-btn"
                                onClick={(e) => handleDownload(mainImage, e)}
                                title="تنزيل الصورة"
                            >
                                <DownloadIcon />
                            </button>
                        </div>

                        {/* الصور المصغرة */}
                        <div className="pcd-thumbnails">
                            {data.images && data.images.map((img, index) => (
                                <div
                                    key={index}
                                    className={`pcd-thumb-container ${mainImage === img ? 'active' : ''}`}
                                    onClick={() => setMainImage(img)}
                                >
                                    <img src={img} alt={`${data.title} - ${index}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
