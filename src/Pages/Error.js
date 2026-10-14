import React from 'react';
import '../styles/Error.css';
import '../styles/Familys.css'; // For custom fonts
// eslint-disable-next-line
export default function ErrorPage({ error }) {
    return (
        <div className="error-container">
            <div className="error-content">
                <div className="error-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <h1 className="error-title">عذراً، حدث خطأ غير متوقع!</h1>
                <p className="error-message">
                    نعتذر، واجهنا مشكلة فنية أثناء تحميل الصفحة. يرجى المحاولة مرة أخرى لاحقاً أو العودة إلى الصفحة الرئيسية.
                </p>
                {/* <p className="error-details">
                    {error?.message && `التفاصيل: ${error.message}`}
                </p> */}
                <div className="error-actions">
                    <button onClick={() => window.location.reload()} className="error-button reload-btn">
                        تحديث الصفحة
                    </button>
                    <a href="/" className="error-button home-btn">
                        العودة للرئيسية
                    </a>
                </div>
            </div>
        </div>
    );
}
