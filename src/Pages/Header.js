import "../styles/Header.css";
import "../App.css";
//  ======== import mui مكنيه ============= //
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useContact } from "../context/ContactContext";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

export default function Header() {
  const { openContact } = useContact();
  const { ref: titleRef, inView: titleInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: btnRef, inView: btnInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <div className="Header">

        <div className="HeaderSafety">
          <p>
            <span>فخامة</span> . <span>جودة </span> . <span>أمان</span>
          </p>
        </div>
        <div ref={titleRef} className={`HeaderTitle ${titleInView ? 'animate__zoomInDown' : 'hidden-anim'}`}>
          <h1>
            ورشة الأوقيانوس للألمنيوم <span>والديكور</span>
          </h1>
          <p>
            نقدم حلولاً عصرية ومبتكرة في عالم الألمنيوم والديكورات الداخلية
            والخارجية نجمع بين <br /> المتانة والأناقة لنحقق رؤيتكم على أرض
            الواقع.
          </p>
        </div>
        <div ref={btnRef} className={`HeaderButton ${btnInView ? 'animate__fadeInUp' : 'hidden-anim'}`}>
          <Link to="/exhibitions">
            <Button variant="contained" className="ButBac"> تصفح المعارض   </Button>
          </Link>
          <Button variant="outlined" className="nonBac" onClick={openContact}> التواصل معنا  </Button>
        </div>

      </div>
    </>
  );
}
