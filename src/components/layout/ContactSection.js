import React, { useState, useEffect } from 'react';
import './style/ContactSection.css';
import CloseIcon from '@mui/icons-material/Close';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import DomainIcon from '@mui/icons-material/Domain';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BuildIcon from '@mui/icons-material/Build';
import { fetchAPI, ENDPOINTS } from '../../API';

const ContactSection = ({ isOpen, onClose, contactsUrl, initialContacts }) => {
    const [contacts, setContacts] = useState(initialContacts || []);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true);
            try {
                const response = await fetchAPI(ENDPOINTS.getSettings);
                const settings = response.data || response;

                if (settings && settings.phones && Array.isArray(settings.phones)) {
                    // Filter out numbers that are strictly for WhatsApp only
                    const validPhones = settings.phones.filter(phone => {
                        if (typeof phone === 'object' && phone.type) {
                            return phone.type !== 'واتساب فقط' && phone.type !== 'whatsapp';
                        }
                        return true;
                    });

                    const mappedContacts = validPhones.map((phone, index) => {
                        return typeof phone === 'string'
                            ? { id: index + 1, number: phone, label: 'تواصل معنا عبر الهاتف', type: 'call' }
                            : {
                                id: index + 1,
                                number: phone.number || phone.phone || String(phone),
                                label: phone.label || 'تواصل معنا عبر الهاتف',
                                type: phone.type || 'call'
                            };
                    });

                    setContacts(mappedContacts);
                } else if (settings && settings.phone) {
                    setContacts([{ id: 1, number: settings.phone }]);
                }
            } catch (err) {
                console.error("Error fetching contacts from API:", err);
            } finally {
                setLoading(false);
            }
        };

        if (!initialContacts && contacts.length === 0) {
            fetchContacts();
        }
    }, [initialContacts]);

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

                            // هنا تضع الشرط، مثلاً: إذا كان النوع 'call'
                            contact.type !== "whatsapp" && contact.type !== "واتساب فقط" && (
                                <a
                                    href={`tel:${contact.number.replace(/\s+/g, '')}`}
                                    key={contact.id || index}
                                    className="contact-card"
                                >
                                    <div className="contact-card-icon">
                                        <LocalPhoneIcon className='PhoneIcon' />
                                    </div>
                                    <div className="contact-card-info">
                                        <span className="contact-category" style={{ fontFamily: 'Regular' }}>
                                            {contact.label || 'تواصل معنا عبر الهاتف انقر هنا'}
                                        </span>
                                        <strong className="contact-number" style={{ fontFamily: 'Bolds' }}>
                                            {contact.number}
                                        </strong>
                                    </div>
                                </a>
                            )
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
