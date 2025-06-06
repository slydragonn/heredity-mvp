import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import FAQPage from "./pages/FAQPage";
import AppLayout from "./layouts/AppLayout";
import ContactPage from "./pages/ContactPage";
import TermsAndConditions from "./components/Legal/TermsAndConditions";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/terminos" element={<TermsAndConditions />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
