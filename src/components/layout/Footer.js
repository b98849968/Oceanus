import "./style/Footer.css";
import "../../App.css";
// ======== import items MUI مكتبه  =======//
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchAPI, ENDPOINTS } from "../../API";

// ======= import icon MUI ========== //
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationPinIcon from '@mui/icons-material/LocationPin';
// ========== date time =========//
const d = new Date();
const year = d.getFullYear();
console.log(year);

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const [contactInfo, setContactInfo] = useState({
    address: "",
    phone: "",
    email: "",
    darkLogo: ""
  });

  useEffect(() => {
    fetchAPI(ENDPOINTS.getSettings)
      .then(response => {
        const settings = response.data || response;
        const firstPhone = settings.phones && settings.phones[0];
        const parsedPhone = firstPhone
          ? (typeof firstPhone === 'object' ? (firstPhone.number || firstPhone.phone) : firstPhone)
          : "";

        setContactInfo({
          address: settings.address || settings.location || "",
          phone: settings.phone || parsedPhone || "",
          email: settings.email || "",
          darkLogo: settings.dark_logo || settings.logo || ""
        });
      })
      .catch(err => console.error("Error fetching footer settings:", err));
  }, []);

  // Handle cross-page hash navigation and smooth scrolling
  const handleNavClick = (e, href) => {
    e.preventDefault();

    if (href.startsWith('/#')) {
      const hash = href.replace('/', ''); // e.g. #about
      if (location.pathname !== '/') {
        // Navigate to home page then scroll after a tiny delay
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(hash.replace('#', ''));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // Already on home page, just scroll
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        window.history.pushState(null, '', hash);
      }
    } else {
      // Normal navigation page
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="footer">
        {/* footer Top informtion  */}

        <div className="footerTop">
          {/* footer logo and discribtion  */}
          <div className="footerLD">
            {contactInfo.darkLogo && <img src={`http://localhost:8000${contactInfo.darkLogo}`} alt="logo" />}

            <p>
              الأوقيانوس هي وجهتكم الأولى لأرقى أعمال الألمنيوم والديكورات
              الداخلية. نجمع بين الحرفية العالية والتصميم العصري لنبتكر مساحات
              تُلهمكم وتليق بذوقكم.
            </p>
          </div>
          {/* footer the links  */}
          <div className="AllfooterLinks">
            <div className="footerLinks">
              <h3>الروابط السريعة</h3>
              <div>
                <ul>
                  <li>
                    <Link to="/" onClick={(e) => handleNavClick(e, "/")}>الرئيسية</Link>
                  </li>
                  <li>
                    <Link to="/#about" onClick={(e) => handleNavClick(e, "/#about")}>من نحن</Link>
                  </li>
                  <li>
                    <Link to="/exhibitions" onClick={(e) => handleNavClick(e, "/exhibitions")}>كل المعارض</Link>
                  </li>
                  <li>
                    <Link to="/#contact-location" onClick={(e) => handleNavClick(e, "/#contact-location")}>تواصل والموقع</Link>
                  </li>

                </ul>
              </div>
            </div>
            {/* footer the comunication  */}
            <div className="FooterComunication">
              <h3>تواصل معنا</h3>
              <div>
                <p>
                  <LocationPinIcon className="comunicationIcons" />
                  <span style={{ lineHeight: "25px" }}>
                    {" "}
                    {contactInfo.address}{" "}
                  </span>{" "}
                </p>
                <p>
                  <CallIcon className="comunicationIcons" />
                  <span dir="ltr">{contactInfo.phone} </span>{" "}
                </p>
                <p>
                  <EmailIcon className="comunicationIcons" />
                  <span dir="ltr">{contactInfo.email}</span>{" "}
                </p>
              </div>
            </div>
          </div>

        </div>
        {/* footer Bottom informtion  */}
        <div className="footerBottom">
          <div>
            <p>
              {" "}
              جميع الحقوق محفوظة {year} &copy;{" "}
              <span>
                <a className="copy" href="#">
                  الأوقيانوس
                </a>
              </span>{" "}
            </p>
          </div>
          <div>
            <p>
              تصميم و تطوير بواسطة :{" "}
              <span style={{ color: "white" }}>
                {" "}
                عبدالله باحميد | حسن المشهور
              </span>
            </p>
          </div>
        </div>
      </div>

    </>
  );
}
