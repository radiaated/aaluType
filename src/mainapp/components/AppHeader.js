import React from "react";
import appLogo from "./../images/main-logo.webp";

const AppHeader = () => {
  return (
    <header className="header flex-box">
      <div className="header-logo">
        <img src={appLogo} alt="Aalu Type's Logo" />
        <span className="cursor-logo"></span>
      </div>
    </header>
  );
};

export default AppHeader;
