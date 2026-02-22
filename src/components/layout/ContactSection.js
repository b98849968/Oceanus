import React, { useState, useEffect } from 'react';
import './style/ContactSection.css';
import CloseIcon from '@mui/icons-material/Close';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import DomainIcon from '@mui/icons-material/Domain';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BuildIcon from '@mui/icons-material/Build';

const defaultContacts = [
    {
        id: 1,
        number: '050 000 0001',
    },
    {
        id: 2,
        number: '050 000 0002',
    },
    {
        id: 3,
        number: '050 000 0003',
    }
];

const ContactSection = ({ isOpen, onClose, contactsUrl, initialContacts }) => {
    const [contacts, setContacts] = useState(initialContacts || defaultContacts);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // يمكن استدعاء الـ API هنا في أي وقت يتم تمرير رابط أو الاعتماد على دالة تحديث
        if (contactsUrl) {
            setLoading(true);
            fetch(contactsUrl)
                .then(res => res.json())
                .then(data => {
                    if (data && data.length > 0) {
                        setContacts(data);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching contacts:", err);
                    setLoading(false);
                });
        }
    }, [contactsUrl]);

    if (!isOpen) return null;



    return (
        <div className="contact-modal-overlay" onClick={onClose}>
            <div className="contact-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="contact-close-btn" onClick={onClose}>
                    <CloseIcon />
                </button>

                <div className="contact-header">
                    <div className="contact-header-icon">
                        <PermContactCalendarIcon />
                    </div>
                    <h2 className="contact-title" style={{ fontFamily: 'Bolds' }}>اتصل بنا الآن</h2>
                    <p className="contact-subtitle" style={{ fontFamily: 'Regular' }}>اختر القسم الذي ترغب في التواصل معه</p>
                </div>

                <div className="contact-list">
                    {loading ? (
                        <p className="loading-text" style={{ fontFamily: 'Regular' }}>جاري التحميل...</p>
                    ) : (
                        contacts.map((contact, index) => (
                            <a href={`tel:${contact.number.replace(/\s+/g, '')}`} key={contact.id || index} className="contact-card">
                                <div className="contact-card-icon">
                                    <LocalPhoneIcon />
                                </div>
                                <div className="contact-card-info">
                                    <span className="contact-category" style={{ fontFamily: 'Regular' }}> تواصل معنا عبر الهاتف انقر هنا </span>
                                    <strong className="contact-number" style={{ fontFamily: 'Bolds' }}>{contact.number}</strong>
                                </div>
                            </a>
                        ))
                    )}
                </div>

                {/* <div className="contact-footer">
                        ساعات العمل: من 8 صباحاً حتى 9 مساءً
                    </div> */}
            </div>
        </div>
    );
};

export default ContactSection;
