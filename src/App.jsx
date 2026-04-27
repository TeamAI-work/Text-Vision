import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import ChatPage from "./Components/Chat/ChatPage";
import Auth from "./Components/Auth/Auth";
import Bugreport from "./Components/Help/Bugreport";
import Terms from "./Components/Help/Terms";
import ContactSupport from "./Components/Help/ContactSupport";
import PrivacyPolicy from "./Components/Help/PrivacyPolicy";
import HelpCenter from "./Components/Help/HelpCenter";
import TransitionPage from "./Components/Transition/TransitionPage";
import Plans from "./Components/Plans/Plans";

export default function App() {
  // Apply theme globally on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:chatId" element={<ChatPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/bug-report" element={<Bugreport />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/contact-support" element={<ContactSupport />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/welcome" element={<TransitionPage />} />
        <Route path="/plans" element={<Plans />} />
      </Routes> 
    </Router>
  );
}