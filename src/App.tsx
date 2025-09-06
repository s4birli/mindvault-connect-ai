import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { MainLayout } from "./components/MainLayout";
import { LoginPage } from "./components/auth/LoginPage";
import { RegisterPage } from "./components/auth/RegisterPage";
import { ForgotPasswordPage } from "./components/auth/ForgotPasswordPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register" | "forgot-password">("login");

  const handleLogin = (email: string, password: string) => {
    // TODO: Implement actual authentication logic
    console.log("Login:", email, password);
    setIsAuthenticated(true);
  };

  const handleRegister = (email: string, password: string, name: string) => {
    // TODO: Implement actual registration logic
    console.log("Register:", email, password, name);
    setAuthMode("login");
  };

  const handleResetPassword = (email: string) => {
    // TODO: Implement actual password reset logic
    console.log("Reset password for:", email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthMode("login");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                isAuthenticated ? (
                  <MainLayout onLogout={handleLogout} />
                ) : (
                  <>
                    {authMode === "login" && (
                      <LoginPage
                        onLogin={handleLogin}
                        onShowRegister={() => setAuthMode("register")}
                        onShowForgotPassword={() => setAuthMode("forgot-password")}
                      />
                    )}
                    {authMode === "register" && (
                      <RegisterPage
                        onRegister={handleRegister}
                        onShowLogin={() => setAuthMode("login")}
                      />
                    )}
                    {authMode === "forgot-password" && (
                      <ForgotPasswordPage
                        onResetPassword={handleResetPassword}
                        onShowLogin={() => setAuthMode("login")}
                      />
                    )}
                  </>
                )
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
