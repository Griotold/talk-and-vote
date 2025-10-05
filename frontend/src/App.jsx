import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Navbar from "./Components/Navbar";
import LoginModal from "./Components/Modal/LoginModal";
import SignupModal from "./Components/Modal/SignupModal";

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
      <Navbar onLoginClick={onLoginClick} onSignupClick={onSignupClick} />

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
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
