import "../App.css";
import "../styles/HomeDecor.css";
// ===============import imgs ===================//
import HomeDecorImg1 from "../assets/images/DecorImg1.jpg";
import HomeDecorImg2 from "../assets/images/DecorImg2.jpg";
import HomeDecorImg3 from "../assets/images/DecorImg3.jpg";
import HomeDecorImg4 from "../assets/images/DecorImg4.jpg";
// ==============import mui contects ==============//
import Button from "@mui/material/Button";
// ============= import icons mui =============//
import StarIcon from "@mui/icons-material/Star";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function HomeDecor() {
  return (
    <div className="HomeDecor">
      <div className="HomeDecorTitle">
        <div className="HomeDecorTitleP">
          <p>لمسة إبداع</p>
        </div>
        <h1>
          {" "}
          فن الديكور الداخلي <br></br>
          <span>يُعيد صياغة مكانك</span>{" "}
        </h1>
        <p className="HomeDecorDescription">
          نحن نؤمن بأن الديكور ليس مجرد تجميل للمكان، بل هو انعكاس لشخصيتك
          وأسلوب حياتك. قسم الديكور لدينا يقدم حلولاً شاملة تشمل التكسيات
          الخشبية، بديل الرخام، الفواصل الزجاجية، والإضاءة المخفية، لتخلق جواً
          من الرفاهية والراحة لا يضاهى
        </p>
        <div className="HomeDecoricons">
          <div className="HomeDecoricon">
            <div className="HomeDecoriconAll">
              <StarIcon className="StarIcon" />
            </div>
            <div>
              <h3>تصاميم حصرية</h3>
              <p>نبتكر تصاميم خاصة وفريدة تناسب مساحتك.</p>
            </div>
          </div>
          <div className="HomeDecoricon">
            <div className="HomeDecoriconAll">
              <PaletteOutlinedIcon className="StarIcon" />
            </div>
            <div>
              <h3> تناغم الألوان والمواد </h3>
              <p> دمج احترافي بين الخشب، المعدن، والزجاج. </p>
            </div>
          </div>
        </div>
        <div className="HomeDecorButton">
          <Button
            variant="contained"
            endIcon={<ArrowBackIcon className="iconArrow" />}
          >
            اكتشف مشاريع الديكور
          </Button>
        </div>
       
      </div>
      {/* ========== HomeDecor Img ================= */}
      <div className="HomeDecorImg">
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
