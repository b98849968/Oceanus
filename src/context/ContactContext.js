import React, { createContext, useState, useContext } from 'react';
import ContactSection from '../components/layout/ContactSection';
import WhatsAppSection from '../components/layout/WhatsAppSection';

const ContactContext = createContext();

export const useContact = () => useContext(ContactContext);

export const ContactProvider = ({ children }) => {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
    const [whatsAppMessage, setWhatsAppMessage] = useState("");

    const openContact = () => setIsContactOpen(true);
    const closeContact = () => setIsContactOpen(false);

    // Accept an optional message parameter
    const openWhatsApp = (message = "") => {
        setWhatsAppMessage(message);
        setIsWhatsAppOpen(true);
    };
    const closeWhatsApp = () => {
        setIsWhatsAppOpen(false);
        setWhatsAppMessage(""); // Clear message when closed
    };

    return (
        <ContactContext.Provider value={{
            isContactOpen,
            openContact,
            closeContact,
            isWhatsAppOpen,
            openWhatsApp,
            closeWhatsApp
        }}>
            {children}
            {/* Render modals globally */}
            <ContactSection isOpen={isContactOpen} onClose={closeContact} />
            <WhatsAppSection isOpen={isWhatsAppOpen} onClose={closeWhatsApp} message={whatsAppMessage} />
        </ContactContext.Provider>
    );
};
