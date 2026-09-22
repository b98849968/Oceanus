// =============== import css ============= //
import "../styles/Abute.css";
import "../App.css";

// ========== icon MUI =============== //
import EngineeringIcon from "@mui/icons-material/Engineering";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useInView } from "react-intersection-observer";

export default function Abute() {
  const { ref: imgRef, inView: imgInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: descRef, inView: descInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <div className="Abute" id="about">
        {/* hte code is defing imgs Abute  */}
        <div ref={imgRef} className={`AbuteImg ${imgInView ? 'animate__fadeInRight' : 'hidden-anim'}`}>
          <div className="AbuteImgContent">
            <div className="engineeringImgs">
              <div className="AbuteIcon">
                <EngineeringIcon className="EngineeringIcon" />
              </div>
              <div className="AbuteTextEng">
                <h4>فريق متخصص</h4>
                <p>نمتلك نخبة من الفنيين والمهندسين ذوي الخبرة العالية.</p>
              </div>
            </div>
          </div>
        </div>
        {/* the describtion Abute  */}
        <div ref={descRef} className={`DescriptionAbute ${descInView ? 'animate__fadeInLeft' : 'hidden-anim'}`}>
          <p className="we">من نحن</p>
          <h2 className="title">  شريكك الموثوق في عالم <span>الألمنيوم والديكور</span>  </h2>
          <div className="textAbute">
            <p>
              تأسست ورشة الأوقيانوس  برؤية واضحة تهدف إلى تقديم حلول ألمنيوم مبتكرة
              تجمع بين المتانة والجمال. نحن لا نقدم مجرد منتجات، بل نقدم تجربة
              متكاملة تبدأ من التصميم الدقيق وتنتهي بالتركيب الاحترافي.
            </p>
            <p>
              نسعى دائماً لمواكبة أحدث صيحات الديكور العالمية، ونستخدم أجود
              خامات الألمنيوم لضمان استدامة أعمالنا ورضا عملائنا التام.
            </p>
          </div>
          <div>
            <ul>
              <li> <span className="checkLine"><CheckCircleOutlineIcon /></span> <span>دقة في المواعيد والتسليم</span></li>
              <li> <span className="checkLine"><CheckCircleOutlineIcon /></span> <span>ضمان حقيقي على جميع الأعمال</span></li>
              <li> <span className="checkLine"><CheckCircleOutlineIcon /></span> <span>تصاميم عصرية تناسب كافة الأذواق</span></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
