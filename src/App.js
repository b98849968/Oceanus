//  ========== import for style CSS ===========//
import "./App.css";
import "./styles/Familys.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// ============import pages ================= //
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Header from "./Pages/Header";
import Abute from "./Pages/Abute";
import AluminumSections from "./Pages/AluminumSections";
 import OurFeatures from "./Pages/OurFeatures";
 import HomeDecor from "./Pages/HomeDecor";
 import FastCommunication from "./Pages/FastCommunication";
 import CommunicationLocation from "./Pages/CommunicationLocation ";
 import NotFound from "./Pages/NotFound";
 import ProjectCardDisply from "./components/common/projectCardDisply";
 import ExhibitionsHeader from "./Pages/ExhibitionsHeader";
 import ContactSection from "./components/layout/ContactSection";
 import WhatsAppSection from "./components/layout/WhatsAppSection";
 
 
 
 

// ============= import MUI  مكتبه  ==========// 

// import Button from "@mui/material/Button";

// ======== the import fonts ========= // 
const theme = createTheme({
  typography: {
    fontFamily: 'Rubiks'
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
         
            <NavBar />
          <Header/>  
          <Abute/>
         <ContactSection/>
         <WhatsAppSection/>
        <AluminumSections/>
         <OurFeatures/>  
          <HomeDecor/>
          <CommunicationLocation/>
          <FastCommunication/>  
            <Footer/>  
            {/* <NotFound/> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
