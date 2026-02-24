import React, { useState, useEffect } from 'react';
import './style/projectCardDisply.css';

import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DownloadIcon from '@mui/icons-material/Download';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useContact } from '../../context/ContactContext';

export default function ProjectCardDisplay({
    isOpen,
    onClose,
    apiEndpoint, // استقبال رابط ال API لجلب الداتا مستقبلاً
    projectData // أو استقبال البيانات برمجياً كـ props إذا لم تكن من الـ API
}) {
    // حالة لتخزين بيانات المشروع
    const { openWhatsApp } = useContact();

    const [data, setData] = useState({});

    // حالة الصورة الرئيسية المعروضة
    const [mainImage, setMainImage] = useState("");

    // حالات التنزيل
    const [isDownloading, setIsDownloading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    // جلب البيانات من API إن وجد
    useEffect(() => {
        if (apiEndpoint) {
            fetch(apiEndpoint)
                .then(res => res.json())
                .then(apiData => {
                    const finalData = apiData.data || apiData;

                    // Combine main image and extra_images
                    let allImages = [];
                    if (finalData.image) allImages.push(finalData.image);
                    if (finalData.extra_images && Array.isArray(finalData.extra_images)) {
                        const extras = finalData.extra_images.map(imgObj => imgObj.image || imgObj);
                        allImages = [...allImages, ...extras];
                    } else if (finalData.images && Array.isArray(finalData.images)) {
                        allImages = [...finalData.images];
                    }

                    setData({ ...finalData, images: allImages });
                    if (allImages.length > 0) {
                        setMainImage(allImages[0]);
                    }
                })
                .catch(err => console.error("Error fetching project data: ", err));
        } else if (projectData) {
            // Combine main image and extra_images from props
            let allImages = [];
            if (projectData.image) allImages.push(projectData.image);

            if (projectData.extra_images && Array.isArray(projectData.extra_images)) {
                // Handle objects { id: x, image: 'url' } or plain strings
                const extras = projectData.extra_images.map(imgObj => imgObj.image || imgObj);
                allImages = [...allImages, ...extras];
            } else if (projectData.images && Array.isArray(projectData.images)) {
                allImages = [...projectData.images];
            }

            // Fallback strategy to prevent duplicate main image if it was already in extra_images
            allImages = [...new Set(allImages)];

            setData({ ...projectData, images: allImages });
            if (allImages.length > 0) {
                setMainImage(allImages[0]);
            }
        }
    }, [apiEndpoint, projectData]);

    // وظيفة تكبير الصورة (تفتح في نافذة جديدة)
    const handleDownloadZoom = (imgUrl) => {
        const fullUrl = `http://localhost:8000${imgUrl}`;
        window.open(fullUrl, '_blank');
    };

    // وظيفة تنزيل الصورة فعلياً
    const handleDownload = async (imgUrl, e) => {
        if (e) e.stopPropagation();
        if (isDownloading) return;

        const fullUrl = `http://localhost:8000${imgUrl}`;
        setIsDownloading(true);

        try {
            const response = await fetch(fullUrl);
            if (!response.ok) throw new Error("Network response was not ok");
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = data.title ? `${data.title}.jpg` : "download.jpg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);

            setSnackbarMessage("تم تنزيل الصورة في جهازك بنجاح");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Error downloading image:", error);
            // خطة بديلة لو فشل الجلب (مثلاً بسبب CORS) يفتح الصورة في نافذة جديدة
            window.open(fullUrl, '_blank');
            setSnackbarMessage("تعذر التنزيل المباشر، تم فتح الصورة في نافذة جديدة");
            setSnackbarSeverity("warning");
            setSnackbarOpen(true);
        } finally {
            setIsDownloading(false);
        }
    };

    if (!isOpen) return null;

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

                            <span className="pcd-tag-sub">{data.category}</span>
                        </div>

                        <h2 className="pcd-title">{data.title}</h2>
                        <p className="pcd-description">{data.description}</p>

                        <div className="pcd-contact-box">
                            <p>أعجبك هذا التصميم؟ تواصل معنا لتنفيذه أو تعديله لمساحتك</p>
                            <button
                                onClick={openWhatsApp}
                                className="pcd-btn-whatsapp"
                                style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', width: '100%', fontFamily: 'Bolds' }}
                            >
                                اطلب التسعير عبر واتساب
                                <WhatsAppIcon />
                            </button>
                        </div>
                    </div>

                    {/* القسم الأيسر: الصور */}
                    <div className="pcd-image-section">
                        {/* الصورة الرئيسية */}
                        <div className="pcd-main-image-container">
                            <img
                                src={`http://localhost:8000${mainImage}`}
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
                                disabled={isDownloading}
                            >
                                {isDownloading ? <CircularProgress size={24} style={{ color: 'white' }} /> : <DownloadIcon />}
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
                                    <img src={`http://localhost:8000${img}`} alt={`${data.title} - ${index}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* إشعار التنزيل */}
            <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%', fontFamily: 'inherit' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

