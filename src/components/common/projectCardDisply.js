import React, { useState, useEffect, useRef } from 'react';
import './style/projectCardDisply.css';

import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useContact } from '../../context/ContactContext';
import { BASE_URL } from '../../API';

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

    const thumbnailsRef = useRef(null);
    const [showArrows, setShowArrows] = useState(false);

    // فحص ما إذا كان هناك حاجة للأسهم (عنصر التمرير أكبر من الحاوية)
    const checkOverflow = () => {
        if (thumbnailsRef.current) {
            const { scrollWidth, clientWidth } = thumbnailsRef.current;
            setShowArrows(scrollWidth > clientWidth);
        }
    };

    // مراقبة التغيرات في حجم النافذة أو عند تغير الصور لتحديث حالة الأسهم
    useEffect(() => {
        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [data.images]);

    const scrollThumbnails = (direction) => {
        if (thumbnailsRef.current) {
            const scrollAmount = 150;
            if (direction === 'left') {
                thumbnailsRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                thumbnailsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

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
                    if (finalData.image) {
                        allImages.push({ url: finalData.image, size: finalData.image_size || finalData.size || '' });
                    }
                    if (finalData.extra_images && Array.isArray(finalData.extra_images)) {
                        const extras = finalData.extra_images.map(imgObj => ({
                            url: imgObj.image || (typeof imgObj === 'string' ? imgObj : ''),
                            size: imgObj.image_size || imgObj.size || ''
                        }));
                        allImages = [...allImages, ...extras];
                    } else if (finalData.images && Array.isArray(finalData.images)) {
                        const extras = finalData.images.map(imgObj => ({
                            url: imgObj.image || (typeof imgObj === 'string' ? imgObj : ''),
                            size: imgObj.image_size || imgObj.size || ''
                        }));
                        allImages = [...allImages, ...extras];
                    }

                    setData({ ...finalData, images: allImages });
                    if (allImages.length > 0) {
                        setMainImage(allImages[0]);
                    }
                })
                .catch(err => { });
        } else if (projectData) {
            // Combine main image and extra_images from props
            let allImages = [];
            if (projectData.image) {
                allImages.push({ url: projectData.image, size: projectData.image_size || projectData.size || '' });
            }

            if (projectData.extra_images && Array.isArray(projectData.extra_images)) {
                // Handle objects { id: x, image: 'url', size: '...' } or plain strings
                const extras = projectData.extra_images.map(imgObj => ({
                    url: imgObj.image || (typeof imgObj === 'string' ? imgObj : ''),
                    size: imgObj.image_size || imgObj.size || ''
                }));
                allImages = [...allImages, ...extras];
            } else if (projectData.images && Array.isArray(projectData.images)) {
                const extras = projectData.images.map(imgObj => ({
                    url: imgObj.image || (typeof imgObj === 'string' ? imgObj : ''),
                    size: imgObj.image_size || imgObj.size || ''
                }));
                allImages = [...allImages, ...extras];
            }

            // Fallback strategy to prevent duplicate main image
            const uniqueImages = [];
            const seenUrls = new Set();
            for (const img of allImages) {
                if (!seenUrls.has(img.url)) {
                    seenUrls.add(img.url);
                    uniqueImages.push(img);
                }
            }
            allImages = uniqueImages;

            setData({ ...projectData, images: allImages });
            if (allImages.length > 0) {
                setMainImage(allImages[0]);
            }
        }
    }, [apiEndpoint, projectData]);

    // وظيفة تكبير الصورة (تفتح في نافذة جديدة)
    const handleDownloadZoom = (imgUrl) => {
        if (!imgUrl) return;
        const fullUrl = `${BASE_URL}${imgUrl}`;
        window.open(fullUrl, '_blank');
    };

    // وظيفة تنزيل الصورة فعلياً باستخدام Fetch لتحويلها لـ Blob وتجنب مشاكل الـ CORS
    // const handleDownload = async (imgUrl, e) => {
    //     if (e) e.stopPropagation();
    //     if (!imgUrl) return;

    //     setIsDownloading(true);
    //     setSnackbarMessage("جاري تحضير التنزيل...");
    //     setSnackbarSeverity("info");
    //     setSnackbarOpen(true);

    //     try {
    //         const fullUrl = `${BASE_URL}${imgUrl}`;
    //         const response = await fetch(fullUrl);
            
    //         if (!response.ok) throw new Error('فشل في جلب الصورة');
            
    //         const blob = await response.blob();
    //         const blobURL = URL.createObjectURL(blob);
            
    //         const a = document.createElement("a");
    //         a.href = blobURL;
    //         const fileName = data.title ? `${data.title.replace(/\s+/g, "_")}.jpg` : "image.jpg";
    //         a.download = fileName;
    //         document.body.appendChild(a);
    //         a.click();
            
    //         // تنظيف
    //         document.body.removeChild(a);
    //         URL.revokeObjectURL(blobURL);

    //         setSnackbarMessage("تم التنزيل بنجاح");
    //         setSnackbarSeverity("success");
    //         setSnackbarOpen(true);
    //     } catch (error) {
            
    //         setSnackbarMessage("حدث خطأ أثناء التنزيل. قد يكون بسبب قيود CORS");
    //         setSnackbarSeverity("error");
    //         setSnackbarOpen(true);
            
    //         // محاولة بديلة: فتح الصورة في علامة تبويب جديدة كحل أخير
    //         window.open(`${BASE_URL}${imgUrl}`, '_blank');
    //     } finally {
    //         setIsDownloading(false);
    //     }
    // };
    const handleDownload = async (imgUrl, e) => {
    if (e) e.stopPropagation();
    if (!imgUrl) return;

    let path = imgUrl.replace(/^\/?storage\//, "");
    if (path.startsWith('/')) {
        path = path.substring(1);
    }

    const fullUrl = `${BASE_URL}/api/download/${path}`;
    const fileName = data.title ? data.title.replace(/\s+/g, "_") + ".jpg" : "image.jpg";

    // إظهار حالة التنزيل
    setIsDownloading(true);
    setSnackbarMessage("جاري التنزيل...");
    setSnackbarSeverity("info");
    setSnackbarOpen(true);

    try {
        // 1. جلب الصورة كبيانات
        const response = await fetch(fullUrl, {
            // إذا واجهت مشكلة CORS أضف Mode
            // mode: 'cors' 
        });
        
        if (!response.ok) throw new Error("Network response was not ok");

        // 2. تحويل البيانات إلى Blob (ملف ثنائي)
        const blob = await response.blob();
        
        // 3. إنشاء رابط محلي مؤقت للملف
        const blobUrl = window.URL.createObjectURL(blob);

        // 4. عملية التنزيل
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        
        // 5. تنظيف الرابط بعد التنزيل
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);

        setSnackbarMessage("تم التنزيل بنجاح");
        setSnackbarSeverity("success");
    } catch (error) {
        console.error("Error downloading image:", error);
        setSnackbarMessage("حدث خطأ أثناء التنزيل، تم فتح الصورة في نافذة جديدة");
        setSnackbarSeverity("error");
        
        // حل بديل في حال فشل الـ Fetch بسبب CORS
        window.open(fullUrl, '_blank');
    } finally {
        setIsDownloading(false);
    }
};
    // وظيفة المشاركة للمشروع
    const handleShare = async (e) => {
        if (e) e.stopPropagation();

        const projectId = data.id || `project-${data.title}`;
        const shareUrl = `${window.location.origin}${window.location.pathname}?project=${projectId}`;

        const fallbackCopy = () => {
            try {
                const textArea = document.createElement("textarea");
                textArea.value = shareUrl;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                setSnackbarMessage('تم نسخ رابط المشروع إلى الحافظة');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            } catch (err) {}
        };

        if (navigator.share) {
            try {
                await navigator.share({
                    url: shareUrl,
                });
            } catch (error) {
                if (error.name !== 'AbortError') {
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(shareUrl).then(() => {
                            setSnackbarMessage('تم نسخ رابط المشروع إلى الحافظة');
                            setSnackbarSeverity('success');
                            setSnackbarOpen(true);
                        }).catch(() => fallbackCopy());
                    } else {
                        fallbackCopy();
                    }
                }
            }
        } else {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(shareUrl).then(() => {
                    setSnackbarMessage('تم نسخ رابط المشروع إلى الحافظة');
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                }).catch(() => fallbackCopy());
            } else {
                fallbackCopy();
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="pcd-modal-overlay" onClick={onClose}>
            <div className="pcd-modal-container" onClick={(e) => e.stopPropagation()}>
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
                                onClick={() => {
                                    const baseUrl = window.location.origin + window.location.pathname;
                                    const shareUrl = `${baseUrl}?project=${data.id || `project-${data.title}`}`;
                                    openWhatsApp(`مرحباً، لقد أعجبني هذا التصميم وأرغب بالاستفسار عنه:\n${data.title}\n\n${shareUrl}`);
                                }}
                                className="pcd-btn-whatsapp"
                                style={{ border: 'none', cursor: 'pointer', fontSize: 'inherit', width: '100%', fontFamily: 'Bolds' }}
                            >
                                اطلب التسعير عبر واتساب
                                <WhatsAppIcon />
                            </button>
                        </div>
                    </div>

                    {/* القسم الأيسر: الصور */}
                    <div className="pcd-image-section">
                        {/* الصورة الرئيسية */}
                        <div className={`pcd-main-image-container ${mainImage?.size === 'طول' ? 'img-portrait-container' : mainImage?.size === 'عرض' ? 'img-landscape-container' : mainImage?.size === 'مربع' ? 'img-square-container' : ''}`}>
                            <img
                                src={mainImage?.url ? `${BASE_URL}${mainImage.url}` : ''}
                                loading="lazy"
                                alt={data.title}
                                className={`pcd-main-image ${mainImage?.size === 'طول' ? 'img-portrait' : mainImage?.size === 'عرض' ? 'img-landscape' : mainImage?.size === 'مربع' ? 'img-square' : ''}`}

                                onClick={() => handleDownloadZoom(mainImage?.url)}
                                title="انقر لتكبير الصورة"
                            />


                            {/* أزرار التنزيل والمشاركة */}
                            <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '10px', zIndex: 5 }}>
                                <button
                                    className="pcd-download-btn"
                                    style={{ position: 'relative', top: 'auto', right: 'auto' }}
                                    onClick={(e) => handleDownload(mainImage?.url, e)}
                                    title="تنزيل الصورة"
                                    disabled={isDownloading}
                                >
                                    {isDownloading ? <CircularProgress size={24} style={{ color: 'inherit' }} /> : <DownloadIcon />}
                                </button>
                                <button
                                    className="pcd-download-btn"
                                    style={{ position: 'relative', top: 'auto', right: 'auto' }}
                                    onClick={handleShare}
                                    title="مشاركة المشروع"
                                >
                                    <ShareIcon />
                                </button>
                            </div>
                        </div>

                        {/* الصور المصغرة */}
                        <div className="pcd-thumbnails-wrapper">
                            {showArrows && (
                                <button className="pcd-scroll-btn" onClick={(e) => { e.stopPropagation(); scrollThumbnails('right'); }}>
                                    <ArrowForwardIosIcon style={{ fontSize: '1rem', marginLeft: '3px' }} />
                                </button>
                            )}

                            <div className="pcd-thumbnails" ref={thumbnailsRef}>
                                {data.images && data.images.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`pcd-thumb-container ${mainImage?.url === img.url ? 'active' : ''}`}
                                        onClick={() => setMainImage(img)}
                                    >
                                        <img src={`${BASE_URL}${img.url}`} loading="lazy" alt={`${data.title} - ${index}`} />
                                    </div>
                                ))}
                            </div>

                            {showArrows && (
                                <button className="pcd-scroll-btn" onClick={(e) => { e.stopPropagation(); scrollThumbnails('left'); }}>
                                    <ArrowBackIosIcon style={{ fontSize: '1rem', marginRight: '3px' }} />
                                </button>
                            )}
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

