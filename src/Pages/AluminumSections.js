//===== import css ========//
import "../App.css";
import "../styles/AluminumSections.css";
import DepartmentsCard from "../components/common/DepartmentCard";
import ProjectCard from "../components/common/projectCard";
import AllExhibitionsButtons from "../components/common/AllExhibitionsButtons";
import ExhibitionsButtons from "../components/common/ExhibitionsButtons";

export default function AluminumSections() {
  return (
    <>
      <div className="AluminumSections">
        {/* =========== title Aluminum Sections =========== */}
        <div className="SectionsTitle">
          {/* <p className="Services">خدماتنا</p> */}
          <h3>   سجل النماذج والأعمال  </h3>
          <hr/>
          <p className="SectionsP">  تصفح أحدث مشاريعنا المنفذة وتعرف على جودة تفاصيلنا  </p>
        </div>
        <div className="AluminumSectionsCards">
         <div className="AluminumSectionsButtons">

         <AllExhibitionsButtons/>
         <ExhibitionsButtons/>
         </div>
        </div>
      </div>
    </>
  );
}
