import React, { useState, useEffect } from 'react';
import './style/pwaInstallPrompt.css';
import CloseIcon from '@mui/icons-material/Close';
import GetAppIcon from '@mui/icons-material/GetApp';
import IosShareIcon from '@mui/icons-material/IosShare';

export default function PwaInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // التحقق مما إذا كان التطبيق مثبتاً بالفعل
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
        if (isStandalone) {
            return;
        }

        // التحقق مما إذا كان المستخدم قد أغلق البانر في الجلسة الحالية
        const isDismissed = sessionStorage.getItem('oceanus_pwa_dismissed');
        if (isDismissed) {
            return;
        }

        // رصد أجهزة iOS (Safari)
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
        if (isIosDevice && !isStandalone) {
            setIsIOS(true);
            // إظهار بعد 4 ثوانٍ على أجهزة iOS
            const timer = setTimeout(() => setIsVisible(true), 4000);
            return () => clearTimeout(timer);
        }

        // الاستماع لحدث جاهزية التثبيت (Android, Chrome, Edge, Windows)
        const handleBeforeInstall = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            // إظهار البانر بعد 3 ثوانٍ من فتح الموقع لتجربة مستخدم مريحة
            setTimeout(() => setIsVisible(true), 3000);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstall);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('User accepted the PWA install prompt');
        }
        setDeferredPrompt(null);
        setIsVisible(false);
    };

    const handleDismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem('oceanus_pwa_dismissed', 'true');
    };

    if (!isVisible) return null;

    return (
        <aside className="pwa-install-banner" aria-label="تثبيت التطبيق">
            <div className="pwa-banner-header">
                <img src="/logo192.png" alt="شعار ورشة الأوقيانوس" className="pwa-banner-icon" />
                <div className="pwa-banner-info">
                    <h3 className="pwa-banner-title">ورشة الأوقيانوس</h3>
                    <p className="pwa-banner-desc">ثبّت التطبيق للوصول السريع بدون إنترنت</p>
                </div>
                <button
                    className="pwa-banner-close"
                    onClick={handleDismiss}
                    aria-label="إغلاق"
                    title="إغلاق"
                >
                    <CloseIcon style={{ fontSize: '18px' }} />
                </button>
            </div>

            {isIOS ? (
                <div className="pwa-ios-instructions">
                    <span>لتثبيت التطبيق على الآيفون: اضغط زر المشاركة</span>
                    <IosShareIcon style={{ fontSize: '16px', margin: '0 2px' }} />
                    <span>ثم اختر "إضافة إلى الشاشة الرئيسية"</span>
                </div>
            ) : (
                <div className="pwa-banner-actions">
                    <button className="pwa-btn-install" onClick={handleInstallClick}>
                        <GetAppIcon style={{ fontSize: '18px' }} />
                        تثبيت التطبيق الآن
                    </button>
                </div>
            )}
        </aside>
    );
}
