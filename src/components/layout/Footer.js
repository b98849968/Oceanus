import "./style/Footer.css";
import ImageLogo from "../../assets/images/logo/logoPect2.png";
import "../../App.css";
// ======== import items MUI مكتبه  =======//

// ======= import icon MUI ========== //
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationPinIcon from '@mui/icons-material/LocationPin';
// ========== date time =========//
const d = new Date();
const year = d.getFullYear();
console.log(year);

export default function Footer() {
  return (
    <>
      <div className="footer">
        {/* footer Top informtion  */}

        <div className="footerTop">
          {/* footer logo and discribtion  */}
          <div className="footerLD">
            <img src={ImageLogo} alt="logo" />
            <p>
              الأوقيانوس هي وجهتكم الأولى لأرقى أعمال الألمنيوم والديكورات
              الداخلية. نجمع بين الحرفية العالية والتصميم العصري لنبتكر مساحات
              تُلهمكم وتليق بذوقكم.
            </p>
          </div>
          {/* footer the links  */}
          <div className="footerLinks">
            <h3>الروابط السريعة</h3>
            <div>
              <ul>
                <li>
                  <a>الرئيسية</a>
                </li>
                <li>
                  <a>من نحن</a>
                </li>
                <li>
                  <a>  المعارض كل </a>
                </li>
                <li>
                  <a>   تواصل و الموقع </a>
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
                  الرياض، المملكة العربية السعودية شارع التخصصي{" "}
                </span>{" "}
              </p>
              <p>
                <CallIcon className="comunicationIcons" />
                <span dir="ltr">+967 772825734 </span>{" "}
              </p>
              <p>
                <EmailIcon className="comunicationIcons" />
                <span dir="ltr">b98849968@gmail.com</span>{" "}
              </p>
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
