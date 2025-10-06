import React, { useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Navbar from "./Components/Navbar";
import LoginModal from "./Components/Modal/LoginModal";
import SignupModal from "./Components/Modal/SignupModal";
import Footer from "./Components/Footer/Footer";
import Main from "./Pages/Main";

const RootLayout = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const onLoginClick = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };

  const onSignupClick = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  };

  const handleCloseModals = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
  };

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar onLoginClick={onLoginClick} onSignupClick={onSignupClick} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Outlet /> {/* 여기에 자식 페이지를 보여줘! */}
        </main>
        <Footer />
      </div>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={handleCloseModals}
        onSignupClick={onSignupClick}
      />
      <SignupModal
        isOpen={isSignupOpen}
        onClose={handleCloseModals}
        onLoginClick={onLoginClick}
      />
    </AuthProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,  
        element: <Main />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
