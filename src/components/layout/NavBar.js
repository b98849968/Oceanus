import { useState, useEffect } from "react";
import "./style/NavBar.css";
import "../../App.css";
import Button from "@mui/material/Button";
// ======== import items MUI مكتبه  =======//
import Container from "@mui/material/Container";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContact } from "../../context/ContactContext";
import { useTheme } from "../../context/ThemeContext";
import { fetchAPI, ENDPOINTS, BASE_URL } from "../../API";

// ============ import icons ============ //
import Brightness4Icon from "@mui/icons-material/Brightness4";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

const navLinks = [
  {
    Title: "الرئيسية",
    href: "/",
  },
  {
    Title: "من نحن",
    href: "/#about",
  },
  {
    Title: "خدمتنا",
    href: "/#services",
  },
  {
    Title: "  كل المعارض  ",
    href: "/exhibitions",
  },
  {
    Title: "تواصل و الموقع",
    href: "/#contact-location",
  }
];

export default function NavBar() {
  // ================== hooks set ============== //
  const [activeIndex, setActiveIndex] = useState(0);
  const [logos, setLogos] = useState({ light: '', dark: '' });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openContact } = useContact();
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAPI(ENDPOINTS.getSettings)
      .then(response => {
        const settings = response.data || response;
        if (settings) {
          setLogos({
            light: settings.light_logo || settings.logo || '',
            dark: settings.dark_logo || settings.logo || ''
          });
        }
      })
      .catch(err => console.error("Error fetching logo:", err));
  }, []);

  // Update active state based on current URL path and hash
  useEffect(() => {
    const currentPath = location.pathname;
    const currentHash = location.hash;
    const fullURL = currentPath + currentHash;

    const index = navLinks.findIndex(link => {
      if (link.href === "/") {
        return currentPath === "/" && !currentHash;
      }
      return fullURL === link.href || currentPath === link.href;
    });

    if (index !== -1) setActiveIndex(index);
  }, [location]);

  // Handle closing mobile menu on scroll or click outside
  useEffect(() => {
    const handleScrollOrClick = (e) => {
      if (isMobileMenuOpen) {
        if (e.type === 'scroll') {
          setIsMobileMenuOpen(false);
        } else if (e.type === 'mousedown' || e.type === 'touchstart') {
          const isMenuClick = e.target.closest('.mobile-menu-icon') || e.target.closest('.nav-links-mobile');
          if (!isMenuClick) {
            setIsMobileMenuOpen(false);
          }
        }
      }
    };

    if (isMobileMenuOpen) {
      window.addEventListener('scroll', handleScrollOrClick, { passive: true });
      document.addEventListener('mousedown', handleScrollOrClick);
      document.addEventListener('touchstart', handleScrollOrClick);
    }

    return () => {
      window.removeEventListener('scroll', handleScrollOrClick);
      document.removeEventListener('mousedown', handleScrollOrClick);
      document.removeEventListener('touchstart', handleScrollOrClick);
    };
  }, [isMobileMenuOpen]);

  // Handle cross-page hash navigation and smooth scrolling
  const handleNavClick = (e, href, index) => {
    e.preventDefault();
    setActiveIndex(index);

    if (href.startsWith('/#')) {
      const hash = href.replace('/', ''); // e.g. #about
      if (location.pathname !== '/') {
        // Navigate to home page then scroll after a tiny delay
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(hash.replace('#', ''));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // Already on home page, just scroll
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        window.history.pushState(null, '', hash);
      }
    } else {
      // Normal navigation page
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  return (
    <>
      <Container maxWidth="ml">
        <div className="navBody">
          {/* logo  ingser */}
          <div className="logoImge">
            <Link
              to="/"
              onClick={(e) => {
                handleNavClick(e, "/", 0);
                setIsMobileMenuOpen(false);
              }}
            >
              <img src={isDarkMode ? `${BASE_URL}${logos.dark}` : `${BASE_URL}${logos.light}`} loading="lazy" alt="لوقو ورشة الأوقيانوس" />
            </Link>
          </div>
          {/* القوائم التنقل  */}
          <div className="ListItem">
            <ul id="ul" className={isMobileMenuOpen ? "nav-links-mobile" : "nav-links"}>
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    onClick={(e) => {
                      handleNavClick(e, link.href, index);
                      setIsMobileMenuOpen(false);
                    }}
                    style={{
                      color: activeIndex === index ? "var(--main-color)" : "var(--derk-color)",
                      fontWeight: activeIndex === index ? "bold" : "normal",
                      cursor: "pointer"
                    }}
                  >
                    {link.Title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="navButton">
            <Brightness4Icon
              className="iconDirk"
              onClick={toggleTheme}
              style={{ cursor: "pointer", color: isDarkMode ? "#fbbf24" : "inherit" }}
            />
            <Button className="contact-btn" variant="contained" onClick={openContact}>تواصل معنا</Button>

            <IconButton
              className="mobile-menu-icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ display: "none" }}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </div>

      </Container>
    </>
  );
}
