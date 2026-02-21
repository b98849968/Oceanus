import React, { useState } from 'react';
import './style/projectCard.css';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import project1 from "../../assets/images/DecorImg1.jpg";
import ProjectCardDisplay from './projectCardDisply';

const ProjectCard = ({ project }) => {
    // حالة للتحكم في فتح/إغلاق نافذة العرض المنبثقة
    const [isModalOpen, setIsModalOpen] = useState(false);

    // بيانات افتراضية في حال لم يتم تمرير بيانات (للتجربة قبل ربط الـ API)
    const defaultProject = {
        id: 1,
        image: project1,
        category: 'الألمنيوم',
        subCategory: 'نوافذ وواجهات',
        title: 'واجهة زجاجية دبل',
        description: 'هذا وصف افتراضي لتجربة المودال. يتميز هذا المشروع بجودة عالية ومقاسات دقيقة تناسب جميع الاحتياجات بأسعار تنافسية.',
        images: [project1], // صورة واحدة كمثال
        whatsappNumber: '+96600000000'
    };

    const data = project || defaultProject;

    // دالة لفتح المودال عند النقر
    const handleOpenModal = (e) => {
        e.preventDefault(); // لمنع الانتقال في حال كان الرابط #
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="project-card" onClick={handleOpenModal}>
                {/* صورة الخلفية */}
                <img src={data.image} alt={data.title} className="project-image" />

                {/* التعتيم المتدرج الذي يظهر دائماً في الأسفل */}
                <div className="project-overlay"></div>

                {/* المحتوى الداخلي للبطاقة */}
                <div className="project-content">

                    {/* التصنيف (يظهر في الأعلى يساراً بناء على الصورة - RTL: أعلى يمين الشاشة لكن في التصميم أعلى يسار) */}
                    <div className="project-badge">
                        {data.category}
                    </div>

                    {/* القسم السفلي من البطاقة */}
                    <div className="project-info">
                        <p className="project-subtitle">{data.subCategory}</p>
                        <h3 className="project-title">{data.title}</h3>

                        {/* التفاصيل الإضافية التي تظهر عند الـ Hover */}
                        <div className="project-details-hover">
                            <button className="project-link" onClick={handleOpenModal} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                                <div className="link-icon-wrapper">
                                    <RemoveRedEyeIcon className="eye-icon" />
                                </div>
                                <span className="link-text">استعرض التفاصيل</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* نافذة العرض المنبثقة للمشروع */}
            <ProjectCardDisplay
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                projectData={data} // تمرير بيانات المشروع الحالية
            />
        </>
    );
};

export default ProjectCard;
