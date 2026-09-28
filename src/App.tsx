import { MotionConfig } from "framer-motion";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { A11ySettingsProvider, useA11ySettings } from "@/components/site/a11y/A11ySettings";
import { LanguageProvider } from "@/i18n/LanguageContext";
import AccessibilityStatement from "./pages/AccessibilityStatement.tsx";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

/** Honors the OS "reduce motion" setting, and the widget's "stop animations" toggle on top of it. */
const Motion = ({ children }: { children: React.ReactNode }) => {
  const { stopMotion } = useA11ySettings();
  return <MotionConfig reducedMotion={stopMotion ? "always" : "user"}>{children}</MotionConfig>;
};

// Preview builds (VITE_MEMORY_ROUTER=1) run inside hosts that can't serve deep URLs.
const Router = import.meta.env.VITE_MEMORY_ROUTER ? MemoryRouter : BrowserRouter;

const App = () => (
  <LanguageProvider>
    <A11ySettingsProvider>
      <Motion>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/accessibility" element={<AccessibilityStatement />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Motion>
    </A11ySettingsProvider>
  </LanguageProvider>
);

export default App;
