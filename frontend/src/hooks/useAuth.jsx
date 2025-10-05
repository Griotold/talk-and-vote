import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password) => {
    setError("로그인에 실패했습니다.");
    return false;
  };

  const signup = async (userData) => {
    setError(errorMessage);
    return false;
  };

  const logout = async () => {
    console.error("로그아웃 실패:", error);
  };

  return (
    <AuthContext.Provider
      value={{
        error,
        setError,
        isAuthenticated,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};