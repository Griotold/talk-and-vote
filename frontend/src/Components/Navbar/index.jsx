import { useState } from "react";

import Logo from "./layout/Logo";
import MobileToggleButton from "./layout/MobileToggleButton";
import MobileMenu from "./layout/MobileMenu";
import AuthButtons from "./auth/DesktopAuthButtons";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = false;

  const onLoginClick = () => {
    alert("로그인");
  };

  const onSignupClick = () => {
    alert("회원가입");
  };

  const onLogoutClick = () => {
    alert("로그아웃");
  };

  return (
    <nav className="bg-emerald-500">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-20">
          <div className="flex items-center flex-1">
            <Logo />
          </div>
          <MobileToggleButton
            isOpen={isOpen}
            toggle={() => setIsOpen(!isOpen)}
          />
          <AuthButtons
            isAuthenticated={isAuthenticated}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onLogoutClick={onLogoutClick}
            onLoginClick={onLoginClick}
            onSignupClick={onSignupClick}
          />
        </div>

        <MobileMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isAuthenticated={isAuthenticated}
          onLogoutClick={onLogoutClick}
          onLoginClick={onLoginClick}
          onSignupClick={onSignupClick}
        />
      </div>
    </nav>
  );
}

export default Navbar;
