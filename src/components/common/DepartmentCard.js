import React from 'react';
import Department from "../../assets/images/Card.png";
import "./style/DepartmentCard.css";
// =========== import icons mui.com ========== //
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';

export default function DepartmentsCard() {
  const divStyle = {
    backgroundImage: `url(${Department})`,
  };

  return (
    <div className="DepartmentsCard" style={divStyle}>
      <div className="card-overlay"></div>

      <div className="card-content">
        <div className="card-icon-box">
          <WindowOutlinedIcon className="grid-icon" />
        </div>
        <h3>معرض الألمنيوم والزجاج</h3>
        <p>
          تشكيلة واسعة من واجهات الألمنيوم، النوافذ العازلة، والمطابخ الحديثة المقاومة للصدأ بأحدث أنظمة السحب والمفصلات.
        </p>
        <a href="#" className="card-link">
          استعرض أعمال الألمنيوم <ArrowBackIcon className="link-icon" />
        </a>
      </div>
    </div>
  );
}
