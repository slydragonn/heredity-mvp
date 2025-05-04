import { useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

function AppLayout({children}) {
  const location = useLocation();
  const hideLayoutRoutes = ["/auth"];
  const shouldShowNavbar = !hideLayoutRoutes.includes(location.pathname);
  const shouldShowFooter = !hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
     
        {children}

      {shouldShowFooter && <Footer />}
    </>
  );
}

export default AppLayout;