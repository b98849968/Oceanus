import React, { useState, useEffect } from 'react';
import './style/projectCard.css';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ProjectCardDisplay from './projectCardDisply';
import { BASE_URL } from '../../API';

const ProjectCard = ({ project }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const data = project ? {
        ...project,
        category: project.category?.name || project.category,
        images: project.images || project.extra_images || [],
    } : {};

    const projectId = data.id || `project-${data.title}`;

    useEffect(() => {
        // قراءة حالة الإعجاب من Local Storage
        const savedLikes = JSON.parse(localStorage.getItem('liked_projects') || '[]');
        if (savedLikes.includes(projectId)) {
            setIsLiked(true);
        }

        // التحقق من الرابط لفتح المشروع تلقائياً عند الدخول من رابط مشاركة
        const params = new URLSearchParams(window.location.search);
        const sharedProjectId = params.get('project');

        if (sharedProjectId && String(sharedProjectId) === String(projectId)) {
            setIsModalOpen(true);
        }
    }, [projectId]);

    const handleLikeToggle = (e) => {
        e.stopPropagation();
        let savedLikes = JSON.parse(localStorage.getItem('liked_projects') || '[]');

        if (isLiked) {
            savedLikes = savedLikes.filter(id => id !== projectId);
            setIsLiked(false);
        } else {
            savedLikes.push(projectId);
            setIsLiked(true);
        }

        localStorage.setItem('liked_projects', JSON.stringify(savedLikes));
    };

    const handleShare = async (e) => {
        e.stopPropagation();

        // بناء الرابط ليتضمن معرّف المشروع
        const shareUrl = `${window.location.origin}${window.location.pathname}?project=${projectId}`;

        const fallbackCopy = () => {
            try {
                const textArea = document.createElement("textarea");
                textArea.value = shareUrl;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('تم نسخ رابط المشروع إلى الحافظة');
            } catch (err) {
                console.log('Error copying using fallback', err);
            }
        };

        if (navigator.share) {
            try {
                await navigator.share({
                    title: data.title || 'مشروع',
                    text: data.description || 'تفاصيل المشروع',
                    url: shareUrl,
                });
            } catch (error) {
                console.log('Error sharing', error);
                if (error.name !== 'AbortError') {
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(shareUrl).then(() => alert('تم نسخ رابط المشروع إلى الحافظة')).catch(() => fallbackCopy());
                    } else {
                        fallbackCopy();
                    }
                }
            }
        } else {
            // بديل في حال المتصفح لا يدعم المشاركة
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(shareUrl).then(() => alert('تم نسخ رابط المشروع إلى الحافظة')).catch(() => fallbackCopy());
            } else {
                fallbackCopy();
            }
        }
    };

    const handleOpenModal = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="project-card" onClick={handleOpenModal} style={{ cursor: 'pointer' }}>
                <div className="project-card-image-container">
                    <img src={`${BASE_URL}${data.image}`} alt={data.title} className="project-image" />
                    <div className="project-badge">
                        {data.category}
                    </div>
                </div>

                <div className="project-card-content">
                    <div>
                        <h3 className="project-title">{data.title}</h3>
                        {/* <p className="project-subtitle">{data.subCategory}</p> */}
                        {data.description && <p className="project-description">{data.description}</p>}
                    </div>

                    <hr className="project-divider" />

                    <div className="project-actions">
                        {/* 
                            في سياق RTL، العنصر الأول سيكون على اليمين والثاني على اليسار.
                            لذا نضع الإعجاب والمشاهدة أولاً ليكونوا في اليمين، والمشاركة ثانياً لتكون في اليسار.
                        */}
                        <div className="project-action-icons">
                            <button className={`icon-btn like-btn ${isLiked ? 'liked' : ''}`} onClick={handleLikeToggle} aria-label="إعجاب">
                                {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            </button>
                            {/* زر المشاهدة (كان تحميل) وهو جاهز للـ API كونه يعتمد على data ويفتح المودال */}
                            <button className="icon-btn view-btn" onClick={handleOpenModal} aria-label="عرض التفاصيل">
                                <RemoveRedEyeIcon />
                            </button>
                        </div>

                        <div className="project-action-share">
                            <button className="icon-btn share-btn" onClick={handleShare} aria-label="مشاركة">
                                <ShareIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ProjectCardDisplay
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                projectData={data}
            // apiEndpoint={`https://api.domain.com/projects/${projectId}`} // يمكن تمرير رابط للـ API هنا مستقبلاً
            />
        </>
    );
};

export default ProjectCard;
