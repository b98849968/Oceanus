import React, { useState, useEffect } from 'react';
import './style/WhatsAppSection.css';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DomainIcon from '@mui/icons-material/Domain';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ChatIcon from '@mui/icons-material/Chat';

const defaultContacts = [
    {
        id: 1,
        number: '967773596059',
    },
    {
        id: 2,
        number: '966500000002',
    },
    {
        id: 3,
        number: '966500000003',
    }
];

const WhatsAppSection = ({ isOpen, onClose, contactsUrl, initialContacts }) => {
    const [contacts, setContacts] = useState(initialContacts || defaultContacts);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
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
                    console.error("Error fetching whatsapp contacts:", err);
                    setLoading(false);
                });
        }
    }, [contactsUrl]);

    if (!isOpen) return null;    // Uncomment this if conditional rendering is inside the parent instead of here

    const renderIcon = (type) => {
        switch (type) {
            case 'building': return <DomainIcon />;
            case 'chat': return <ChatIcon />;
            case 'support': return <SupportAgentIcon />;
            default: return <WhatsAppIcon />;
        }
    };

    return (
        <div className="whatsapp-modal-overlay" onClick={onClose}>
            <div className="whatsapp-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="whatsapp-close-btn" onClick={onClose}>
                    <CloseIcon />
                </button>

                <div className="whatsapp-header">
                    <div className="whatsapp-header-icon">
                        <WhatsAppIcon />
                    </div>
                    <h2 className="whatsapp-title" style={{ fontFamily: 'Bolds' }}>راسلنا الآن</h2>
                    <p className="whatsapp-subtitle" style={{ fontFamily: 'Regular' }}>اختر القسم الذي ترغب في مراسلته عبر واتساب</p>
                </div>

                <div className="whatsapp-list">
                    {loading ? (
                        <p className="loading-text" style={{ fontFamily: 'Regular' }}>جاري التحميل...</p>
                    ) : (
                        contacts.map((contact, index) => (
                            <a
                                href={`https://wa.me/${contact.number.replace(/\s+/g, '').replace('+', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={contact.id || index}
                                className="whatsapp-card"
                            >
                                <div className="whatsapp-card-icon">
                                    <ChatIcon />
                                </div>
                                <div className="whatsapp-card-info">
                                    <span className="whatsapp-category" style={{ fontFamily: 'Regular' }}>تواصل معنا عبر واتساب  انقر هنا</span>
                                    <strong className="whatsapp-number" dir="ltr" style={{ fontFamily: 'Bolds' }}>+{contact.number.replace('+', '')}</strong>
                                </div>
                            </a>
                        ))
                    )}
                </div>

                {/* <div className="whatsapp-footer">
                    ساعات العمل: من 8 صباحاً حتى 9 مساءً
                </div> */}
            </div>
        </div>
    );
};

export default WhatsAppSection;
