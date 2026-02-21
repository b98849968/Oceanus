import { useState } from "react";
import "./style/NavBar.css";
import "../../App.css";
import ImageLogo from "../../assets/images/logo/logoPect.png";
import Button from "@mui/material/Button";
// ======== import items MUI مكتبه  =======//
import Container from "@mui/material/Container";

// ============ import icons ============ //
import Brightness4Icon from "@mui/icons-material/Brightness4";
 
 

export default function NavBar() {
  // ================== hooks set ============== //
  const [activeIndex, setActiveIndex] = useState(0); 
  const navLinks = [
    {
      Title:"الرئيسية",
      href:"#",
    },
    {
      Title:"من نحن",
      href:"#",
    },
    {
      Title:"خدمتنا",
      href:"#",
    },
    {
      Title:"  كل المعارض  ",
      href:"#",
    },
    {
      Title:"تواصل و الموقع",
      href:"#", 
    }
      
  ];
  
    
   
  return (
    <>
    <Container maxWidth="ml">
      <div className="navBody">
        {/* logo  ingser */}
        <div className="logoImge">
          <img src={ImageLogo} alt="logo" />
        </div>
        {/* القوائم التنقل  */}
        <div className="ListItem">
          <ul id="ul">
             {navLinks.map((link, index) => (
                 
                    
              <li key={index} onClick={() => setActiveIndex(index)}>
                <a 
                  href="link.href" 
                  style={{ 
                    color: activeIndex === index ?  "var(--main-color)"  : "var(--derk-color)",
                    
                    fontWeight: activeIndex === index ? "var(--main-color)" : "normal"
                  }}
                >
                  {link.Title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="navButton">
          <Brightness4Icon  className="iconDirk"/>
          <Button variant="contained">تواصل معنا</Button>
        </div>
      </div>
      </Container>
    </>
  );
}
