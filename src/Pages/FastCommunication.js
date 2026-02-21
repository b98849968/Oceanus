import React from 'react';
import '../styles/FastCommunication.css';
import "../App.css"
// ====== import MUI .com ===========//
import Button from '@mui/material/Button';

// =============== import icons   ==================//
import CallIcon from '@mui/icons-material/Call';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

export default function FastCommunication() {
  return (
    <>
      <div className="FastCommunication">
        <div className="FastCommunicationTitle">
          <h1>جاهز لبدء مشروعك؟</h1>
          <p>
            تواصل معنا اليوم للحصول على استشارة مجانية وعرض سعر مخصص لاحتياجاتك.
          </p>
        </div>
        <div className="FastCommunicationButton">
          
            <Button className='Coll' variant="contained" startIcon={<CallIcon />}>
              اتصل بنا الآن
            </Button>
             <Button className='WhatsApp' variant="contained" startIcon={<ChatOutlinedIcon />}>
              واتساب
            </Button>
            
       
        </div>
      </div>
    </>
  );
}
