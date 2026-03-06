import React from 'react';
import Department from "../../assets/images/Card.png";
import "./style/DepartmentCard.css";
// =========== import icons mui.com ========== //
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';
import { BASE_URL } from '../../API';

export default function DepartmentsCard({ gallery, onClick }) {
  const bgImage = gallery?.image || Department;
  const divStyle = {
    backgroundImage: `url(${BASE_URL}${bgImage})`,
  };

  return (
    <div className="DepartmentsCard" style={{ ...divStyle, cursor: 'pointer' }} onClick={onClick}>
      <div className="card-overlay"></div>

      <div className="card-content">
        <div className="card-icon-box">
          <WindowOutlinedIcon className="grid-icon" />
        </div>
        <h3>{gallery?.name || 'معرض  '}</h3>
        <p>
          {gallery?.description || 'تشكيلة واسعة من واجهات الألمنيوم، النوافذ العازلة، والمطابخ الحديثة المقاومة للصدأ بأحدث أنظمة السحب والمفصلات.'}
        </p>
        <span className="card-link">
          استعرض أعمال<ArrowBackIcon className="link-icon" />
        </span>
      </div>
    </div>
  );
}
