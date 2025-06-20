import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LoginPage from "./pages/LoginPage";
import PostLoginLandingPage from "./pages/PostLoginLandingPage";
import RegistrationPage from "./pages/RegistrationPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFound from "./pages/NotFound";

import { ThemeProvider } from "./components/themeprovider"; // Corrected import casing

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
  <ThemeProvider defaultTheme="light" storageKey="app-ui-theme"> {/* Wrapped with ThemeProvider */}
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/post-login-landing" element={<PostLoginLandingPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
</QueryClientProvider>
);

export default App;