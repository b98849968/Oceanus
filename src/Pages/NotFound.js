import React from 'react';
import '../styles/NotFound.css';
import '../styles/Familys.css'; // For custom fonts

export default function NotFound() {
    return (
        <div className="notfound-container">
            <div className="notfound-content">
                <h1 className="notfound-code">404</h1>
                <h2 className="notfound-title">عذراً، الصفحة غير موجودة!</h2>
                <p className="notfound-message">
                    يبدو أن الصفحة التي تبحث عنها قد تم نقلها أو حذفها أو لم يعد لها وجود.
                </p>
                <a href="/" className="notfound-button">
                    العودة للصفحة الرئيسية
                </a>
            </div>
        </div>
    );
}
