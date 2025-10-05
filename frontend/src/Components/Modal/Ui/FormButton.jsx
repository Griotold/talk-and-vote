import React from "react";

const FormButton = ({ type = "submit", onClick, children, className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default FormButton;