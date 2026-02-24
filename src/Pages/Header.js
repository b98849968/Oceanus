import "../styles/Header.css";
import "../App.css";
//  ======== import mui مكنيه ============= //
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useContact } from "../context/ContactContext";
import { Link } from "react-router-dom";
export default function Header() {
  const { openContact } = useContact();

  return (
    <>
      <div className="Header">

        <div className="HeaderSafety">
          <p>
            <span>فخامة</span> . <span>جودة </span> . <span>أمان</span>
          </p>
        </div>
        <div className="HeaderTitle">
          <h1>
            ورشة الأوقيانوس للألمنيوم <span>والديكور</span>
          </h1>
          <p>
            نقدم حلولاً عصرية ومبتكرة في عالم الألمنيوم والديكورات الداخلية
            والخارجية نجمع بين <br /> المتانة والأناقة لنحقق رؤيتكم على أرض
            الواقع.
          </p>
        </div>
        <div className="HeaderButton">
        <Link to="/exhibitions">
          <Button variant="contained" className="ButBac"> تصفح المعارض   </Button>
          </Link>
          <Button variant="outlined" className="nonBac" onClick={openContact}> التواصل معنا  </Button>
        </div>

      </div>
    </>
  );
}
