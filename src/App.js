//  ========== import for style CSS ===========//
import "./App.css";
import "./styles/Familys.css";
import "./styles/darkMode.css";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

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
import SectionsHeder from "./Pages/SectionsHeder";
import DepartmentsCard from "./components/common/DepartmentCard";
import AllExhibitionsDisply from "./Pages/AllExhibitionsDisply";
import { ContactProvider } from "./context/ContactContext";
import { ThemeProvider } from "./context/ThemeContext";
import ErrorBoundary from "./components/common/ErrorBoundary";
import ErrorPage from "./Pages/Error";
// ============= import MUI  مكتبه  ==========// 
import { Routes, Route, Link } from "react-router-dom";

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
      <MuiThemeProvider theme={theme}>
        <ThemeProvider>
          <ContactProvider>
            <ErrorBoundary fallback={<ErrorPage />}>
              <NavBar />

              <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/"
                  element={
                    <>
                      <Header />
                      <Abute />
                      <OurFeatures />
                      <HomeDecor />
                      <CommunicationLocation />
                      <FastCommunication />
                    </>
                  }
                />
                <Route path="/exhibitions"
                  element={
                    <>
                      <ExhibitionsHeader />
                      <AllExhibitionsDisply />
                    </>
                  }
                />
                <Route path="/exhibition"
                  element={
                    <>
                      <SectionsHeder />
                      <AluminumSections />
                    </>
                  }
                />
              </Routes>
              <Footer />
            </ErrorBoundary>
          </ContactProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
