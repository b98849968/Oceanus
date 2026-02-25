import React from 'react';
import '../styles/FastCommunication.css';
import "../App.css"
// ====== import MUI .com ===========//
import Button from '@mui/material/Button';

// =============== import icons   ==================//
import CallIcon from '@mui/icons-material/Call';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { useContact } from '../context/ContactContext';
import { useInView } from "react-intersection-observer";

export default function FastCommunication() {
  const { openContact, openWhatsApp } = useContact();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <div ref={ref} className={`FastCommunication ${inView ? 'animate__slideInRight' : 'hidden-anim'}`}>
        <div className="FastCommunicationTitle">
          <h1>جاهز لبدء مشروعك؟</h1>
          <p>
            تواصل معنا اليوم للحصول على استشارة مجانية وعرض سعر مخصص لاحتياجاتك.
          </p>
        </div>
        <div className="FastCommunicationButton">

          <Button className='Coll' variant="contained" startIcon={<CallIcon />} onClick={openContact}>
            اتصل بنا الآن
          </Button>
          <Button className='WhatsApp' variant="contained" startIcon={<ChatOutlinedIcon />} onClick={openWhatsApp}>
            واتساب
          </Button>


        </div>
      </div>
    </>
  );
}
