import "../App.css";
import "../styles/HomeDecor.css";
// ===============import imgs ===================//
import HomeDecorImg1 from "../assets/images/DecorImg1.jpg";
import HomeDecorImg2 from "../assets/images/DecorImg2.jpg";
import HomeDecorImg3 from "../assets/images/DecorImg3.jpg";
import HomeDecorImg4 from "../assets/images/DecorImg4.jpg";
// ==============import mui contects ==============//
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
// ============= import icons mui =============//
import VerifiedIcon from "@mui/icons-material/Verified";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useInView } from "react-intersection-observer";

export default function HomeDecor() {
  const { ref: titleRef, inView: titleInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: imgRef, inView: imgInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="HomeDecor">
      <div ref={titleRef} className={`HomeDecorTitle ${titleInView ? 'animate__fadeInRight' : 'hidden-anim'}`}>
        <div className="HomeDecorTitleP">
          <p> إتقان في كل تفصيلة ✦ خبرة تتجاوز التوقعات </p>
        </div>
        <h1>
          {" "}
          حلول متكاملة في
          <br></br>
          <span>الألمنيوم، والديكور </span>{" "}
        </h1>
        <p className="HomeDecorDescription">
          في ورشة الأوقيانوس، لا نكتفي بتقديم خدمة واحدة، بل نوفر لك مركزاً
          متكاملاً يجمع بين براعة النجارة، دقة تشكيل الألمنيوم، وإبداع الديكور
          الداخلي. هنا نستعرض لك كافة أقسامنا المنفذة بأعلى معايير الجودة لتلبي
          كافة احتياجات مساحتك السكنية والتجارية في مكان واحد
        </p>
        <div className="HomeDecoricons">
          <div className="HomeDecoricon">
            <div className="HomeDecoriconAll">
              <DashboardOutlinedIcon className="StarIcon" />
            </div>
            <div>
              <h3> تنوع الأقسام</h3>
              <p> من الديكور إلى مطابخ الألمنيوم العصرية. </p>
            </div>
          </div>
          <div className="HomeDecoricon">
            <div className="HomeDecoriconAll">
              <VerifiedIcon className="StarIcon" />
            </div>
            <div>
              <h3> جودة التنفيذ </h3>
              <p> استخدام أفضل الخامات المعالجة والمدعومة بضمان. </p>
            </div>
          </div>
        </div>
        <div className="HomeDecorButton">
          <Link to="/exhibitions">
            <Button
              variant="contained"
              endIcon={<ArrowBackIcon className="iconArrow" />}
            >
              تصفح جميع الأعمال
            </Button>
          </Link>
        </div>
      </div>
      {/* ========== HomeDecor Img ================= */}
      <div ref={imgRef} className={`HomeDecorImg ${imgInView ? 'animate__fadeInLeft' : 'hidden-anim'}`}>
        <div className="HomeDecorImgContent1">
          <img src={HomeDecorImg1} className="HomeDecorImg1" alt="" />
          <img src={HomeDecorImg3} className="HomeDecorImg3" alt="" />
        </div>
        <div className="HomeDecorImgContent2">
          <img src={HomeDecorImg4} className="HomeDecorImg4" alt="" />
          <img src={HomeDecorImg2} className="HomeDecorImg2" alt="" />
        </div>
      </div>
    </div>
  );
}
