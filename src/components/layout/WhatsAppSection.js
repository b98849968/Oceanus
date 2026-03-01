import React, { useState, useEffect } from 'react';
import './style/WhatsAppSection.css';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DomainIcon from '@mui/icons-material/Domain';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ChatIcon from '@mui/icons-material/Chat';
import { fetchAPI, ENDPOINTS } from '../../API';

const WhatsAppSection = ({ isOpen, onClose, contactsUrl, initialContacts, message }) => {
    const [contacts, setContacts] = useState(initialContacts || []);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true);
            try {
                const response = await fetchAPI(ENDPOINTS.getSettings);
                const settings = response.data || response;

                const sourceArray = settings.whatsapp_numbers || settings.phones || [];

                if (Array.isArray(sourceArray) && sourceArray.length > 0) {
                    // Filter out numbers that are strictly for Contact/Call only
                    const validWhatsapp = sourceArray.filter(phone => {
                        if (typeof phone === 'object' && phone.type) {
                            return phone.type !== 'اتصال فقط' && phone.type !== 'call';
                        }
                        return true;
                    });

                    const mappedContacts = validWhatsapp.map((phone, index) => {
                        return typeof phone === 'string'
                            ? { id: index + 1, number: phone, label: 'تواصل معنا عبر واتساب', type: 'whatsapp' }
                            : {
                                id: index + 1,
                                number: phone.number || phone.phone || phone.whatsapp || String(phone),
                                label: phone.label || 'تواصل معنا عبر واتساب',
                                type: phone.type || 'whatsapp'
                            };
                    });
                    setContacts(mappedContacts);
                } else if (settings && (settings.whatsapp_number || settings.phone)) {
                    setContacts([{ id: 1, number: settings.whatsapp_number || settings.phone }]);
                }
            } catch (err) {
                console.error("Error fetching whatsapp contacts from API:", err);
            } finally {
                setLoading(false);
            }
        };

        if (!initialContacts && contacts.length === 0) {
            fetchContacts();
        }
    }, [initialContacts]);

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
                        contacts.map((contact, index) => {
                            // تنظيف وتنسيق الرقم ليقبله الواتساب مباشرة (بدون + أو مسافات أو أصفار البداية إذا وجد مفتاح الدولة)
                            let formattedNumber = contact.number.replace(/[\s\+\-]/g, '');
                            // إذا كان الرقم يبدأ بـ 00، نستبدلها لنحصل على مفتاح الدولة فقط (مثلاً 00966 -> 966)
                            if (formattedNumber.startsWith('00')) {
                                formattedNumber = formattedNumber.substring(2);
                            }
                            
                            // إضافة نص الرسالة إذا وجد
                            // لضمان أن الواتساب يقرأ الرابط بشكل صحيح، نتبعه بمسافة فارغة
                            const messageQuery = message ? `?text=${encodeURIComponent(message + " ")}` : '';
                            
                            return (
                                contact.type !== 'call' && contact.type !== 'اتصال فقط' && (
                                    <a
                                        href={`https://wa.me/${formattedNumber}${messageQuery}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        key={contact.id || index}
                                        className="whatsapp-card"
                                    >
                                        <div className="whatsapp-card-icon">
                                            <ChatIcon />
                                        </div>
                                        <div className="whatsapp-card-info">
                                            <span className="whatsapp-category" style={{ fontFamily: 'Regular' }}>{contact.label || 'تواصل معنا عبر واتساب انقر هنا'}</span>
                                            <strong className="whatsapp-number" dir="ltr" style={{ fontFamily: 'Bolds' }}>+{formattedNumber}</strong>
                                        </div>
                                    </a>
                                )
                            );
                        })
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
