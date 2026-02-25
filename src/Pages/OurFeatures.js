import "../App.css";
import "../styles/OurFeatures.css";

// =========== Our Features icons MUI.com ===========//
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import SpeedIcon from '@mui/icons-material/Speed';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import { useInView } from "react-intersection-observer";

export default function OurFeatures() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <div ref={ref} className={`OurFeatures ${inView ? 'animate__fadeInUp' : 'hidden-anim'}`} id="services">
        <div className="OurFeaturesBox">
          <DiamondOutlinedIcon className="OurFeaturesIcon" />
          <h3>  جودة فاخرة  </h3>
          <p>
            نستخدم أفضل قطاعات الألمنيوم والإكسسوارات العالمية.
          </p>
        </div>


        <div className="OurFeaturesBox">
          <SpeedIcon className="OurFeaturesIcon" />
          <h3>سرعة التنفيذ  </h3>
          <p>
            نلتزم بالجداول الزمنية بدقة متناهية لتسليم مشروعك.
          </p>
        </div>
        <div className="OurFeaturesBox">
          <DesignServicesOutlinedIcon className="OurFeaturesIcon" />
          <h3>تصاميم مبتكرة   </h3>
          <p>
            فريق تصميم يترجم أفكارك إلى واقع ملموس وعصري.
          </p>
        </div>
        <div className="OurFeaturesBox">
          <VerifiedUserOutlinedIcon className="OurFeaturesIcon" />
          <h3>ضمان شامل</h3>
          <p>
            ضمان حقيقي يشمل المواد وسوء المصنعية لراحة بالك.
          </p>
        </div>
      </div>
    </>
  );
}
