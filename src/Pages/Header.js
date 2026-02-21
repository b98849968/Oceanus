import "../styles/Header.css";
import "../App.css";
//  ======== import mui مكنيه ============= //
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Header() {
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
            <Button variant="contained" className="ButBac">تصفح المعرض </Button>
            <Button variant="outlined" className="nonBac"> المعرض الديكور </Button>
          </div>
         
      </div>
    </>
  );
}
